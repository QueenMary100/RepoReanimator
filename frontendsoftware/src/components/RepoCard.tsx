import { GitHubRepo } from '@/types';
import { motion } from 'framer-motion';
import { Star, GitFork, AlertCircle, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface RepoCardProps {
  repo: GitHubRepo;
  onClick?: () => void;
}

export default function RepoCard({ repo, onClick }: RepoCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-danger';
    if (score >= 50) return 'text-warning';
    return 'text-success';
  };

  const getHealthColor = (score: number) => {
    if (score >= 75) return 'text-success';
    if (score >= 50) return 'text-warning';
    return 'text-danger';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(139, 92, 246, 0.6)' }}
      whileTap={{ scale: 0.98 }}
      className="card cursor-pointer hover:border-primary transition-all duration-300"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gradient mb-2">
            {repo.fullName}
          </h3>
          <p className="text-textMuted text-sm line-clamp-2">
            {repo.description || 'No description available'}
          </p>
        </div>
        {repo.isAbandoned && (
          <span className="ml-4 px-3 py-1 bg-danger/20 text-danger rounded-full text-xs font-semibold">
            Abandoned
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {repo.topics.slice(0, 3).map((topic) => (
          <span
            key={topic}
            className="px-2 py-1 bg-primary/20 text-primary rounded text-xs"
          >
            {topic}
          </span>
        ))}
        {repo.topics.length > 3 && (
          <span className="px-2 py-1 bg-surface text-textMuted rounded text-xs">
            +{repo.topics.length - 3}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Star className="w-4 h-4 text-warning" />
          <span>{repo.stars.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <GitFork className="w-4 h-4 text-accent" />
          <span>{repo.forks.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <AlertCircle className="w-4 h-4 text-danger" />
          <span>{repo.openIssues} issues</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-textMuted" />
          <span className="text-xs">
            {formatDistanceToNow(new Date(repo.lastCommitDate), { addSuffix: true })}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-surface">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-xs text-textMuted">Health</p>
            <p className={`text-lg font-bold ${getHealthColor(repo.healthScore)}`}>
              {repo.healthScore.toFixed(0)}%
            </p>
          </div>
          <div>
            <p className="text-xs text-textMuted">Abandonment</p>
            <p className={`text-lg font-bold ${getScoreColor(repo.abandonmentScore)}`}>
              {repo.abandonmentScore.toFixed(0)}%
            </p>
          </div>
        </div>
        {repo.language && (
          <span className="px-3 py-1 bg-surface rounded-full text-xs">
            {repo.language}
          </span>
        )}
      </div>
    </motion.div>
  );
}
