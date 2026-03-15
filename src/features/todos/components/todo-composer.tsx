"use client";

import { useTodoContext } from "@/src/features/todos/hooks/use-todo-context";

const priorities = [
  { value: "high", label: "High impact" },
  { value: "medium", label: "Balanced" },
  { value: "low", label: "Low pressure" },
] as const;

export function TodoComposer() {
  const { state, actions } = useTodoContext();

  return (
    <section className="rounded-[1.75rem] border border-white/12 bg-slate-950/25 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium text-white">Create a task</h2>
        <span className="text-sm text-white/55">Pure reducer-driven writes</span>
      </div>
      <div className="grid gap-3 md:grid-cols-[1fr_190px_120px]">
        <input
          value={state.draftTitle}
          onChange={(event) => actions.changeDraftTitle(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              actions.createTodo();
            }
          }}
          placeholder="Ship a local-first React 19 todo app"
          className="h-12 rounded-2xl border border-white/10 bg-white/8 px-4 text-base text-white outline-none transition focus:border-white/35 focus:bg-white/12"
        />
        <select
          value={state.draftPriority}
          onChange={(event) =>
            actions.changeDraftPriority(
              event.target.value as (typeof priorities)[number]["value"],
            )
          }
          className="h-12 rounded-2xl border border-white/10 bg-slate-950/35 px-4 text-base text-white outline-none transition focus:border-white/35"
        >
          {priorities.map((priority) => (
            <option
              key={priority.value}
              value={priority.value}
              className="bg-slate-900"
            >
              {priority.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={actions.createTodo}
          className="h-12 rounded-2xl bg-[#ffcf56] px-5 text-sm font-semibold text-slate-950 transition hover:bg-[#ffd97b]"
        >
          Add todo
        </button>
      </div>
    </section>
  );
}
