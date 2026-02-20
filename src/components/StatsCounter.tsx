import { motion } from 'framer-motion';

interface GitHubStats {
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  total_stars: number;
  total_forks: number;
}

interface StatsCounterProps {
  stats: GitHubStats | null;
  loading: boolean;
}

const StatsCounter = ({ stats, loading }: StatsCounterProps) => {
  const statItems = [
    { 
      label: 'Public Repos', 
      value: stats?.public_repos ?? 0, 
      icon: '📚',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      label: 'Followers', 
      value: stats?.followers ?? 0, 
      icon: '👥',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      label: 'Total Stars', 
      value: stats?.total_stars ?? 0, 
      icon: '⭐',
      color: 'from-yellow-500 to-orange-500'
    },
    { 
      label: 'Total Forks', 
      value: stats?.total_forks ?? 0, 
      icon: '🍴',
      color: 'from-green-500 to-emerald-500'
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="relative overflow-hidden rounded-xl bg-[var(--bg-tertiary)] p-4"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-5`} />
          <div className="relative">
            <div className="text-3xl mb-2">{item.icon}</div>
            {loading ? (
              <div className="h-8 w-16 bg-[var(--bg-secondary)] rounded animate-pulse" />
            ) : (
              <motion.div
                key={item.value}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-2xl font-bold text-[var(--text-primary)]"
              >
                {item.value.toLocaleString()}
              </motion.div>
            )}
            <div className="text-sm text-[var(--text-tertiary)] mt-1">{item.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCounter;
