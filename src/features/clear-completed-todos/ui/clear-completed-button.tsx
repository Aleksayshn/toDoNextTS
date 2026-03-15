"use client";

import { useTodoStore } from "@/src/entities/todo";

export function ClearCompletedButton() {
  const { actions } = useTodoStore();

  return (
    <button
      type="button"
      onClick={actions.clearCompleted}
      className="mt-6 w-full rounded-2xl border border-white/12 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10"
    >
      Clear completed tasks
    </button>
  );
}
