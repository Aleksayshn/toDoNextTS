/**
 * Why this file exists:
 * Implements the repository contract with browser localStorage.
 * Pattern:
 * Infrastructure adapter behind a domain-facing interface.
 */
import type { Todo } from "@/src/domain/todos/entities/todo";
import type { TodoRepository } from "@/src/domain/todos/repositories/todo-repository";
import { seedTodos } from "@/src/infrastructure/todos/seed-todos";

function isTodoArray(value: unknown): value is readonly Todo[] {
  return Array.isArray(value);
}

export class BrowserTodoRepository implements TodoRepository {
  constructor(private readonly storageKey: string) {}

  load(): readonly Todo[] {
    if (typeof window === "undefined") {
      return seedTodos;
    }

    const rawValue = window.localStorage.getItem(this.storageKey);

    if (!rawValue) {
      return seedTodos;
    }

    try {
      const parsed = JSON.parse(rawValue) as unknown;
      return isTodoArray(parsed) ? parsed : seedTodos;
    } catch {
      return seedTodos;
    }
  }

  save(todos: readonly Todo[]): void {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(this.storageKey, JSON.stringify(todos));
  }
}
