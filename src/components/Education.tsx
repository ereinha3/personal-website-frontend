import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const Education = () => {
  const education = [
    {
      degree: 'M.S. Computer Science',
      school: 'University of Oregon',
      period: '2024 - Present',
      repos: [
        { name: 'uo-graduate-work', org: 'uo-graduate-work', description: 'Research & Projects' }
      ]
    },
    {
      degree: 'B.S. Computer Science & Mathematics',
      school: 'University of Oregon',
      period: '2020 - 2024',
      repos: [
        { name: 'uo-undergrad-work', org: 'uo-undergrad-work', description: 'Coursework & Projects' }
      ]
    }
  ];

  return (
    <section id="education" className="py-16 px-4 md:px-8 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Education</span>
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className="w-2 h-2 rounded-full bg-accent-cyan" />
              <div>
                <h3 className="font-display text-xl font-semibold">{edu.degree}</h3>
                <p className="text-[var(--text-secondary)]">{edu.school}</p>
                <p className="text-sm text-[var(--text-tertiary)]">{edu.period}</p>
              </div>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <a
              href="https://github.com/uo-graduate-work"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-full hover:border-accent-cyan transition-colors"
            >
              <FiGithub />
              <span>Graduate Work</span>
              <FiExternalLink size={12} />
            </a>
            <a
              href="https://github.com/uo-undergrad-work"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-full hover:border-accent-purple transition-colors"
            >
              <FiGithub />
              <span>Undergrad Work</span>
              <FiExternalLink size={12} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
