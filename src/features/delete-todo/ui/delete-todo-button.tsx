"use client";

import { useTodoStore, type Todo } from "@/src/entities/todo";

export function DeleteTodoButton({ todoId }: { todoId: Todo["id"] }) {
  const { actions } = useTodoStore();

  return (
    <button
      type="button"
      onClick={() => actions.deleteTodo(todoId)}
      className="justify-self-start rounded-full border border-white/12 px-4 py-2 text-sm text-white/75 transition hover:bg-white/10 md:justify-self-end"
    >
      Delete
    </button>
  );
}
