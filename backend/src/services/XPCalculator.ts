import { ContributionType, TaskDifficulty } from '@prisma/client';

export interface XPConfig {
  baseXP: {
    commit: number;
    pr: number;
    issue: number;
    review: number;
  };
  taskXP: {
    easy: number;
    medium: number;
    hard: number;
  };
  multipliers: {
    streak3: number;
    streak7: number;
    streak30: number;
    firstRevival: number;
    legendaryRepo: number;
  };
}

const DEFAULT_CONFIG: XPConfig = {
  baseXP: {
    commit: 10,
    pr: 50,
    issue: 20,
    review: 15,
  },
  taskXP: {
    easy: 25,
    medium: 50,
    hard: 100,
  },
  multipliers: {
    streak3: 1.1,
    streak7: 1.25,
    streak30: 1.5,
    firstRevival: 2.0,
    legendaryRepo: 1.5,
  },
};

export class XPCalculator {
  private config: XPConfig;

  constructor(config: XPConfig = DEFAULT_CONFIG) {
    this.config = config;
  }

  /**
   * Calculate XP for a contribution
   */
  calculateContributionXP(
    type: ContributionType,
    streak: number = 0,
    isFirstRevival: boolean = false,
    isLegendaryRepo: boolean = false
  ): number {
    let baseXP = 0;

    switch (type) {
      case 'commit':
        baseXP = this.config.baseXP.commit;
        break;
      case 'pr':
        baseXP = this.config.baseXP.pr;
        break;
      case 'issue':
        baseXP = this.config.baseXP.issue;
        break;
      case 'review':
        baseXP = this.config.baseXP.review;
        break;
    }

    return this.applyMultipliers(baseXP, streak, isFirstRevival, isLegendaryRepo);
  }

  /**
   * Calculate XP for completing a task
   */
  calculateTaskXP(
    difficulty: TaskDifficulty,
    streak: number = 0,
    isFirstRevival: boolean = false,
    isLegendaryRepo: boolean = false
  ): number {
    let baseXP = 0;

    switch (difficulty) {
      case 'easy':
        baseXP = this.config.taskXP.easy;
        break;
      case 'medium':
        baseXP = this.config.taskXP.medium;
        break;
      case 'hard':
        baseXP = this.config.taskXP.hard;
        break;
    }

    return this.applyMultipliers(baseXP, streak, isFirstRevival, isLegendaryRepo);
  }

  /**
   * Apply multipliers to base XP
   */
  private applyMultipliers(
    baseXP: number,
    streak: number,
    isFirstRevival: boolean,
    isLegendaryRepo: boolean
  ): number {
    let multiplier = 1.0;

    // Streak multipliers
    if (streak >= 30) {
      multiplier *= this.config.multipliers.streak30;
    } else if (streak >= 7) {
      multiplier *= this.config.multipliers.streak7;
    } else if (streak >= 3) {
      multiplier *= this.config.multipliers.streak3;
    }

    // First revival bonus
    if (isFirstRevival) {
      multiplier *= this.config.multipliers.firstRevival;
    }

    // Legendary repo bonus
    if (isLegendaryRepo) {
      multiplier *= this.config.multipliers.legendaryRepo;
    }

    return Math.floor(baseXP * multiplier);
  }

  /**
   * Calculate level from total XP
   */
  calculateLevel(totalXP: number): number {
    return Math.floor(Math.sqrt(totalXP / 100)) + 1;
  }

  /**
   * Calculate XP needed for next level
   */
  calculateXPForNextLevel(currentLevel: number): number {
    return Math.pow(currentLevel, 2) * 100;
  }

  /**
   * Calculate progress to next level
   */
  calculateLevelProgress(totalXP: number): {
    currentLevel: number;
    currentLevelXP: number;
    nextLevelXP: number;
    progress: number;
  } {
    const currentLevel = this.calculateLevel(totalXP);
    const currentLevelXP = Math.pow(currentLevel - 1, 2) * 100;
    const nextLevelXP = Math.pow(currentLevel, 2) * 100;
    const xpInCurrentLevel = totalXP - currentLevelXP;
    const xpNeededForLevel = nextLevelXP - currentLevelXP;
    const progress = (xpInCurrentLevel / xpNeededForLevel) * 100;

    return {
      currentLevel,
      currentLevelXP,
      nextLevelXP,
      progress: Math.min(progress, 100),
    };
  }
}
