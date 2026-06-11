import { createClient } from '@supabase/supabase-js';
import type { ActivityPoint, Course } from '@/types/dashboard';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const isPlaceholderEnv =
  !supabaseUrl ||
  !supabaseKey ||
  supabaseUrl.includes('your-project') ||
  supabaseKey.includes('your-service');

const mockCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Design Systems Mastery',
    progress: 78,
    icon_name: 'Layers'
  },
  {
    id: 'course-2',
    title: 'React Performance',
    progress: 63,
    icon_name: 'Code'
  },
  {
    id: 'course-3',
    title: 'Product Thinking',
    progress: 54,
    icon_name: 'Book Open'
  }
];

const mockActivity: ActivityPoint[] = [
  { date: 'May 20', completed: 6, focus_hours: 1.4 },
  { date: 'May 21', completed: 8, focus_hours: 1.8 },
  { date: 'May 22', completed: 10, focus_hours: 2.1 },
  { date: 'May 23', completed: 7, focus_hours: 1.3 },
  { date: 'May 24', completed: 9, focus_hours: 1.7 },
  { date: 'May 25', completed: 12, focus_hours: 2.4 },
  { date: 'May 26', completed: 11, focus_hours: 2.0 }
];

if (isPlaceholderEnv) {
  console.warn('Using local dashboard fallback data because Supabase environment variables are placeholder or missing.');
}

const supabase = isPlaceholderEnv
  ? null
  : createClient(supabaseUrl as string, supabaseKey as string, {
      auth: {
        persistSession: false
      }
    });

export async function fetchDashboardData(): Promise<{ courses: Course[]; activity: ActivityPoint[] }> {
  if (isPlaceholderEnv || !supabase) {
    return {
      courses: mockCourses,
      activity: mockActivity
    };
  }

  const [coursesResponse, activityResponse] = await Promise.all([
    supabase.from('courses').select('id,title,progress,icon_name').order('progress', { ascending: false }),
    supabase.from('activities').select('date,completed,focus_hours').order('date', { ascending: true }).limit(14)
  ]);

  if (coursesResponse.error) {
    throw new Error(`Failed to load courses: ${coursesResponse.error.message}`);
  }

  if (activityResponse.error) {
    return {
      courses: coursesResponse.data ?? [],
      activity: mockActivity
    };
  }

  return {
    courses: coursesResponse.data ?? [],
    activity: activityResponse.data ?? []
  };
}
