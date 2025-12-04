import { LeaderboardPeriod } from '@prisma/client';
import { prisma } from '../utils/prisma';
import { logger } from '../utils/logger';

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatarUrl: string;
  rank: number;
  xp: number;
  revivals: number;
  contributions: number;
  level: number;
}

export class LeaderboardService {
  /**
   * Calculate and update leaderboard for a specific period
   */
  static async calculateLeaderboard(period: LeaderboardPeriod): Promise<number> {
    try {
      const dateFilter = this.getDateFilter(period);

      // Get user stats for the period
      const userStats = await prisma.user.findMany({
        select: {
          id: true,
          username: true,
          avatarUrl: true,
          xp: true,
          level: true,
          revivals: {
            where: dateFilter,
            select: { id: true },
          },
          contributions: {
            where: dateFilter,
            select: { id: true, xpEarned: true },
          },
        },
      });

      // Calculate stats and sort
      const entries = userStats
        .map(user => {
          const periodXP = period === 'all_time' 
            ? user.xp 
            : user.contributions.reduce((sum, c) => sum + c.xpEarned, 0);

          return {
            userId: user.id,
            username: user.username,
            avatarUrl: user.avatarUrl,
            xp: periodXP,
            revivals: user.revivals.length,
            contributions: user.contributions.length,
            level: user.level,
          };
        })
        .filter(entry => entry.xp > 0 || entry.contributions > 0)
        .sort((a, b) => {
          if (b.xp !== a.xp) return b.xp - a.xp;
          if (b.contributions !== a.contributions) return b.contributions - a.contributions;
          return b.revivals - a.revivals;
        });

      // Assign ranks
      const rankedEntries = entries.map((entry, index) => ({
        ...entry,
        rank: index + 1,
      }));

      // Delete old entries for this period
      await prisma.leaderboard.deleteMany({
        where: { period },
      });

      // Insert new entries
      await prisma.leaderboard.createMany({
        data: rankedEntries.map(entry => ({
          userId: entry.userId,
          period,
          rank: entry.rank,
          xp: entry.xp,
          revivals: entry.revivals,
          contributions: entry.contributions,
        })),
      });

      logger.info(`Updated ${period} leaderboard with ${rankedEntries.length} entries`);
      return rankedEntries.length;
    } catch (error) {
      logger.error(`Error calculating ${period} leaderboard:`, error);
      throw error;
    }
  }

  /**
   * Get leaderboard entries for a period
   */
  static async getLeaderboard(
    period: LeaderboardPeriod,
    page: number = 1,
    limit: number = 50
  ): Promise<{ entries: LeaderboardEntry[]; total: number }> {
    const skip = (page - 1) * limit;

    const [entries, total] = await Promise.all([
      prisma.leaderboard.findMany({
        where: { period },
        include: {
          user: {
            select: {
              username: true,
              avatarUrl: true,
              level: true,
            },
          },
        },
        orderBy: { rank: 'asc' },
        skip,
        take: limit,
      }),
      prisma.leaderboard.count({
        where: { period },
      }),
    ]);

    return {
      entries: entries.map(entry => ({
        userId: entry.userId,
        username: entry.user.username,
        avatarUrl: entry.user.avatarUrl,
        rank: entry.rank,
        xp: entry.xp,
        revivals: entry.revivals,
        contributions: entry.contributions,
        level: entry.user.level,
      })),
      total,
    };
  }

  /**
   * Get user's rank in a specific period
   */
  static async getUserRank(userId: string, period: LeaderboardPeriod): Promise<number | null> {
    const entry = await prisma.leaderboard.findUnique({
      where: {
        userId_period: {
          userId,
          period,
        },
      },
      select: { rank: true },
    });

    return entry?.rank || null;
  }

  /**
   * Refresh all leaderboards
   */
  static async refreshAllLeaderboards(): Promise<void> {
    const periods: LeaderboardPeriod[] = ['daily', 'weekly', 'monthly', 'all_time'];

    for (const period of periods) {
      await this.calculateLeaderboard(period);
    }

    logger.info('All leaderboards refreshed');
  }

  /**
   * Get date filter for period
   */
  private static getDateFilter(period: LeaderboardPeriod) {
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case 'daily':
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case 'weekly':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'monthly':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'all_time':
        return {};
    }

    return {
      createdAt: {
        gte: startDate,
      },
    };
  }
}
