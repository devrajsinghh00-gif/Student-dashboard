export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8 text-slate-300">
      <div className="animate-pulse space-y-4 rounded-3xl border border-white/10 bg-slate-900/80 p-10 shadow-glow">
        <div className="h-6 w-48 rounded-full bg-slate-700" />
        <div className="h-4 w-72 rounded-full bg-slate-700" />
        <div className="grid gap-3 md:grid-cols-3">
          <div className="h-40 rounded-3xl bg-slate-800" />
          <div className="h-40 rounded-3xl bg-slate-800" />
          <div className="h-40 rounded-3xl bg-slate-800" />
        </div>
      </div>
    </div>
  );
}
