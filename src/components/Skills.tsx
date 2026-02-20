import { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { useGitHubLanguages } from '../hooks/useGitHub';

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
  'ASP.NET': '#9400D3',
  'C#': '#178600',
  Jupyter: '#F37626',
  Notebook: '#F37626',
};

const getLanguageColor = (name: string): string => {
  return languageColorMap[name] || `hsl(${Math.abs(name.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % 360}, 70%, 50%)`;
};

interface LanguageData {
  name: string;
  value: number;
  color: string;
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: LanguageData }> }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg p-3 shadow-xl">
        <p className="font-semibold text-[var(--text-primary)]">{data.name}</p>
        <p className="text-sm text-[var(--text-secondary)]">{data.value.toFixed(2)}%</p>
      </div>
    );
  }
  return null;
};

const Skills = () => {
  const { languages, loading } = useGitHubLanguages();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Transform languages data for the pie chart - include ALL languages
  const chartData: LanguageData[] = languages
    ? Object.entries(languages)
        .map(([name, percent]) => ({
          name,
          value: percent,
          color: getLanguageColor(name),
        }))
        .sort((a, b) => b.value - a.value) // Sort by percentage descending
    : [];

  if (loading) {
    return (
      <section id="skills" className="min-h-screen py-20 px-4 md:px-8 lg:px-16 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Languages</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-accent-cyan to-accent-purple mx-auto rounded-full" />
          </motion.div>
          <div className="flex justify-center">
            <div className="w-96 h-96 rounded-full bg-[var(--bg-tertiary)] animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="min-h-screen py-20 px-4 md:px-8 lg:px-16 bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Languages</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-cyan to-accent-purple mx-auto rounded-full mb-6" />
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Distribution of programming languages across all my repositories
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="h-[400px] md:h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={180}
                    paddingAngle={1}
                    dataKey="value"
                    onMouseEnter={(_, index) => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke={hoveredIndex === index ? '#fff' : 'transparent'}
                        strokeWidth={hoveredIndex === index ? 3 : 0}
                        style={{
                          filter: hoveredIndex === index ? 'brightness(1.1)' : 'none',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      />
                    ))}
                  </Pie>
                  <RechartsTooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Center label */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <p className="text-[var(--text-tertiary)] text-sm">Total</p>
                <p className="text-3xl font-bold text-[var(--text-primary)]">
                  {chartData.length}
                </p>
                <p className="text-[var(--text-tertiary)] text-sm">languages</p>
              </div>
            </div>
          </motion.div>

          {/* Language List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="max-h-[500px] overflow-y-auto pr-2 space-y-1 custom-scrollbar">
              {chartData.map((lang, index) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.02 }}
                  className="flex items-center gap-3 p-2 rounded hover:bg-[var(--bg-tertiary)]/30 transition-colors cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: lang.color }}
                  />
                  <span className="text-sm flex-grow">{lang.name}</span>
                  <span className="text-sm text-[var(--text-tertiary)] font-mono">
                    {lang.value < 0.01 ? '<0.01%' : `${lang.value.toFixed(2)}%`}
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

export default Skills;
