import { motion } from 'motion/react';

// Gentle fade-up once when scrolled into view (respects reduced motion via MotionConfig).
export default function Reveal({ children, className, delay = 0, as = 'div' }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </Tag>
  );
}
