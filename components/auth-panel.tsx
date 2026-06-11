'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { supabaseBrowser } from '@/lib/supabaseBrowser';
import { CheckCircle2, Lock, LogIn, LogOut, User } from 'lucide-react';

export function AuthPanel() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [message, setMessage] = useState('');
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabaseBrowser.auth.getSession();
      setUserEmail(data.session?.user.email ?? null);
    };

    loadSession();

    const { data: authListener } = supabaseBrowser.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');

    if (!email || !password) {
      setMessage('Please enter both email and password.');
      return;
    }

    if (mode === 'signup') {
      if (!name) {
        setMessage('Please enter your name.');
        return;
      }

      const { data, error } = await supabaseBrowser.auth.signUp({ email, password });
      if (error) {
        setMessage(error.message);
        return;
      }

      // Save name to profiles table
      if (data.user) {
        const { error: profileError } = await supabaseBrowser
          .from('profiles')
          .upsert({
            id: data.user.id,
            full_name: name,
          })
          .eq('id', data.user.id);

        if (profileError) {
          console.error('Profile save error:', profileError);
        }
      }

      setMessage('Signup successful! Check your inbox for the confirmation email.');
      setName('');
      
      // Clear success message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    const { error } = await supabaseBrowser.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(error.message);
      return;
    }
    setMessage('Logged in successfully!');
    
    // Clear success message after 2 seconds
    setTimeout(() => setMessage(''), 2000);
  };

  const handleLogout = async () => {
    const { error } = await supabaseBrowser.auth.signOut();
    if (error) {
      setMessage(error.message);
      return;
    }
    setEmail('');
    setPassword('');
    setName('');
    setMessage('Logged out successfully.');
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
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Account</p>
          <h2 className="text-2xl font-semibold text-white">Authentication</h2>
        </div>
        {userEmail ? <CheckCircle2 className="h-6 w-6 text-green-400" /> : <User className="h-6 w-6 text-brand-400" />}
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-300">
        {userEmail
          ? `Logged in as ${userEmail}`
          : 'Sign up or login with your email and password to access the dashboard.'}
      </p>

      {userEmail ? (
        <div className="mt-8 space-y-4">
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-3xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-400"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
          {mode === 'signup' && (
            <div className="space-y-2 text-sm text-slate-300">
              <label className="flex items-center gap-2 text-slate-400">
                <User className="h-4 w-4 text-brand-400" />
                Full name
              </label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="John Doe"
                className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-brand-400"
              />
            </div>
          )}

          <div className="space-y-2 text-sm text-slate-300">
            <label className="flex items-center gap-2 text-slate-400">
              <User className="h-4 w-4 text-brand-400" />
              Email address
            </label>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="jane@example.com"
              className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-brand-400"
            />
          </div>

          <div className="space-y-2 text-sm text-slate-300">
            <label className="flex items-center gap-2 text-slate-400">
              <Lock className="h-4 w-4 text-brand-400" />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-brand-400"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-3xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-400"
            >
              <LogIn className="h-4 w-4" />
              {mode === 'signup' ? 'Sign up' : 'Login'}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'signup' ? 'login' : 'signup');
                setMessage('');
                setName('');
              }}
              className="text-sm text-slate-300 underline-offset-4 transition hover:text-white"
            >
              {mode === 'signup' ? 'Already have an account? Login' : "Don't have an account? Sign up"}
            </button>
          </div>

          {message && (
            <div className={`text-sm rounded-lg px-4 py-3 ${
              message.includes('successful') || message.includes('Logged in')
                ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                : 'bg-red-500/20 text-red-300 border border-red-500/30'
            }`}>
              {message}
            </div>
          )}
        </form>
      )}
    </motion.section>
  );
}
