import { DashboardShell } from '@/components/dashboard-shell';
import { AuthPanel } from '@/components/auth-panel';
import { AuthGate } from '@/components/auth-gate';
import { DashboardContent } from '@/components/dashboard-content';
import { SettingsPanel } from '@/components/settings-panel';
import { fetchDashboardData } from '@/lib/supabaseClient';

export default async function HomePage() {
  const { courses, activity } = await fetchDashboardData();

  return (
    <DashboardShell>
      <AuthGate>
        <main className="mx-auto min-h-screen max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
          <DashboardContent courses={courses} activity={activity} />

          <section id="settings" className="space-y-4">
            <div className="grid gap-6 xl:grid-cols-[1.25fr_0.85fr]">
              <AuthPanel />
              <SettingsPanel />
            </div>
          </section>
        </main>
      </AuthGate>
    </DashboardShell>
  );
}
