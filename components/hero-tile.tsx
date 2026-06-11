'use client';

import { motion } from 'framer-motion';
import { Sparkles, Clock4, BookOpen } from 'lucide-react';

interface HeroTileProps {
  streak: number;
  todayLearned: string;
  focusMinutes: number;
  userName?: string;
  learningGoal?: string;
  favoriteTopic?: string;
  loadingProfile?: boolean;
}

export function HeroTile({ streak, todayLearned, focusMinutes, userName, learningGoal, favoriteTopic, loadingProfile }: HeroTileProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="glass-card p-8 lg:p-10"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Welcome back{userName ? `, ${userName}` : ''}</p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">
            {userName ? `Ready to keep learning, ${userName}?` : 'Next-Gen Learning'}
          </h1>
          <p className="max-w-2xl text-slate-300 sm:text-lg">
            {loadingProfile
              ? 'Loading your personalized learning dashboard…'
              : learningGoal
              ? `Your next focus: ${learningGoal}. ${favoriteTopic ? `Explore more ${favoriteTopic} material.` : ''}`
              : 'Track your learning streak, progress through courses, and keep momentum with clean analytics.'}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-3xl bg-brand-900/80 px-4 py-3 text-brand-100 shadow-glow">
          <Sparkles className="h-5 w-5" />
          <span className="text-sm font-medium">14-day streak</span>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
          <p className="text-sm text-slate-400">Today learned</p>
          <div className="mt-4 flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-brand-400" />
            <div>
              <p className="text-xl font-semibold text-white">{todayLearned}</p>
              <p className="text-sm text-slate-500">Lessons completed</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
          <p className="text-sm text-slate-400">Focus time</p>
          <div className="mt-4 flex items-center gap-3">
            <Clock4 className="h-6 w-6 text-brand-400" />
            <div>
              <p className="text-xl font-semibold text-white">{focusMinutes} mins</p>
              <p className="text-sm text-slate-500">Active learning</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <a
          href="#courses"
          className="inline-flex items-center justify-center rounded-3xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-400"
        >
          Browse courses
        </a>
      </div>
    </motion.section>
  );
}
