import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub, FiStar, FiGitBranch } from 'react-icons/fi';

type Category = 'all' | 'featured' | 'ml' | 'systems' | 'web';

interface Project {
  title: string;
  description: string;
  skills: string[];
  link: string;
  github?: string;
  category: Category;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "Dermo - AI Dermatologist",
    description: "Award-winning BeaverHacks project using Vision Transformers for skin condition diagnosis with LLM integration.",
    skills: ['Vision Transformers', 'LLM', 'Python', 'React'],
    link: 'https://dermoai.com/',
    category: 'ml',
    featured: true,
  },
  {
    title: "HOUSER Recommender",
    description: "Novel recommender system using Graph Convolutional Networks to optimize post-purchase satisfaction.",
    skills: ['GCN', 'PyTorch', 'Research'],
    link: 'https://github.com/ereinha3/HOUSER',
    github: 'ereinha3/HOUSER',
    category: 'ml',
    featured: true,
  },
  {
    title: "Beat The Books",
    description: "Sports betting prediction platform using ensemble models for NBA game outcomes.",
    skills: ['Transformers', 'ML', 'Python'],
    link: 'https://beatthebooks.co',
    category: 'ml',
  },
  {
    title: "N-Body Barnes-Hut",
    description: "GPU-accelerated N-Body simulation using CUDA and Barnes-Hut approximation algorithm.",
    skills: ['CUDA', 'OpenMP', 'C++', 'Parallelism'],
    link: 'https://bitbucket.org/daxs-repo/uoregon-cs431531-f24-group/',
    category: 'systems',
  },
  {
    title: "SPMV OpenMP",
    description: "Parallelized Sparse Matrix-Vector Multiplication using OpenMP for high-performance computing.",
    skills: ['SPMV', 'OpenMP', 'C++'],
    link: 'https://github.com/ereinha3/CS431-Intro-to-Parallel-Computing',
    category: 'systems',
  },
  {
    title: "Neural Style Transfer",
    description: "CycleGAN-based artistic style transfer trained on diverse datasets.",
    skills: ['Python', 'Generative AI', 'TensorFlow'],
    link: 'https://github.com/ereinha3/Neural-Style-Transfer-Network',
    category: 'ml',
  },
  {
    title: "Crypto Price Prediction",
    description: "RNN-based cryptocurrency price prediction for Ethereum.",
    skills: ['Python', 'TensorFlow', 'RNN'],
    link: 'https://github.com/ereinha3/Watch-Profits-Soar-to-the-Ether',
    category: 'ml',
  },
  {
    title: "Portfolio Website",
    description: "Modern React portfolio with animations and responsive design.",
    skills: ['React', 'TypeScript', 'Tailwind'],
    link: 'https://github.com/ereinha3/ereinha3.github.io',
    github: 'ereinha3/ereinha3.github.io',
    category: 'web',
    featured: true,
  },
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filteredProjects = projects.filter(
    p => activeCategory === 'all' || 
         (activeCategory === 'featured' && p.featured) ||
         p.category === activeCategory
  );

  const featuredProjects = projects.filter(p => p.featured);

  return (
    <section id="projects" className="min-h-screen py-20 px-4 md:px-8 lg:px-16 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-cyan to-accent-purple mx-auto rounded-full" />
        </motion.div>

        {/* Featured Projects - Bento Grid */}
        {activeCategory === 'all' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          >
            {featuredProjects.map((project, index) => (
              <motion.a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`group relative rounded-2xl overflow-hidden ${
                  index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="glass-solid h-full p-6 flex flex-col relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className={`font-display font-semibold group-hover:gradient-text transition-all ${
                      index === 0 ? 'text-3xl' : 'text-xl'
                    }`}>
                      {project.title}
                    </h3>
                    <FiExternalLink className="text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <p className={`text-[var(--text-secondary)] mb-4 flex-grow ${
                    index === 0 ? 'text-lg' : 'text-sm'
                  }`}>
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map(skill => (
                      <span 
                        key={skill}
                        className="px-3 py-1 text-xs rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'featured', label: 'Featured' },
            { id: 'ml', label: 'AI/ML' },
            { id: 'systems', label: 'Systems' },
            { id: 'web', label: 'Web Dev' },
          ].map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as Category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-accent-cyan to-accent-purple text-white shadow-lg'
                  : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* All Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="group glass-solid rounded-xl p-5 hover:border-accent-cyan transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold group-hover:text-accent-cyan transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-2">
                  {project.github && (
                    <FiGithub className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)]" />
                  )}
                  <FiExternalLink className="text-[var(--text-tertiary)]" />
                </div>
              </div>
              
              <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-1.5">
                {project.skills.slice(0, 4).map(skill => (
                  <span 
                    key={skill}
                    className="px-2 py-0.5 text-xs rounded-md bg-[var(--bg-tertiary)] text-[var(--text-tertiary)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
