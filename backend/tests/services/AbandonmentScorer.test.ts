import { AbandonmentScorer } from '../../src/services/AbandonmentScorer';

describe('AbandonmentScorer', () => {
  describe('calculateScore', () => {
    it('should score repo as abandoned when inactive for 2+ years', () => {
      const twoYearsAgo = new Date();
      twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

      const result = AbandonmentScorer.calculateScore({
        lastCommitDate: twoYearsAgo,
        stars: 100,
        openIssues: 10,
      });

      expect(result.score).toBeGreaterThanOrEqual(50);
      expect(result.isAbandoned).toBe(true);
      expect(result.factors.timeScore).toBe(40);
    });

    it('should score repo as healthy when recently active', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const result = AbandonmentScorer.calculateScore({
        lastCommitDate: yesterday,
        stars: 50,
        openIssues: 5,
      });

      expect(result.score).toBeLessThan(50);
      expect(result.isAbandoned).toBe(false);
    });

    it('should add points for many open issues', () => {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      const result = AbandonmentScorer.calculateScore({
        lastCommitDate: sixMonthsAgo,
        stars: 100,
        openIssues: 60,
      });

      expect(result.factors.issueScore).toBe(20);
    });

    it('should add points for incomplete README', () => {
      const result = AbandonmentScorer.calculateScore(
        {
          lastCommitDate: new Date(),
          stars: 50,
          openIssues: 5,
        },
        { hasIncompleteReadme: true }
      );

      expect(result.factors.readmeScore).toBe(10);
    });

    it('should calculate health score correctly', () => {
      const healthScore = AbandonmentScorer.calculateHealthScore(30);
      expect(healthScore).toBe(70);

      const zeroHealth = AbandonmentScorer.calculateHealthScore(100);
      expect(zeroHealth).toBe(0);
    });
  });
});
