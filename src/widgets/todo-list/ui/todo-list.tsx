"use client";

import { useDeferredValue } from "react";
import { getVisibleTodos, useTodoStore } from "@/src/entities/todo";
import { TodoCard } from "@/src/widgets/todo-list/ui/todo-card";

export function TodoList() {
  const { state } = useTodoStore();
  const deferredSearchTerm = useDeferredValue(state.searchTerm);
  const visibleTodos = getVisibleTodos({
    todos: state.todos,
    filter: state.filter,
    sort: state.sort,
    searchTerm: deferredSearchTerm,
  });

  if (visibleTodos.length === 0) {
    return (
      <section className="rounded-[1.75rem] border border-dashed border-white/18 bg-slate-950/15 p-8 text-center">
        <h3 className="text-lg font-medium text-white">Nothing matches this view</h3>
        <p className="mt-2 text-sm leading-6 text-white/60">
          Try changing the filter or create a new task to see the slice state update
          the list.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-3">
      {visibleTodos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </section>
  );
}
