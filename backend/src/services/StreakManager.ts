import { prisma } from '../utils/prisma';
import { logger } from '../utils/logger';

export interface StreakUpdate {
  currentStreak: number;
  longestStreak: number;
  streakBroken: boolean;
  streakExtended: boolean;
}

export class StreakManager {
  /**
   * Update user's contribution streak
   */
  static async updateStreak(userId: string): Promise<StreakUpdate> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        currentStreak: true,
        longestStreak: true,
        lastContributionDate: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const now = new Date();
    let currentStreak = user.currentStreak;
    let longestStreak = user.longestStreak;
    let streakBroken = false;
    let streakExtended = false;

    if (user.lastContributionDate) {
      const hoursSinceLastContribution = 
        (now.getTime() - user.lastContributionDate.getTime()) / (1000 * 60 * 60);

      if (hoursSinceLastContribution <= 24) {
        // Within 24 hours - extend streak
        currentStreak += 1;
        streakExtended = true;
      } else if (hoursSinceLastContribution > 48) {
        // More than 48 hours - break streak
        currentStreak = 1;
        streakBroken = true;
        logger.info(`Streak broken for user ${userId}`);
      } else {
        // Between 24-48 hours - maintain streak but don't extend
        currentStreak = 1;
      }
    } else {
      // First contribution
      currentStreak = 1;
      streakExtended = true;
    }

    // Update longest streak if current exceeds it
    if (currentStreak > longestStreak) {
      longestStreak = currentStreak;
    }

    // Update user in database
    await prisma.user.update({
      where: { id: userId },
      data: {
        currentStreak,
        longestStreak,
        lastContributionDate: now,
      },
    });

    return {
      currentStreak,
      longestStreak,
      streakBroken,
      streakExtended,
    };
  }

  /**
   * Check and break streaks for inactive users (run daily)
   */
  static async checkInactiveStreaks(): Promise<number> {
    const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);

    const result = await prisma.user.updateMany({
      where: {
        lastContributionDate: {
          lt: fortyEightHoursAgo,
        },
        currentStreak: {
          gt: 0,
        },
      },
      data: {
        currentStreak: 0,
      },
    });

    logger.info(`Broke streaks for ${result.count} inactive users`);
    return result.count;
  }

  /**
   * Get streak statistics
   */
  static async getStreakStats(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        currentStreak: true,
        longestStreak: true,
        lastContributionDate: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const now = new Date();
    let status: 'active' | 'at_risk' | 'broken' = 'active';
    let hoursUntilBreak = 0;

    if (user.lastContributionDate) {
      const hoursSinceLastContribution = 
        (now.getTime() - user.lastContributionDate.getTime()) / (1000 * 60 * 60);

      if (hoursSinceLastContribution > 48) {
        status = 'broken';
      } else if (hoursSinceLastContribution > 24) {
        status = 'at_risk';
        hoursUntilBreak = 48 - hoursSinceLastContribution;
      } else {
        hoursUntilBreak = 24 - hoursSinceLastContribution;
      }
    }

    return {
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
      lastContributionDate: user.lastContributionDate,
      status,
      hoursUntilBreak: Math.max(0, hoursUntilBreak),
    };
  }
}
