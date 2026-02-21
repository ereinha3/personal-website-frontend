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
      className="group flex-shrink-0 w-64 bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50 hover:border-blue-500/50 transition-all"
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors truncate">
          {repo.name}
        </h4>
        <svg className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    <div className="relative">
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {repos.slice(0, 6).map((repo, index) => (
          <FeaturedProjectCard key={repo.id} repo={repo} index={index} />
        ))}
      </div>
    </div>
  );
};

export default function Experience() {
  const { orgRepos, loading } = useGitHubOrgRepos(['FarmGPU']);
  const farmGpuRepos = orgRepos['FarmGPU'] || [];
  const featuredRepos = farmGpuRepos
    .filter(repo => !repo.fork && !repo.archived)
    .sort((a, b) => b.stargazers_count - a.stargazers_count);

  return (
    <section id="experience" className="py-20 px-4 md:px-8 lg:px-16 bg-gray-950 relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-10 w-80 h-80 bg-accent-purple/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -60, 0], y: [0, 40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-10 w-80 h-80 bg-accent-cyan/10 rounded-full blur-3xl"
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto relative z-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Experience
        </h2>
        <p className="text-gray-400 mb-8">Where I've worked and what I've built</p>

        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-6 md:p-8 border border-blue-500/20 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">AI Systems Engineer</h3>
              <div className="flex items-center gap-2">
                <a 
                  href="https://github.com/FarmGPU" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors font-medium flex items-center gap-1"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  FarmGPU
                </a>
              </div>
            </div>
            <span className="text-gray-400 text-sm">2024 - Present</span>
          </div>
          
          <p className="text-gray-300 leading-relaxed mb-6">
            Building GPU-accelerated solutions for agricultural optimization. Developing machine learning 
            pipelines, computer vision systems, and high-performance computing infrastructure to analyze 
            crop health, predict yields, and optimize resource allocation for modern farming operations.
          </p>
          
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Skills Developed</h4>
            <div className="flex flex-wrap gap-2">
              {['CUDA', 'PyTorch', 'Computer Vision', 'Distributed Systems', 'MLOps', 'GPU Computing'].map(skill => (
                <span 
                  key={skill}
                  className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full text-sm border border-blue-500/20"
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
      </motion.div>
    </section>
  );
}
