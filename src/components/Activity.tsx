import { motion } from 'framer-motion';
import { GitHubRepo, GitHubCommit } from '../hooks/useGitHub';
import { getLanguageColor } from '../hooks/useGitHub';

interface ActivityProps {
  commits: GitHubCommit[];
  loading: boolean;
}

const Activity = ({ commits, loading }: ActivityProps) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse flex gap-3">
            <div className="w-10 h-10 bg-[var(--bg-tertiary)] rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-[var(--bg-tertiary)] rounded w-3/4" />
              <div className="h-3 bg-[var(--bg-tertiary)] rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!commits || commits.length === 0) {
    return (
      <p className="text-[var(--text-tertiary)] text-center py-8">
        No recent activity
      </p>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-4">
      {commits.slice(0, 8).map((commit, index) => (
        <motion.a
          key={commit.sha}
          href={commit.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors group"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[var(--text-primary)] truncate group-hover:text-accent-cyan transition-colors">
              {commit.message}
            </p>
            <div className="flex items-center gap-2 mt-1 text-xs text-[var(--text-tertiary)]">
              <span className="font-mono">{commit.repo}</span>
              <span>•</span>
              <span>{formatDate(commit.date)}</span>
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  );
};

export default Activity;
