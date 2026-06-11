# Next-Gen Learning Dashboard

A responsive learning dashboard built with Next.js App Router, Supabase, Tailwind CSS, Framer Motion, and Lucide React.

## What is included

- Next.js App Router layout with `app/page.tsx`
- Server-side Supabase fetch in `lib/supabaseClient.ts`
- Reusable components for sidebar, hero tile, course cards, activity chart, and a Bento grid
- Loading state via `app/loading.tsx`
- Error boundary via `app/error.tsx`
- Tailwind CSS styling and responsive design
- Framer Motion animations for page load and hover states

## Setup

1. Copy `.env.example` to `.env.local` and update it with your Supabase values.

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

2. Install dependencies:

```bash
cd learning-dashboard
npm install
```

3. Run the app:

```bash
npm run dev
```

4. If you have not set Supabase credentials, the dashboard will render placeholder state and prompt you to configure `.env.local`.

## Supabase profile table

Create a `profiles` table in Supabase with at least these columns:

- `id` (uuid, primary key)
- `full_name` (text)
- `learning_goal` (text)
- `favorite_topic` (text)

The app uses this table to save user details from the Settings panel.

5. Run the app:

```bash
npm run dev
```
