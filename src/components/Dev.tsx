import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import GitHubSkyline from './GitHubSkyline';

const GITHUB_COLORS: Record<string, string> = {
  Python: '#3776ab',
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#239120',
  Java: '#b07219',
  Go: '#00add8',
  Rust: '#dea584',
  Swift: '#fa7343',
  Kotlin: '#a97bff',
  Ruby: '#cc342d',
  PHP: '#4f5d95',
  Scala: '#c22d40',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Shell: '#89e051',
  Dockerfile: '#384d54',
  Makefile: '#427819',
  Vue: '#42b883',
  Svelte: '#ff3e00',
  Lua: '#000080',
  R: '#198ce7',
  MATLAB: '#e16737',
  Jupyter: '#f37626',
  CUDA: '#76b900',
};

const getLanguageColor = (language: string): string => {
  return GITHUB_COLORS[language] || '#6b7280';
};

const formatLinesOfCode = (bytes: number): string => {
  const lines = Math.round(bytes / 50);
  if (lines >= 1000000) {
    return `${(lines / 1000000).toFixed(1)}M`;
  }
  if (lines >= 1000) {
    return `${(lines / 1000).toFixed(1)}K`;
  }
  return lines.toString();
};

const formatStars = (stars: number): string => {
  if (stars >= 1000) {
    return `${(stars / 1000).toFixed(1)}K`;
  }
  return stars.toString();
};

interface DevStats {
  total_repos: number;
  total_stars: number;
  total_lines: number;
  languages: Record<string, number>;
  contribution_timeline: Array<{ week: string; commits: number }>;
}

const Dev = () => {
  const [hoveredLanguage, setHoveredLanguage] = useState<string | null>(null);
  const [stats, setStats] = useState<DevStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/github/dev-stats`);
        if (!res.ok) throw new Error('Failed to fetch dev stats');
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching dev stats:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading || !stats) {
    return (
    <section id="dev" className="bg-gray-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse text-gray-400">Loading dev stats...</div>
          </div>
        </div>
      </section>
    );
  }

  const languageData = Object.entries(stats.languages || {}).map(([name, percentage]) => ({
    name,
    value: percentage as number,
    color: getLanguageColor(name),
  }));

  const topLanguages = languageData.slice(0, 3);

  return (
    <section id="dev" className="bg-gray-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            Dev
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            A comprehensive overview of my development activity across GitHub
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center"
          >
            <div className="text-4xl font-bold text-blue-400 mb-2">
              {stats.total_repos}
            </div>
            <div className="text-gray-400">Repositories</div>
            <div className="text-xs text-gray-500 mt-1">
              Personal + Owned in Orgs
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center"
          >
            <div className="text-4xl font-bold text-yellow-400 mb-2">
              ⭐ {formatStars(stats.total_stars)}
            </div>
            <div className="text-gray-400">Stars</div>
            <div className="text-xs text-gray-500 mt-1">
              Across Owned Repos
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center"
          >
            <div className="text-4xl font-bold text-green-400 mb-2">
              {formatLinesOfCode(stats.total_lines)}
            </div>
            <div className="text-gray-400">Lines of Code</div>
            <div className="text-xs text-gray-500 mt-1">
              Approximate
            </div>
          </motion.div>
        </div>

        <div className="mb-12">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold text-white mb-6 text-center"
          >
            Contribution Skyline
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-xl p-6 overflow-hidden"
          >
            <GitHubSkyline />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6 text-center">
              Languages
            </h3>
            <div className="h-80 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={languageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1000}
                    onMouseEnter={(_, index) => {
                      setHoveredLanguage(languageData[index]?.name || null);
                    }}
                    onMouseLeave={() => setHoveredLanguage(null)}
                  >
                    {languageData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke={hoveredLanguage === entry.name ? '#fff' : 'transparent'}
                        strokeWidth={hoveredLanguage === entry.name ? 2 : 0}
                        style={{
                          filter:
                            hoveredLanguage === entry.name
                              ? 'drop-shadow(0 0 8px rgba(255,255,255,0.5))'
                              : 'none',
                          cursor: 'pointer',
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 shadow-xl">
                            <p className="text-white font-medium">{data.name}</p>
                            <p className="text-gray-400 text-sm">
                              {data.value.toFixed(2)}%
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">
                    {languageData.length}
                  </div>
                  <div className="text-xs text-gray-400">Languages</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
            className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              All Languages
            </h3>
            <div className="space-y-2 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
              {languageData.map((lang, index) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  viewport={{ once: true }}
                  onMouseEnter={() => setHoveredLanguage(lang.name)}
                  onMouseLeave={() => setHoveredLanguage(null)}
                  className={`flex items-center justify-between p-2 rounded-lg transition-all cursor-pointer ${
                    hoveredLanguage === lang.name
                      ? 'bg-gray-800/80 scale-105'
                      : 'hover:bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: lang.color }}
                    />
                    <span className="text-gray-300 text-sm">{lang.name}</span>
                  </div>
                  <span className="text-gray-500 text-sm font-mono">
                    {lang.value < 0.01 ? '<0.01' : lang.value.toFixed(2)}%
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Dev;
