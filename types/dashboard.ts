export type CourseIcon = 'book-open' | 'rocket' | 'code' | 'star' | 'layers';

export interface Course {
  id: string | number;
  title: string;
  progress: number;
  icon_name?: string;
}

export interface ActivityPoint {
  date: string;
  completed: number;
  focus_hours: number;
}

export interface Profile {
  id: string;
  full_name?: string;
  learning_goal?: string;
  favorite_topic?: string;
}
export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
}
export interface DashboardStat {
  title: string;
  value: string;
  description: string;
  icon: 'streak' | 'focus' | 'courses' | 'progress';
}
