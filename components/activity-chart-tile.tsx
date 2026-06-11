'use client';

import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import type { ActivityPoint } from '@/types/dashboard';

interface ActivityChartTileProps {
  activity: ActivityPoint[];
}

const barVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05 } })
};

export function ActivityChartTile({ activity }: ActivityChartTileProps) {
  const maxCompleted = Math.max(...activity.map((item) => item.completed), 1);

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="glass-card p-8"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Activity</p>
          <h2 className="text-2xl font-semibold text-white">Last 14 days</h2>
        </div>
        <Activity className="h-6 w-6 text-brand-400" />
      </div>

      <div className="mt-8 grid gap-4">
        <div className="flex gap-3 text-sm text-slate-400">
          <span className="rounded-full bg-slate-800 px-3 py-2">Completed</span>
          <span className="rounded-full bg-slate-800 px-3 py-2">Focus hours</span>
        </div>

        <div className="grid gap-3 rounded-3xl bg-slate-950/80 p-4">
          {activity.map((point, index) => {
            const height = Math.round((point.completed / maxCompleted) * 100);
            return (
              <motion.div
                key={point.date}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={barVariants}
                className="grid gap-2"
              >
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{point.date}</span>
                  <span>{point.completed} tasks</span>
                </div>
                <div className="h-3 rounded-full bg-slate-900">
                  <div className="h-full rounded-full bg-gradient-to-r from-brand-500 via-blue-500 to-cyan-400" style={{ width: `${height}%` }} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
