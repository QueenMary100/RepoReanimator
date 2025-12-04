import { GitHubRepo } from '@prisma/client';

export interface AbandonmentScore {
  score: number;
  isAbandoned: boolean;
  factors: {
    timeScore: number;
    issueScore: number;
    activityScore: number;
    readmeScore: number;
    dependencyScore: number;
  };
}

export class AbandonmentScorer {
  /**
   * Calculate abandonment score for a repository
   * Score ranges from 0-100, where higher = more abandoned
   * Threshold: >= 50 is considered abandoned
   */
  static calculateScore(repo: Partial<GitHubRepo>, metadata?: {
    hasIncompleteReadme?: boolean;
    hasOutdatedDeps?: boolean;
  }): AbandonmentScore {
    const now = new Date();
    const lastCommit = repo.lastCommitDate ? new Date(repo.lastCommitDate) : now;
    const daysSinceLastCommit = Math.floor((now.getTime() - lastCommit.getTime()) / (1000 * 60 * 60 * 24));

    let timeScore = 0;
    let issueScore = 0;
    let activityScore = 0;
    let readmeScore = 0;
    let dependencyScore = 0;

    // Time factor (0-40 points)
    if (daysSinceLastCommit > 730) timeScore = 40;
    else if (daysSinceLastCommit > 365) timeScore = 30;
    else if (daysSinceLastCommit > 180) timeScore = 20;
    else if (daysSinceLastCommit > 90) timeScore = 10;

    // Issue factor (0-20 points)
    const openIssues = repo.openIssues || 0;
    if (openIssues > 50) issueScore = 20;
    else if (openIssues > 20) issueScore = 15;
    else if (openIssues > 10) issueScore = 10;
    else if (openIssues > 5) issueScore = 5;

    // Activity factor (0-20 points)
    const stars = repo.stars || 0;
    if (stars > 100 && daysSinceLastCommit > 180) activityScore = 20;
    else if (stars > 50 && daysSinceLastCommit > 180) activityScore = 15;
    else if (stars > 10 && daysSinceLastCommit > 365) activityScore = 10;

    // README factor (0-10 points)
    if (metadata?.hasIncompleteReadme) readmeScore = 10;

    // Dependencies factor (0-10 points)
    if (metadata?.hasOutdatedDeps) dependencyScore = 10;

    const totalScore = timeScore + issueScore + activityScore + readmeScore + dependencyScore;
    const isAbandoned = totalScore >= 50;

    return {
      score: Math.min(totalScore, 100),
      isAbandoned,
      factors: {
        timeScore,
        issueScore,
        activityScore,
        readmeScore,
        dependencyScore,
      },
    };
  }

  /**
   * Calculate health score (inverse of abandonment)
   */
  static calculateHealthScore(abandonmentScore: number): number {
    return Math.max(0, 100 - abandonmentScore);
  }
}
