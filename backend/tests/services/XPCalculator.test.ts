import { XPCalculator } from '../../src/services/XPCalculator';
import { ContributionType, TaskDifficulty } from '@prisma/client';

describe('XPCalculator', () => {
  let calculator: XPCalculator;

  beforeEach(() => {
    calculator = new XPCalculator();
  });

  describe('calculateContributionXP', () => {
    it('should calculate base XP for commit', () => {
      const xp = calculator.calculateContributionXP('commit' as ContributionType);
      expect(xp).toBe(10);
    });

    it('should calculate base XP for PR', () => {
      const xp = calculator.calculateContributionXP('pr' as ContributionType);
      expect(xp).toBe(50);
    });

    it('should apply streak multiplier', () => {
      const xp = calculator.calculateContributionXP('commit' as ContributionType, 7);
      expect(xp).toBe(12); // 10 * 1.25 = 12.5, floored to 12
    });

    it('should apply first revival bonus', () => {
      const xp = calculator.calculateContributionXP('pr' as ContributionType, 0, true);
      expect(xp).toBe(100); // 50 * 2.0
    });

    it('should apply multiple multipliers', () => {
      const xp = calculator.calculateContributionXP('pr' as ContributionType, 30, true, true);
      // 50 * 1.5 (streak) * 2.0 (first) * 1.5 (legendary) = 225
      expect(xp).toBe(225);
    });
  });

  describe('calculateTaskXP', () => {
    it('should calculate XP for easy task', () => {
      const xp = calculator.calculateTaskXP('easy' as TaskDifficulty);
      expect(xp).toBe(25);
    });

    it('should calculate XP for hard task', () => {
      const xp = calculator.calculateTaskXP('hard' as TaskDifficulty);
      expect(xp).toBe(100);
    });
  });

  describe('calculateLevel', () => {
    it('should calculate level 1 for 0 XP', () => {
      const level = calculator.calculateLevel(0);
      expect(level).toBe(1);
    });

    it('should calculate level 2 for 100 XP', () => {
      const level = calculator.calculateLevel(100);
      expect(level).toBe(2);
    });

    it('should calculate level 10 for 10000 XP', () => {
      const level = calculator.calculateLevel(10000);
      expect(level).toBe(11);
    });
  });

  describe('calculateLevelProgress', () => {
    it('should calculate progress correctly', () => {
      const progress = calculator.calculateLevelProgress(150);
      expect(progress.currentLevel).toBe(2);
      expect(progress.currentLevelXP).toBe(100);
      expect(progress.nextLevelXP).toBe(400);
      expect(progress.progress).toBeCloseTo(16.67, 1);
    });
  });
});
