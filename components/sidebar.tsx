'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, CircleDot, Home, LayoutGrid, Moon, Sparkles, TrendingUp, Users } from 'lucide-react';

const navItems = [
  { label: 'Overview', icon: Home, href: '#overview' },
  { label: 'Courses', icon: BookOpen, href: '#courses' },
  { label: 'Activity', icon: TrendingUp, href: '#activity' },
  { label: 'Community', icon: Users, href: '#overview' },
  { label: 'Settings', icon: LayoutGrid, href: '#settings' }
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <motion.aside
      layout
      layoutId="learning-dashboard-sidebar"
      initial={{ width: collapsed ? 96 : 320 }}
      animate={{ width: collapsed ? 96 : 320 }}
      transition={{ type: 'spring', stiffness: 220, damping: 28 }}
      className="fixed left-0 top-0 z-30 flex h-full flex-col border-r border-white/10 bg-slate-950/95 px-4 py-6 shadow-glow backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-3xl bg-brand-500 text-white shadow-lg shadow-brand-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className={collapsed ? 'hidden' : 'space-y-1'}>
            <p className="text-lg font-semibold text-white">Learning</p>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Dashboard</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onToggle}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900/90 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          aria-label="Toggle sidebar"
        >
          <CircleDot className="h-5 w-5" />
        </button>
      </div>

      <nav className="mt-10 flex-1">
        <AnimatePresence initial={false}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.label}
                href={item.href}
                whileHover={{ x: 4 }}
                className="group mb-2 flex w-full items-center gap-4 rounded-3xl px-4 py-3 text-left text-slate-300 transition hover:bg-slate-900 hover:text-white"
              >
                <Icon className="h-5 w-5 text-slate-400 transition group-hover:text-brand-400" />
                <span className={collapsed ? 'hidden' : 'block'}>{item.label}</span>
              </motion.a>
            );
          })}
        </AnimatePresence>
      </nav>

      <div className="mt-auto rounded-3xl border border-white/10 bg-slate-900/80 p-4 text-sm text-slate-300">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Focus mode</p>
            <p className="text-sm font-medium text-white">Quiet study</p>
          </div>
          <Moon className="h-5 w-5 text-slate-400" />
        </div>
      </div>
    </motion.aside>
  );
}
