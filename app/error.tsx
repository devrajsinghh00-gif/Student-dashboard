'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8 text-slate-200">
      <div className="glass-card max-w-xl space-y-6 p-8">
        <h1 className="text-3xl font-semibold text-white">Something went wrong</h1>
        <p className="text-slate-300">We were unable to load your learning dashboard. Try refreshing or check your database connection.</p>
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center justify-center rounded-2xl bg-brand-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-brand-400"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
