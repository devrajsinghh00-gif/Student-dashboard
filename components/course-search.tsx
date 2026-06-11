'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';

interface CourseSearchProps {
  onSearch: (query: string) => void;
}

export function CourseSearch({ onSearch }: CourseSearchProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    onSearch(query);
  }, [query, onSearch]);

  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
        <Search className="absolute left-4 h-4 w-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search courses..."
          className="w-full pl-12 pr-10 py-3 rounded-3xl border border-white/10 bg-slate-950/80 text-white placeholder-slate-500 outline-none transition focus:border-brand-400"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 text-slate-400 hover:text-white transition"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
