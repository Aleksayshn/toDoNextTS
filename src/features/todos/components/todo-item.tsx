"use client";

import { useState } from "react";
import type { Todo } from "@/src/domain/todos/entities/todo";
import { useTodoContext } from "@/src/features/todos/hooks/use-todo-context";

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

export function TodoItem({ todo }: { todo: Todo }) {
  const { actions } = useTodoContext();
  const [draftTitle, setDraftTitle] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <article className="grid gap-4 rounded-[1.75rem] border border-white/12 bg-slate-950/22 p-4 transition hover:bg-slate-950/28 md:grid-cols-[auto_1fr_auto] md:items-center">
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
      <div className="min-w-0">
        {isEditing ? (
          <input
            value={draftTitle}
            autoFocus
            onChange={(event) => setDraftTitle(event.target.value)}
            onBlur={() => {
              actions.renameTodo(todo.id, draftTitle);
              setIsEditing(false);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                actions.renameTodo(todo.id, draftTitle);
                setIsEditing(false);
              }

              if (event.key === "Escape") {
                setDraftTitle(todo.title);
                setIsEditing(false);
              }
            }}
            className="w-full rounded-xl border border-white/10 bg-white/8 px-3 py-2 text-white outline-none"
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="w-full text-left"
          >
            <p
              className={`text-base font-medium transition ${
                todo.status === "completed"
                  ? "text-white/45 line-through"
                  : "text-white"
              }`}
            >
              {todo.title}
            </p>
          </button>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/55">
          <span className={`rounded-full px-2.5 py-1 ${priorityStyles[todo.priority]}`}>
            {todo.priority}
          </span>
          <span>Created {formatDate(todo.createdAt)}</span>
          <span>Updated {formatDate(todo.updatedAt)}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => actions.deleteTodo(todo.id)}
        className="justify-self-start rounded-full border border-white/12 px-4 py-2 text-sm text-white/75 transition hover:bg-white/10 md:justify-self-end"
      >
        Delete
      </button>
    </article>
  );
}
