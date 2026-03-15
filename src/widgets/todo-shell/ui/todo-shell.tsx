"use client";

import { CreateTodoForm } from "@/src/features/create-todo";
import { TodoViewToolbar } from "@/src/features/change-todo-view";
import { TodoList } from "@/src/widgets/todo-list";
import { TodoStats } from "@/src/widgets/todo-stats";

export function TodoShell() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.14),_transparent_30%),linear-gradient(135deg,_#102542_0%,_#182c61_42%,_#f87060_100%)] px-5 py-10 text-slate-50 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.65fr_0.95fr]">
        <section className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-[0_24px_80px_rgba(5,10,23,0.24)] backdrop-blur md:p-8">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.35em] text-white/70">
                Next.js 16 + React 19
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Feature-Sliced Todo List
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-100/80">
                A small app structured like a larger product: pages compose widgets,
                widgets compose features, and entities keep business data stable.
              </p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-slate-950/25 px-4 py-3 text-sm text-white/75">
              Import direction stays top-down across FSD layers.
            </div>
          </div>
          <CreateTodoForm />
          <TodoViewToolbar />
          <TodoList />
        </section>
        <TodoStats />
      </div>
    </main>
  );
}
