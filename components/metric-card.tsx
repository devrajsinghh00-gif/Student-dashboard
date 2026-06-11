'use client';

import { motion } from 'framer-motion';
import { BookOpen, Clock4, Sparkles, Trophy } from 'lucide-react';

const iconMap = {
  streak: Sparkles,
  focus: Clock4,
  courses: BookOpen,
  progress: Trophy
} as const;

type StatKey = keyof typeof iconMap;

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: StatKey;
}

export function MetricCard({ title, value, description, icon }: MetricCardProps) {
  const Icon = iconMap[icon];

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="glass-card overflow-hidden p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{title}</p>
          <h3 className="mt-4 text-3xl font-semibold text-white">{value}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-3xl bg-brand-500/15 text-brand-400 shadow-sm shadow-brand-500/10">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </motion.article>
  );
}
