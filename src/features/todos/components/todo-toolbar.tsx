"use client";

import { useTransition } from "react";
import type {
  TodoFilter,
  TodoSort,
} from "@/src/application/todos/queries/todo-queries";
import { useTodoContext } from "@/src/features/todos/hooks/use-todo-context";

const filters: readonly TodoFilter[] = ["all", "active", "completed"];
const sorts: readonly TodoSort[] = [
  "newest",
  "oldest",
  "alphabetical",
  "priority",
];

export function TodoToolbar() {
  const { state, actions } = useTodoContext();
  const [isPending, startTransition] = useTransition();

  return (
    <section className="my-6 grid gap-3 rounded-[1.75rem] border border-white/12 bg-white/7 p-5 lg:grid-cols-[1fr_auto_auto]">
      <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/20 px-4">
        <span className="text-sm text-white/60">Search</span>
        <input
          value={state.searchTerm}
          onChange={(event) => {
            const nextValue = event.target.value;
            startTransition(() => {
              actions.changeSearch(nextValue);
            });
          }}
          placeholder="Find by title"
          className="h-12 w-full bg-transparent text-white outline-none placeholder:text-white/30"
        />
      </label>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const isActive = state.filter === filter;

          return (
            <button
              key={filter}
              type="button"
              onClick={() => {
                startTransition(() => {
                  actions.changeFilter(filter);
                });
              }}
              className={`rounded-full px-4 py-2 text-sm capitalize transition ${
                isActive
                  ? "bg-white text-slate-950"
                  : "border border-white/12 bg-white/8 text-white/75 hover:bg-white/15"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-3">
        <select
          value={state.sort}
          onChange={(event) => actions.changeSort(event.target.value as TodoSort)}
          className="h-11 min-w-40 rounded-2xl border border-white/10 bg-slate-950/35 px-4 text-sm text-white outline-none"
        >
          {sorts.map((sort) => (
            <option key={sort} value={sort} className="bg-slate-900">
              {sort}
            </option>
          ))}
        </select>
        <div className="text-xs text-white/45">
          {isPending ? "Updating view..." : "Stable UI"}
        </div>
      </div>
    </section>
  );
}
