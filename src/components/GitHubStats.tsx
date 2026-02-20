import { motion } from 'framer-motion';
import GitHubSkyline from './GitHubSkyline';
import { GlassCard } from './ui';
import { useGitHubLanguages, useGitHubTopRepos } from '../hooks/useGitHub';

const languageColorMap: Record<string, string> = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  HTML: '#e34c26',
  CSS: '#563d7c',
  C: '#555555',
  'C++': '#f34b7d',
  Java: '#b07219',
  Swift: '#F05138',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Kotlin: '#A97BFF',
  Shell: '#89e051',
  Lua: '#000080',
  R: '#198CE7',
  MATLAB: '#e16737',
  CUDA: '#88AADD',
};

const GitHubStats = () => {
  const { languages, loading: langLoading } = useGitHubLanguages();
  const { repos, loading: reposLoading } = useGitHubTopRepos(5);
  
  const languageEntries = Object.entries(languages || {}).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const maxLang = languageEntries[0]?.[1] || 1;

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
            GitHub <span className="gradient-text">Activity</span>
          </h2>
          <p className="text-[var(--text-secondary)]">Real-time data from my contribution history</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Language Distribution */}
          <GlassCard>
            <h3 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
              <span>📊</span> Language Distribution
            </h3>
            {langLoading ? (
              <div className="animate-pulse space-y-3">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="h-8 bg-[var(--bg-tertiary)] rounded" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {languageEntries.map(([lang, percent], i) => (
                  <motion.div
                    key={lang}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: languageColorMap[lang] || '#888' }}
                        />
                        <span className="text-sm font-medium">{lang}</span>
                      </div>
                      <span className="text-sm text-[var(--text-tertiary)]">{percent.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(percent / maxLang) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: languageColorMap[lang] || '#888' }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </GlassCard>

          {/* Top Repos by Commits */}
          <GlassCard>
            <h3 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
              <span>🔥</span> Top Repos by My Commits
            </h3>
            {reposLoading ? (
              <div className="animate-pulse space-y-3">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="h-12 bg-[var(--bg-tertiary)] rounded" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {repos.map((repo, i) => (
                  <motion.a
                    key={repo.repo}
                    href={`https://github.com/${repo.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="block p-3 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-hover)] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm truncate flex-1">{repo.repo}</span>
                      <span className="text-accent-cyan text-sm font-semibold ml-2">{repo.commits} commits</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            )}
          </GlassCard>
        </div>

        {/* Contribution Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <GlassCard>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">📈</span>
                <div>
                  <p className="text-2xl font-bold gradient-text">{repos?.reduce((sum, r) => sum + r.commits, 0).toLocaleString()}</p>
                  <p className="text-sm text-[var(--text-secondary)]">Total Commits (Top 5 Repos)</p>
                </div>
              </div>
              <a
                href="https://github.com/ereinha3"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-hover)] transition-colors text-sm"
              >
                View Full Profile →
              </a>
            </div>
          </GlassCard>
        </motion.div>

        {/* GitHub Skyline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8"
        >
            <div className="mt-8">
              <GlassCard>
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold">GitHub Skyline</h3>
                  <p className="text-sm text-[var(--text-secondary)]">Your contribution timeline</p>
                </div>
                <GitHubSkyline />
              </GlassCard>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubStats;
