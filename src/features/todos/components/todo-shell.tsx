"use client";

/**
 * Why this file exists:
 * Composes the feature UI without holding business logic.
 * Pattern:
 * Container/presenter split where layout is separate from state rules.
 */
import { TodoComposer } from "@/src/features/todos/components/todo-composer";
import { TodoList } from "@/src/features/todos/components/todo-list";
import { TodoStats } from "@/src/features/todos/components/todo-stats";
import { TodoToolbar } from "@/src/features/todos/components/todo-toolbar";

export function TodoShell() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.14),_transparent_30%),linear-gradient(135deg,_#102542_0%,_#182c61_42%,_#f87060_100%)] px-5 py-10 text-slate-50 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.65fr_0.95fr]">
        <section className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-[0_24px_80px_rgba(5,10,23,0.24)] backdrop-blur md:p-8">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.35em] text-white/70">
                React 19 Learning Project
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Advanced Todo List
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-100/80">
                Clean architecture, strict TypeScript, repository-backed state,
                and modern React patterns without turning a simple app into
                framework theater.
              </p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-slate-950/25 px-4 py-3 text-sm text-white/75">
              Domain + application rules stay framework-agnostic.
            </div>
          </div>
          <TodoComposer />
          <TodoToolbar />
          <TodoList />
        </section>
        <TodoStats />
      </div>
    </main>
  );
}
