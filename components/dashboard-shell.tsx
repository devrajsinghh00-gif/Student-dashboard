'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '@/components/sidebar';

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#050816] text-slate-100">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} />
      <motion.div layout className="main-content transition-all duration-300 pl-80">
        {children}
      </motion.div>
    </div>
  );
}
