'use client';

import { motion } from 'framer-motion';

interface BentoGridProps {
  children: React.ReactNode;
}

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

export function BentoGrid({ children }: BentoGridProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
    >
      {children}
    </motion.div>
  );
}
