'use client';

import { useEffect, useState, type PropsWithChildren } from 'react';
import { supabaseBrowser } from '@/lib/supabaseBrowser';
import { AuthPanel } from '@/components/auth-panel';

export function AuthGate({ children }: PropsWithChildren) {
  const [authenticated, setAuthenticated] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabaseBrowser.auth.getSession();
      setAuthenticated(Boolean(data.session));
    };

    loadSession();

    const { data: authListener } = supabaseBrowser.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(Boolean(session));
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (authenticated === undefined) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center rounded-3xl bg-slate-950/80 p-8 text-slate-300 shadow-glow">
        <p className="text-base">Checking authentication status...</p>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="space-y-6 rounded-3xl border border-white/10 bg-slate-950/80 p-8 shadow-glow">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Get Started</p>
          <h1 className="text-3xl font-semibold text-white">Next-Gen Learning Dashboard</h1>
          <p className="max-w-2xl text-slate-400">
            Join thousands of learners. Create an account or log in to start tracking your progress, exploring courses, and achieving your learning goals.
          </p>
        </div>
        <AuthPanel />
      </div>
    );
  }

  return <>{children}</>;
}
