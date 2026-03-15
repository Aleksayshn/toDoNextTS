"use client";

import { ClearCompletedButton } from "@/src/features/clear-completed-todos";
import { getTodoMetrics, useTodoStore } from "@/src/entities/todo";

function MetricCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent: string;
}) {
  return (
    <article className="rounded-[1.75rem] border border-slate-900/8 bg-white p-5 text-slate-950 shadow-[0_20px_60px_rgba(9,14,28,0.14)]">
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`mt-3 text-4xl font-semibold ${accent}`}>{value}</p>
    </article>
  );
}

export function TodoStats() {
  const { state } = useTodoStore();
  const metrics = getTodoMetrics(state.todos);

  return (
    <aside className="space-y-4">
      <section className="rounded-[2rem] border border-slate-900/8 bg-[#fff7e8] p-6 text-slate-950 shadow-[0_20px_60px_rgba(8,13,28,0.14)]">
        <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
          Progress
        </p>
        <h2 className="mt-3 text-3xl font-semibold">Execution dashboard</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Entity queries derive metrics from immutable state so widgets stay focused
          on composition.
        </p>
        <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-[#f87060] transition-[width] duration-300"
            style={{ width: `${metrics.completionRate}%` }}
          />
        </div>
        <p className="mt-3 text-sm text-slate-500">
          {metrics.completionRate}% completed
        </p>
      </section>
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
        <MetricCard label="Total todos" value={metrics.total} accent="text-slate-950" />
        <MetricCard label="Active work" value={metrics.active} accent="text-[#182c61]" />
        <MetricCard label="Completed" value={metrics.completed} accent="text-[#f87060]" />
      </div>
      <section className="rounded-[2rem] border border-white/15 bg-slate-950/30 p-6 text-white backdrop-blur">
        <h3 className="text-lg font-medium">Patterns demonstrated</h3>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-white/70">
          <li>Public API boundaries between slices</li>
          <li>Entity-owned model and persistence adapter</li>
          <li>Features scoped to single user intentions</li>
          <li>Widgets assembling independent slices</li>
        </ul>
        <ClearCompletedButton />
      </section>
    </aside>
  );
}
