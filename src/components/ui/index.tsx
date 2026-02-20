import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'cyan' | 'purple' | 'none';
  delay?: number;
}

export const GlassCard = ({ 
  children, 
  className = '', 
  hover = true,
  glow = 'none',
  delay = 0 
}: GlassCardProps) => {
  const glowClass = {
    cyan: 'hover:shadow-glow-cyan',
    purple: 'hover:shadow-glow-purple',
    none: ''
  }[glow];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, type: 'spring', stiffness: 100 }}
      className={`
        glass-solid rounded-2xl p-6
        ${hover ? `transition-all duration-300 hover:-translate-y-1 ${glowClass}` : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  colSpan?: number;
  rowSpan?: number;
  delay?: number;
}

export const BentoCard = ({ 
  children, 
  className = '', 
  colSpan = 1,
  rowSpan = 1,
  delay = 0
}: BentoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay, type: 'spring', stiffness: 100 }}
      className={`
        bento-item
        col-span-12
        ${colSpan >= 6 ? 'md:col-span-6' : ''}
        ${colSpan >= 4 ? 'lg:col-span-4' : ''}
        ${colSpan >= 3 ? 'md:col-span-3' : ''}
        ${colSpan >= 8 ? 'lg:col-span-8' : ''}
        ${rowSpan > 1 ? `row-span-${rowSpan}` : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  className?: string;
}

export const Button = ({ 
  children, 
  onClick,
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  className = ''
}: ButtonProps) => {
  const baseStyles = `
    inline-flex items-center justify-center font-medium 
    rounded-full transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-cyan
  `;
  
  const variants = {
    primary: 'bg-gradient-to-r from-accent-cyan to-accent-purple text-white hover:shadow-glow-cyan',
    secondary: 'glass hover:bg-white/10',
    ghost: 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a 
        href={href} 
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  darkBg?: boolean;
}

export const Section = ({ children, id, className = '', darkBg = false }: SectionProps) => {
  return (
    <section 
      id={id}
      className={`
        min-h-screen py-20 px-4 md:px-8 lg:px-16
        ${darkBg ? 'bg-[var(--bg-secondary)]' : 'bg-[var(--bg-primary)]'}
        ${className}
      `}
    >
      {children}
    </section>
  );
};
