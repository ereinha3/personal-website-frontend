import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowDown } from 'react-icons/fi';

const GITHUB_USERNAME = 'ereinha3';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = "Computer Scientist passionate about improving accuracy and efficiency in AI";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 40);
    return () => clearInterval(timer);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl"
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-accent-cyan font-mono text-sm md:text-base mb-4"
          >
            Hey, I'm
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-2"
          >
            Ethan <span className="gradient-text">Reinhart</span>
          </motion.h1>
          
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 w-32 bg-gradient-to-r from-accent-cyan to-accent-purple mb-6 rounded-full"
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl lg:text-3xl text-[var(--text-secondary)] mb-8 min-h-[2rem]"
          >
            {typedText}
            <span className="animate-blink">|</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="https://github.com/ereinha3"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-6 py-3 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-full hover:border-accent-cyan transition-all duration-300 hover:shadow-glow-cyan"
            >
              <FiGithub className="group-hover:text-accent-cyan transition-colors" />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/ethan-reinhart"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-6 py-3 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-full hover:border-accent-purple transition-all duration-300 hover:shadow-glow-purple"
            >
              <FiLinkedin className="group-hover:text-accent-purple transition-colors" />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:ethanreinhart@gmail.com"
              className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-cyan to-accent-purple text-white rounded-full hover:shadow-lg transition-all duration-300"
            >
              <FiMail />
              <span>Get in Touch</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Content - Stats Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:block"
        >
          <div className="glass-solid rounded-3xl p-8 relative overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 rounded-full blur-3xl" />
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-[var(--border-subtle)]">
                  <img 
                    src="/headshot.png" 
                    alt="Ethan Reinhart" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold">M.S. Candidate</h3>
                  <p className="text-[var(--text-secondary)]">University of Oregon</p>
                  <p className="text-accent-cyan font-mono text-sm">GPA: 4.0</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
                  <p className="text-3xl font-bold gradient-text">15+</p>
                  <p className="text-sm text-[var(--text-secondary)]">Projects</p>
                </div>
                <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
                  <p className="text-3xl font-bold gradient-text">2</p>
                  <p className="text-sm text-[var(--text-secondary)]">Degrees</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {['Python', 'PyTorch', 'ML', 'Systems'].map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 py-1 text-sm rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.2, duration: 2, repeat: Infinity }}
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-tertiary)] hover:text-accent-cyan transition-colors"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <FiArrowDown size={20} />
      </motion.button>
    </section>
  );
};

export default Hero;
