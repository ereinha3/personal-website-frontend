import { motion } from 'framer-motion';
import { GlassCard } from './ui';
import { useGitHubOrgRepos, getLanguageColor, GitHubRepo } from '../hooks/useGitHub';
import { FiGithub, FiExternalLink, FiStar, FiGitBranch, FiUsers } from 'react-icons/fi';

const ORGS = [
  { name: 'FarmGPU', description: 'GPU-accelerated farming optimization' },
  { name: 'oregonquantgroup', description: 'Quantitative research at UO' },
  { name: 'stateofthehart', description: 'Home lab infrastructure' },
  { name: 'moneypharm', description: 'Quantitative finance projects' },
];

const OrgRepoCard = ({ repo }: { repo: GitHubRepo }) => (
  <motion.a
    href={repo.html_url}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.02 }}
    className="block p-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] hover:border-accent-purple transition-all"
  >
    <div className="flex items-start justify-between mb-1">
      <h4 className="font-medium text-sm truncate pr-2">{repo.name}</h4>
      <FiExternalLink size={12} className="text-[var(--text-tertiary)] flex-shrink-0" />
    </div>
    <p className="text-xs text-[var(--text-tertiary)] line-clamp-1 mb-2">
      {repo.description || 'No description'}
    </p>
    <div className="flex items-center gap-3 text-xs text-[var(--text-tertiary)]">
      {repo.language && (
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getLanguageColor(repo.language) }} />
          {repo.language}
        </div>
      )}
      <div className="flex items-center gap-1">
        <FiStar size={10} />
        {repo.stargazers_count}
      </div>
    </div>
  </motion.a>
);

const OrganizationCard = ({ org, repos }: { org: typeof ORGS[0]; repos: GitHubRepo[] }) => (
  <GlassCard className="p-5" glow="purple">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-lg bg-accent-purple/20 flex items-center justify-center">
        <FiGithub size={20} />
      </div>
      <div>
        <h3 className="font-display font-semibold">{org.name}</h3>
        <p className="text-xs text-[var(--text-tertiary)]">{org.description}</p>
      </div>
    </div>
    
    <div className="space-y-2">
      {repos.length > 0 ? (
        repos.slice(0, 3).map((repo) => (
          <OrgRepoCard key={repo.id} repo={repo} />
        ))
      ) : (
        <p className="text-sm text-[var(--text-tertiary)]">No public repositories</p>
      )}
    </div>
    
    {repos.length > 3 && (
      <a
        href={`https://github.com/${org.name}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-3 text-xs text-accent-purple hover:underline"
      >
        View all {repos.length} repos →
      </a>
    )}
  </GlassCard>
);

const Organizations = () => {
  const orgNames = ORGS.map(o => o.name);
  const { orgRepos, loading } = useGitHubOrgRepos(orgNames);

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FiUsers className="text-3xl" />
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              My <span className="gradient-text">Organizations</span>
            </h2>
          </div>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Projects and research through various organizations I'm involved with
          </p>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="glass-solid rounded-2xl p-5 animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--bg-tertiary)]" />
                  <div>
                    <div className="h-4 w-24 bg-[var(--bg-tertiary)] rounded mb-2" />
                    <div className="h-3 w-32 bg-[var(--bg-tertiary)] rounded" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-16 bg-[var(--bg-tertiary)] rounded" />
                  <div className="h-16 bg-[var(--bg-tertiary)] rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {ORGS.map((org, index) => (
              <motion.div
                key={org.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <OrganizationCard org={org} repos={orgRepos[org.name] || []} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Organizations;
