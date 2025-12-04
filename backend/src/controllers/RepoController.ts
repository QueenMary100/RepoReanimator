import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { GitHubService } from '../services/GitHubService';
import { AbandonmentScorer } from '../services/AbandonmentScorer';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

export class RepoController {
  /**
   * Discover abandoned repositories
   */
  static async discover(req: Request, res: Response) {
    const {
      topics,
      language,
      minStars = 10,
      page = 1,
      limit = 20,
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {
      isAbandoned: true,
    };

    if (topics) {
      const topicArray = Array.isArray(topics) ? topics : [topics];
      where.topics = {
        hasSome: topicArray,
      };
    }

    if (language) {
      where.language = language;
    }

    if (minStars) {
      where.stars = {
        gte: Number(minStars),
      };
    }

    const [repos, total] = await Promise.all([
      prisma.gitHubRepo.findMany({
        where,
        orderBy: [
          { abandonmentScore: 'desc' },
          { stars: 'desc' },
        ],
        skip,
        take: Number(limit),
      }),
      prisma.gitHubRepo.count({ where }),
    ]);

    res.json({
      repos,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    });
  }

  /**
   * Get repository by ID
   */
  static async getById(req: Request, res: Response) {
    const { id } = req.params;

    const repo = await prisma.gitHubRepo.findUnique({
      where: { id },
      include: {
        revivals: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                avatarUrl: true,
              },
            },
          },
          orderBy: { claimedAt: 'desc' },
          take: 5,
        },
        tasks: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!repo) {
      throw new AppError('Repository not found', 404);
    }

    res.json({ repo });
  }

  /**
   * Get repository health score
   */
  static async getHealth(req: Request, res: Response) {
    const { id } = req.params;

    const repo = await prisma.gitHubRepo.findUnique({
      where: { id },
    });

    if (!repo) {
      throw new AppError('Repository not found', 404);
    }

    const abandonmentAnalysis = AbandonmentScorer.calculateScore(repo);

    res.json({
      healthScore: repo.healthScore,
      abandonmentScore: repo.abandonmentScore,
      isAbandoned: repo.isAbandoned,
      factors: abandonmentAnalysis.factors,
      analyzedAt: repo.analyzedAt,
    });
  }

  /**
   * Scan GitHub for abandoned repositories
   */
  static async scanRepos(req: Request, res: Response) {
    const { topics = [], forceRescan = false } = req.body;

    logger.info(`Starting repo scan for topics: ${topics.join(', ')}`);

    const githubService = new GitHubService();
    const repoData = await githubService.searchAbandonedRepos({
      topics,
      maxResults: 50,
    });

    let newRepos = 0;
    let updatedRepos = 0;

    for (const data of repoData) {
      const existing = await prisma.gitHubRepo.findUnique({
        where: { githubId: data.githubId },
      });

      // Check for incomplete README and outdated deps
      const [hasIncompleteReadme, hasOutdatedDeps] = await Promise.all([
        githubService.hasIncompleteReadme(data.owner, data.name),
        githubService.hasOutdatedDependencies(data.owner, data.name),
      ]);

      const abandonmentAnalysis = AbandonmentScorer.calculateScore(data, {
        hasIncompleteReadme,
        hasOutdatedDeps,
      });

      const repoPayload = {
        ...data,
        abandonmentScore: abandonmentAnalysis.score,
        healthScore: AbandonmentScorer.calculateHealthScore(abandonmentAnalysis.score),
        isAbandoned: abandonmentAnalysis.isAbandoned,
        analyzedAt: new Date(),
        scannedAt: new Date(),
      };

      if (existing) {
        await prisma.gitHubRepo.update({
          where: { id: existing.id },
          data: repoPayload,
        });
        updatedRepos++;
      } else {
        await prisma.gitHubRepo.create({
          data: repoPayload,
        });
        newRepos++;
      }
    }

    logger.info(`Scan complete: ${newRepos} new, ${updatedRepos} updated`);

    res.json({
      scanned: repoData.length,
      newRepos,
      updatedRepos,
    });
  }
}
