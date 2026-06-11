'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Settings2, User } from 'lucide-react';
import { supabaseBrowser } from '@/lib/supabaseBrowser';
import type { Profile } from '@/types/dashboard';

export function SettingsPanel() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [learningGoal, setLearningGoal] = useState('');
  const [favoriteTopic, setFavoriteTopic] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      const { data: sessionData, error: sessionError } = await supabaseBrowser.auth.getSession();

      if (sessionError || !sessionData.session) {
        setStatus('Unable to load profile session.');
        setLoading(false);
        return;
      }

      const user = sessionData.session.user;
      setEmail(user.email ?? '');

      const { data, error } = await supabaseBrowser
        .from('profiles')
        .select('full_name,learning_goal,favorite_topic')
        .eq('id', user.id)
        .single();

      if (error && error.message !== 'No rows found') {
        setStatus(error.message);
      }

      if (data) {
        setName(data.full_name ?? '');
        setLearningGoal(data.learning_goal ?? '');
        setFavoriteTopic(data.favorite_topic ?? '');
      }

      setLoading(false);
    };

    loadProfile();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('');
    setSaving(true);

    const { data: sessionData, error: sessionError } = await supabaseBrowser.auth.getSession();

    if (sessionError || !sessionData.session) {
      setStatus('Unable to save profile because your session is unavailable.');
      setSaving(false);
      return;
    }

    const user = sessionData.session.user;
    const { error } = await supabaseBrowser.from('profiles').upsert({
      id: user.id,
      full_name: name,
      learning_goal: learningGoal,
      favorite_topic: favoriteTopic
    });

    if (error) {
      setStatus(error.message);
      setSaving(false);
      return;
    }

    setStatus('Profile saved successfully.');
    setSaving(false);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="glass-card p-8"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Settings</p>
          <h2 className="text-2xl font-semibold text-white">User details</h2>
        </div>
        <Settings2 className="h-6 w-6 text-brand-400" />
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-300">
        Provide your learning profile and preferences so the dashboard can feel more personalized.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
        <label className="space-y-2 text-sm text-slate-300">
          <span className="flex items-center gap-2 text-slate-400">
            <User className="h-4 w-4 text-brand-400" /> Full name
          </span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Jane Doe"
            disabled={loading}
            className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-brand-400 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </label>

        <label className="space-y-2 text-sm text-slate-300">
          <span className="flex items-center gap-2 text-slate-400">
            <Mail className="h-4 w-4 text-brand-400" /> Email address
          </span>
          <input
            type="email"
            value={email}
            disabled
            className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-400 outline-none transition focus:border-brand-400 disabled:cursor-not-allowed disabled:opacity-60"
          />
          <p className="text-xs text-slate-500">Email address is linked to your auth account.</p>
        </label>

        <label className="space-y-2 text-sm text-slate-300">
          <span className="text-slate-400">Learning goal</span>
          <input
            value={learningGoal}
            onChange={(event) => setLearningGoal(event.target.value)}
            placeholder="Build better dashboards"
            className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-brand-400"
          />
        </label>

        <label className="space-y-2 text-sm text-slate-300">
          <span className="text-slate-400">Favorite topic</span>
          <input
            value={favoriteTopic}
            onChange={(event) => setFavoriteTopic(event.target.value)}
            placeholder="UI design, React, data visualization"
            className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-brand-400"
          />
        </label>

        <button
          type="submit"
          disabled={loading || saving}
          className="inline-flex items-center justify-center rounded-3xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Save details'}
        </button>

        {status ? <p className="text-sm text-brand-300">{status}</p> : null}
      </form>
    </motion.section>
  );
}
