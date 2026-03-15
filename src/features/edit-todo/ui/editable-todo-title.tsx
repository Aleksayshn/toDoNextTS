"use client";

import { useState } from "react";
import { useTodoStore, type Todo } from "@/src/entities/todo";

export function EditableTodoTitle({ todo }: { todo: Todo }) {
  const { actions } = useTodoStore();
  const [draftTitle, setDraftTitle] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
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
    );
  }

  return (
    <button type="button" onClick={() => setIsEditing(true)} className="w-full text-left">
      <p
        className={`text-base font-medium transition ${
          todo.status === "completed" ? "text-white/45 line-through" : "text-white"
        }`}
      >
        {todo.title}
      </p>
    </button>
  );
}
