'use client';

import { motion } from 'framer-motion';
import { BookOpen, Code2, Layers, Rocket, Star } from 'lucide-react';
import { EnrollButton } from '@/components/enroll-button';
import type { Course } from '@/types/dashboard';

interface CourseCardProps {
  course: Course;
  isEnrolled?: boolean;
  onEnrollChange?: () => void;
}


const iconMap = {
  'book-open': BookOpen,
  rocket: Rocket,
  code: Code2,
  star: Star,
  layers: Layers
} as const;

function getIcon(name?: string) {
  if (!name) return BookOpen;
  const key = name.toLowerCase().replace(/\s+/g, '-');
  return (iconMap as Record<string, typeof BookOpen>)[key] ?? BookOpen;
}

export function CourseCard({ course, isEnrolled = false, onEnrollChange }: CourseCardProps) {
  const Icon = getIcon(course.icon_name);
  const progressWidth = `${Math.min(100, Math.max(0, course.progress))}%`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 240, damping: 22 }}
      className="glass-card overflow-hidden flex flex-col"
    >
      <div className="flex items-start justify-between gap-4 p-6">
        <div>
          <h3 className="text-xl font-semibold text-white">{course.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">Live progress from Supabase</p>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-3xl bg-brand-500/15 text-brand-400">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="border-t border-white/10 px-6 pb-6 pt-3 flex-1">
        <div className="flex items-center justify-between text-sm text-slate-400">
          <span>Progress</span>
          <span>{course.progress}%</span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full rounded-full bg-gradient-to-r from-brand-500 via-blue-500 to-cyan-400 transition-all" style={{ width: progressWidth }} />
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-4">
        <EnrollButton
          courseId={String(course.id)}
          isEnrolled={isEnrolled}
          onEnrollChange={onEnrollChange || (() => {})}
        />
      </div>
    </motion.article>
  );
}
