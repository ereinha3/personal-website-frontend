import { useGitHubOrgRepos, GitHubRepo } from '../hooks/useGitHub';
import { motion } from 'framer-motion';

const FeaturedProjectCard = ({ repo, index }: { repo: GitHubRepo; index: number }) => {
  const getLanguageColor = (lang: string | null) => {
    const colors: Record<string, string> = {
      Python: '#3572A5',
      JavaScript: '#f1e05a',
      TypeScript: '#2b7489',
      'C++': '#f34b7d',
      C: '#555555',
      Go: '#00ADD8',
      Rust: '#dea584',
    };
    return colors[lang || ''] || '#8b949e';
  };

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group flex-shrink-0 w-64 bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50 hover:border-purple-500/50 transition-all"
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-white group-hover:text-purple-400 transition-colors truncate">
          {repo.name}
        </h4>
        <svg className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>
      
      <p className="text-gray-400 text-sm mb-3 line-clamp-2 h-10">
        {repo.description || 'No description available'}
      </p>
      
      <div className="flex items-center gap-3 text-xs text-gray-500">
        {repo.language && (
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getLanguageColor(repo.language) }} />
            <span>{repo.language}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
          </svg>
          <span>{repo.stargazers_count}</span>
        </div>
      </div>
    </motion.a>
  );
};

const ProjectCarousel = ({ repos }: { repos: GitHubRepo[] }) => {
  if (repos.length === 0) return null;
  
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
      {repos.slice(0, 6).map((repo, index) => (
        <FeaturedProjectCard key={repo.id} repo={repo} index={index} />
      ))}
    </div>
  );
};

const HobbyCard = ({ 
  title, 
  orgs, 
  description, 
  skills,
  period,
  status,
  orgRepos,
  loading
}: { 
  title: string;
  orgs: string[];
  description: string;
  skills: string[];
  period?: string;
  status?: 'active' | 'inactive';
  orgRepos: Record<string, GitHubRepo[]>;
  loading: boolean;
}) => {
  const allRepos = orgs.flatMap(org => orgRepos[org] || []);
  const featuredRepos = allRepos
    .filter(repo => !repo.fork && !repo.archived)
    .sort((a, b) => b.stargazers_count - a.stargazers_count);

  return (
    <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-6 md:p-8 border border-gray-700/30">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            {status && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                status === 'active' 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
              }`}>
                {status}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {orgs.map(org => (
              <a 
                key={org}
                href={`https://github.com/${org}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors text-sm flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                {org}
              </a>
            ))}
          </div>
        </div>
        {period && <span className="text-gray-400 text-sm">{period}</span>}
      </div>
      
      <p className="text-gray-300 leading-relaxed mb-4">
        {description}
      </p>
      
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {skills.map(skill => (
            <span 
              key={skill}
              className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full text-sm border border-purple-500/20"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {featuredRepos.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Featured Projects</h4>
          {loading ? (
            <div className="flex gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-64 h-32 bg-gray-800/50 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <ProjectCarousel repos={featuredRepos} />
          )}
        </div>
      )}
    </div>
  );
};

export default function Hobbies() {
  const { orgRepos, loading } = useGitHubOrgRepos(['oregonquantgroup', 'moneypharm', 'stateofthehart', 'hartrach']);

  const hobbies = [
    {
      title: 'Quantitative Finance',
      orgs: ['oregonquantgroup', 'moneypharm'],
      description: 'Exploring the intersection of AI and financial markets. Developing algorithmic trading strategies, building predictive models for market analysis, and researching applications of machine learning in quantitative finance. Currently focused on deep learning approaches to time-series forecasting and reinforcement learning for portfolio optimization.',
      skills: ['Quantitative Analysis', 'Deep Learning', 'Time-Series', 'Reinforcement Learning', 'Python', 'PyTorch'],
      period: '2022 - Present',
      status: 'active' as const,
    },
    {
      title: 'Home Lab',
      orgs: ['stateofthehart'],
      description: 'Building and maintaining a personal homelab infrastructure for experimentation and learning. Running various services, containers, and development environments. Passionate about Linux system administration, networking, and self-hosting solutions.',
      skills: ['Linux', 'Docker', 'Kubernetes', 'Networking', 'System Administration', 'Self-Hosting'],
      period: '2020 - Present',
      status: 'active' as const,
    },
    {
      title: 'Hartrach LLC',
      orgs: ['hartrach'],
      description: 'A limited liability company founded with a friend for collaborative projects and ventures. Currently inactive as we focus on individual career development, but serves as a placeholder for future joint initiatives.',
      skills: ['Entrepreneurship', 'Collaboration'],
      period: '2023',
      status: 'inactive' as const,
    },
  ];

  return (
    <section id="hobbies" className="py-20 px-4 md:px-8 lg:px-16 bg-gray-950 relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-10 w-64 h-64 bg-accent-cyan/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 20, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-10 w-64 h-64 bg-accent-purple/10 rounded-full blur-3xl"
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto relative z-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Hobbies & Side Projects
        </h2>
        <p className="text-gray-400 mb-8">What I work on outside of my day job</p>

        <div className="space-y-6">
          {hobbies.map((hobby, index) => (
            <motion.div
              key={hobby.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <HobbyCard 
                {...hobby}
                orgRepos={orgRepos}
                loading={loading}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
