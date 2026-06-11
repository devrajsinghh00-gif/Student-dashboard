import { supabaseBrowser } from '@/lib/supabaseBrowser';

export async function enrollCourse(courseId: string | number): Promise<{ success: boolean; error?: string }> {
  try {
    const { data: sessionData } = await supabaseBrowser.auth.getSession();
    if (!sessionData.session?.user) {
      return { success: false, error: 'Not authenticated' };
    }

    const { error } = await supabaseBrowser
      .from('enrollments')
      .insert({
        user_id: sessionData.session.user.id,
        course_id: String(courseId),
      });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

export async function unenrollCourse(courseId: string | number): Promise<{ success: boolean; error?: string }> {
  try {
    const { data: sessionData } = await supabaseBrowser.auth.getSession();
    if (!sessionData.session?.user) {
      return { success: false, error: 'Not authenticated' };
    }

    const { error } = await supabaseBrowser
      .from('enrollments')
      .delete()
      .eq('user_id', sessionData.session.user.id)
      .eq('course_id', String(courseId));

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}


export async function getUserEnrollments(): Promise<Set<string>> {
  try {
    const { data: sessionData } = await supabaseBrowser.auth.getSession();
    if (!sessionData.session?.user) {
      return new Set();
    }

    const { data } = await supabaseBrowser
      .from('enrollments')
      .select('course_id')
      .eq('user_id', sessionData.session.user.id);

    return new Set(data?.map((e) => String(e.course_id)) ?? []);
  } catch (err) {
    return new Set();
  }
}

