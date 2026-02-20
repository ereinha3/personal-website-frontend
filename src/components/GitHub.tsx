import { GlassCard } from './ui';
import { useGitHubStats, useGitHubRepos, getLanguageColor, GitHubRepo } from '../hooks/useGitHub';
import GitHubSkyline from './GitHubSkyline';
import * as FiIcons from 'react-icons/fi';

const FiGithub = (FiIcons.FiGithub as React.ComponentType<{ size?: number }>) || (() => null);
const FiStar = (FiIcons.FiStar as React.ComponentType<{ size?: number }>) || (() => null);
const FiGitBranch = (FiIcons.FiGitBranch as React.ComponentType<{ size?: number }>) || (() => null);
const FiExternalLink = (FiIcons.FiExternalLink as React.ComponentType<{ size?: number }>) || (() => null);

const GITHUB_USERNAME = 'ereinha3';

const GitHubStats = () => {
  console.log('[GitHubStats] Component rendering');
  const { stats, topLanguages, loading } = useGitHubStats();
  console.log('[GitHubStats] stats:', stats, 'loading:', loading);

  if (loading || !stats) {
    return (
      <div className="glass-solid rounded-2xl p-6 animate-pulse">
        <div className="h-6 w-32 bg-[var(--bg-tertiary)] rounded mb-4"></div>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-[var(--bg-tertiary)] rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <GlassCard className="p-6" glow="cyan">
      <div className="flex items-center gap-3 mb-6">
        <FiGithub size={24} />
        <h3 className="font-display text-xl font-semibold">GitHub Stats</h3>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <p className="text-3xl font-bold gradient-text">{stats.totalRepos}</p>
          <p className="text-sm text-[var(--text-secondary)]">Repositories</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold gradient-text">{stats.totalStars}</p>
          <p className="text-sm text-[var(--text-secondary)]">Stars</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold gradient-text">{stats.totalForks}</p>
          <p className="text-sm text-[var(--text-secondary)]">Forks</p>
        </div>
      </div>

      <div>
        <h4 className="text-sm text-[var(--text-secondary)] mb-2">Contribution Skyline (100 days)</h4>
        <GitHubSkyline />
      </div>

      <div className="mt-6">
        <h4 className="text-sm text-[var(--text-secondary)] mb-3">Top Languages</h4>
        <div className="flex flex-wrap gap-2">
          {topLanguages.map(({ language, count }) => (
            <div 
              key={language}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-tertiary)] text-sm"
            >
              <span 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: getLanguageColor(language) }}
              />
              {language}
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
};

const RepoCard = ({ repo }: { repo: GitHubRepo }) => {
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02, y: -2 }}
      className="block p-4 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] hover:border-accent-cyan transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-[var(--text-primary)] truncate pr-2">
          {repo.name}
        </h4>
        <span style={{ color: 'var(--text-tertiary)', flexShrink: 0 }}>
          <FiExternalLink size={16} />
        </span>
      </div>
      
      <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-3">
        {repo.description || 'No description'}
      </p>
      
      <div className="flex items-center gap-4 text-sm text-[var(--text-tertiary)]">
        {repo.language && (
          <div className="flex items-center gap-1">
            <span 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: getLanguageColor(repo.language) }}
            />
            {repo.language}
          </div>
        )}
        <div className="flex items-center gap-1">
          <FiStar size={14} />
          {repo.stargazers_count}
        </div>
        <div className="flex items-center gap-1">
          <FiGitBranch size={14} />
          {repo.forks_count}
        </div>
      </div>
    </motion.a>
  );
};

const FeaturedRepos = () => {
  const { repos, loading } = useGitHubRepos({ 
    sort: 'updated', 
    perPage: 6,
    type: 'all'
  });

  if (loading) {
    return (
      <GlassCard className="p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-[var(--bg-tertiary)] rounded"></div>
          ))}
        </div>
      </GlassCard>
    );
  }

  const featuredRepos = repos.slice(0, 6);

  return (
    <GlassCard className="p-6" glow="purple">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-xl font-semibold">Recent Repositories</h3>
        <a 
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-accent-cyan hover:underline"
        >
          View all
        </a>
      </div>

      <div className="space-y-3">
        {featuredRepos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
      <div className="mt-6">
        <GitHubSkyline />
      </div>
    </GlassCard>
  );
};

import { motion } from 'framer-motion';

export { GitHubStats, FeaturedRepos };
