'use client';

import { useEffect, useMemo, useState } from 'react';
import { ActivityChartTile } from '@/components/activity-chart-tile';
import { BentoGrid } from '@/components/bento-grid';
import { CourseCard } from '@/components/course-card';
import { HeroTile } from '@/components/hero-tile';
import { MetricCard } from '@/components/metric-card';
import { supabaseBrowser } from '@/lib/supabaseBrowser';
import { getUserEnrollments } from '@/lib/enrollmentActions';
import type { ActivityPoint, Course, Profile } from '@/types/dashboard';


interface DashboardContentProps {
  courses: Course[];
  activity: ActivityPoint[];
}

export function DashboardContent({ courses, activity }: DashboardContentProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [enrollments, setEnrollments] = useState<Set<string>>(new Set());
  const [loadingEnrollments, setLoadingEnrollments] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const { data: sessionData } = await supabaseBrowser.auth.getSession();
      if (!sessionData.session) {
        setLoadingProfile(false);
        return;
      }

      const user = sessionData.session.user;
      const { data } = await supabaseBrowser
        .from('profiles')
        .select('full_name,learning_goal,favorite_topic')
        .eq('id', user.id)
        .single();

      if (data) {
        setProfile(data as Profile);
      }

      setLoadingProfile(false);
    };

    const loadEnrollments = async () => {
      const enrolled = await getUserEnrollments();
      setEnrollments(enrolled);
      setLoadingEnrollments(false);
    };

    loadProfile();
    loadEnrollments();
  }, []);

  const handleEnrollmentChange = async () => {
    const enrolled = await getUserEnrollments();
    setEnrollments(enrolled);
  };


  const heroName = profile?.full_name?.split(' ')[0] ?? undefined;
  const heroGoal = profile?.learning_goal;
  const favoriteTopic = profile?.favorite_topic;

  const orderedCourses = useMemo(() => {
    if (!favoriteTopic) return courses;

    const favoriteLower = favoriteTopic.toLowerCase();
    const matched = courses.filter((course) => course.title.toLowerCase().includes(favoriteLower));
    const rest = courses.filter((course) => !course.title.toLowerCase().includes(favoriteLower));
    return [...matched, ...rest];
  }, [courses, favoriteTopic]);

  const totalCourses = courses.length;
  const totalFocusMinutes = activity.reduce((sum, point) => sum + point.focus_hours * 60, 0);
  const completedTasks = activity.reduce((sum, point) => sum + point.completed, 0);
  const averageProgress = totalCourses > 0 ? Math.round(courses.reduce((sum, course) => sum + course.progress, 0) / totalCourses) : 0;

  const metrics = [
    {
      title: 'Active courses',
      value: `${totalCourses}`,
      description: `Courses in progress right now${favoriteTopic ? ` around ${favoriteTopic}` : ''}`,
      icon: 'courses' as const
    },
    {
      title: 'Average progress',
      value: `${averageProgress}%`,
      description: 'Mean completion rate across your courses',
      icon: 'progress' as const
    },
    {
      title: 'Focus time',
      value: `${Math.round(totalFocusMinutes / 60)}h`,
      description: 'Total focus time in the last 14 days',
      icon: 'focus' as const
    },
    {
      title: 'Tasks completed',
      value: `${completedTasks}`,
      description: 'Recent course accomplishments',
      icon: 'streak' as const
    }
  ];

  return (
    <div className="space-y-6">
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <HeroTile
          streak={14}
          todayLearned="3 modules"
          focusMinutes={124}
          userName={heroName}
          learningGoal={heroGoal}
          favoriteTopic={favoriteTopic}
          loadingProfile={loadingProfile}
        />
        <ActivityChartTile activity={activity} />
      </section>

      <section className="space-y-4" id="courses">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Your courses</p>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">Continue learning</h2>
          </div>
          <p className="text-sm text-slate-400">Updated live from Supabase</p>
        </div>

        <BentoGrid>
          {orderedCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isEnrolled={enrollments.has(String(course.id))}
              onEnrollChange={handleEnrollmentChange}
            />
          ))}
        </BentoGrid>
      </section>
    </div>
  );
}
