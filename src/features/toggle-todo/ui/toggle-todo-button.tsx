"use client";

import { useTodoStore, type Todo } from "@/src/entities/todo";

export function ToggleTodoButton({ todo }: { todo: Todo }) {
  const { actions } = useTodoStore();

  return (
    <button
      type="button"
      onClick={() => actions.toggleTodo(todo.id)}
      aria-label={
        todo.status === "completed" ? "Mark as active" : "Mark as completed"
      }
      className={`mt-1 h-6 w-6 rounded-full border transition ${
        todo.status === "completed"
          ? "border-emerald-300 bg-emerald-300 shadow-[0_0_0_4px_rgba(74,222,128,0.18)]"
          : "border-white/35 bg-transparent"
      }`}
    />
  );
}
