import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Next-Gen Learning Dashboard',
  description: 'A responsive learning dashboard built with Next.js, Supabase, Tailwind, and Framer Motion.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
