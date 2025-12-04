import { z } from 'zod';

export const analyzeRepoSchema = z.object({
  repoUrl: z.string().url(),
  depth: z.enum(['quick', 'standard', 'deep']).default('standard'),
});

export type AnalyzeRepoInput = z.infer<typeof analyzeRepoSchema>;

export interface Issue {
  category: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  location?: string;
}

export interface Recommendation {
  type: 'fix_dependencies' | 'add_tests' | 'update_docs' | 'fix_bugs' | 'add_features';
  priority: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  estimatedEffort: 'easy' | 'medium' | 'hard';
  xpReward: number;
}

export interface AnalysisResult {
  healthScore: number;
  abandonmentScore: number;
  issues: Issue[];
  recommendations: Recommendation[];
  metadata: {
    analyzedAt: string;
    analysisDepth: string;
    filesAnalyzed: number;
  };
}
