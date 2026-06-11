import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const isAnonKeyMissing = !supabaseAnonKey || supabaseAnonKey.includes('your-anon-key');

if (!supabaseUrl) {
  throw new Error('Missing Supabase URL. Set NEXT_PUBLIC_SUPABASE_URL in your environment.');
}

if (isAnonKeyMissing && !supabaseKey) {
  throw new Error('Missing Supabase anon key or service role key. Set NEXT_PUBLIC_SUPABASE_ANON_KEY or SUPABASE_SERVICE_ROLE_KEY.');
}

if (isAnonKeyMissing) {
  console.warn('Using SUPABASE_SERVICE_ROLE_KEY for browser auth client because NEXT_PUBLIC_SUPABASE_ANON_KEY is missing. Replace with anon key for production.');
}

export const supabaseBrowser = createClient(supabaseUrl, supabaseAnonKey ?? supabaseKey as string);
