export interface User {
  id: string;
  githubId: string;
  username: string;
  email: string;
  avatarUrl: string;
  xp: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  lastContributionDate: string | null;
  badges: Badge[];
  createdAt: string;
  updatedAt: string;
}

export interface GitHubRepo {
  id: string;
  githubId: number;
  owner: string;
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  openIssues: number;
  lastCommitDate: string;
  createdAt: string;
  language: string | null;
  topics: string[];
  abandonmentScore: number;
  healthScore: number;
  isAbandoned: boolean;
  analyzedAt: string | null;
}

export interface Revival {
  id: string;
  userId: string;
  repoId: string;
  status: 'claimed' | 'in_progress' | 'completed' | 'abandoned';
  claimedAt: string;
  completedAt: string | null;
  xpEarned: number;
  user?: User;
  repo?: GitHubRepo;
}

export interface RevivalTask {
  id: string;
  revivalId: string;
  repoId: string;
  type: 'fix_dependencies' | 'add_tests' | 'update_docs' | 'fix_bugs' | 'add_features';
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  status: 'pending' | 'in_progress' | 'completed';
  completedAt: string | null;
}

export interface ContributionRecord {
  id: string;
  userId: string;
  revivalId: string;
  type: 'commit' | 'pr' | 'issue' | 'review';
  githubUrl: string;
  xpEarned: number;
  description: string;
  createdAt: string;
}

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

export interface Badge {
  id: string;
  code: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface UserStats {
  totalXP: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  totalRevivals: number;
  totalContributions: number;
  badges: Badge[];
}
