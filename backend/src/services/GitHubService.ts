import { Octokit } from '@octokit/rest';
import { logger } from '../utils/logger';
import { AbandonmentScorer } from './AbandonmentScorer';

export interface RepoSearchParams {
  topics?: string[];
  language?: string;
  minStars?: number;
  maxResults?: number;
}

export interface GitHubRepoData {
  githubId: number;
  owner: string;
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  openIssues: number;
  lastCommitDate: Date;
  createdAt: Date;
  language: string | null;
  topics: string[];
}

export class GitHubService {
  private octokit: Octokit;

  constructor(token?: string) {
    this.octokit = new Octokit({
      auth: token || process.env.GITHUB_TOKEN,
    });
  }

  /**
   * Search for potentially abandoned repositories
   */
  async searchAbandonedRepos(params: RepoSearchParams): Promise<GitHubRepoData[]> {
    try {
      const { topics = [], language, minStars = 10, maxResults = 100 } = params;

      // Build search query
      const queryParts: string[] = [];
      
      if (topics.length > 0) {
        queryParts.push(...topics.map(t => `topic:${t}`));
      }
      
      if (language) {
        queryParts.push(`language:${language}`);
      }
      
      queryParts.push(`stars:>=${minStars}`);
      queryParts.push('archived:false');
      queryParts.push('is:public');

      const query = queryParts.join(' ');

      logger.info(`Searching GitHub with query: ${query}`);

      const response = await this.octokit.search.repos({
        q: query,
        sort: 'updated',
        order: 'asc',
        per_page: Math.min(maxResults, 100),
      });

      const repos: GitHubRepoData[] = [];

      for (const repo of response.data.items) {
        // Get last commit date
        const commits = await this.octokit.repos.listCommits({
          owner: repo.owner.login,
          repo: repo.name,
          per_page: 1,
        });

        const lastCommitDate = commits.data[0]?.commit.author?.date 
          ? new Date(commits.data[0].commit.author.date)
          : new Date(repo.updated_at);

        repos.push({
          githubId: repo.id,
          owner: repo.owner.login,
          name: repo.name,
          fullName: repo.full_name,
          description: repo.description,
          url: repo.html_url,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          openIssues: repo.open_issues_count,
          lastCommitDate,
          createdAt: new Date(repo.created_at),
          language: repo.language,
          topics: repo.topics || [],
        });
      }

      logger.info(`Found ${repos.length} repositories`);
      return repos;
    } catch (error) {
      logger.error('Error searching GitHub repos:', error);
      throw error;
    }
  }

  /**
   * Get detailed repository information
   */
  async getRepoDetails(owner: string, name: string): Promise<GitHubRepoData> {
    try {
      const { data: repo } = await this.octokit.repos.get({
        owner,
        repo: name,
      });

      const commits = await this.octokit.repos.listCommits({
        owner,
        repo: name,
        per_page: 1,
      });

      const lastCommitDate = commits.data[0]?.commit.author?.date 
        ? new Date(commits.data[0].commit.author.date)
        : new Date(repo.updated_at);

      return {
        githubId: repo.id,
        owner: repo.owner.login,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        url: repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        openIssues: repo.open_issues_count,
        lastCommitDate,
        createdAt: new Date(repo.created_at),
        language: repo.language,
        topics: repo.topics || [],
      };
    } catch (error) {
      logger.error(`Error fetching repo ${owner}/${name}:`, error);
      throw error;
    }
  }

  /**
   * Check if README is incomplete
   */
  async hasIncompleteReadme(owner: string, name: string): Promise<boolean> {
    try {
      const { data } = await this.octokit.repos.getReadme({
        owner,
        repo: name,
      });

      const content = Buffer.from(data.content, 'base64').toString('utf-8');
      const lowerContent = content.toLowerCase();

      // Check for common incomplete indicators
      const incompleteIndicators = [
        'todo',
        'coming soon',
        'work in progress',
        'wip',
        'under construction',
        'placeholder',
      ];

      return incompleteIndicators.some(indicator => lowerContent.includes(indicator));
    } catch (error) {
      // No README or error fetching it
      return true;
    }
  }

  /**
   * Check for outdated dependencies (simplified check)
   */
  async hasOutdatedDependencies(owner: string, name: string): Promise<boolean> {
    try {
      // Check for package.json
      const { data } = await this.octokit.repos.getContent({
        owner,
        repo: name,
        path: 'package.json',
      });

      if ('content' in data) {
        const content = Buffer.from(data.content, 'base64').toString('utf-8');
        const packageJson = JSON.parse(content);

        // Simple heuristic: if package.json exists but no recent commits, likely outdated
        return true;
      }

      return false;
    } catch (error) {
      // No package.json or error
      return false;
    }
  }

  /**
   * Verify webhook signature
   */
  static verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha256', secret);
    const digest = 'sha256=' + hmac.update(payload).digest('hex');
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
  }
}
