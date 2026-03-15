"use client";

import { DeleteTodoButton } from "@/src/features/delete-todo";
import { EditableTodoTitle } from "@/src/features/edit-todo";
import { ToggleTodoButton } from "@/src/features/toggle-todo";
import type { Todo } from "@/src/entities/todo";

const priorityStyles = {
  high: "bg-rose-400/18 text-rose-100 ring-1 ring-rose-200/20",
  medium: "bg-amber-300/18 text-amber-100 ring-1 ring-amber-200/20",
  low: "bg-emerald-300/18 text-emerald-100 ring-1 ring-emerald-200/20",
} as const satisfies Record<Todo["priority"], string>;

function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(isoDate));
}

export function TodoCard({ todo }: { todo: Todo }) {
  return (
    <article className="grid gap-4 rounded-[1.75rem] border border-white/12 bg-slate-950/22 p-4 transition hover:bg-slate-950/28 md:grid-cols-[auto_1fr_auto] md:items-center">
      <ToggleTodoButton todo={todo} />
      <div className="min-w-0">
        <EditableTodoTitle todo={todo} />
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/55">
          <span className={`rounded-full px-2.5 py-1 ${priorityStyles[todo.priority]}`}>
            {todo.priority}
          </span>
          <span>Created {formatDate(todo.createdAt)}</span>
          <span>Updated {formatDate(todo.updatedAt)}</span>
        </div>
      </div>
      <DeleteTodoButton todoId={todo.id} />
    </article>
  );
}
