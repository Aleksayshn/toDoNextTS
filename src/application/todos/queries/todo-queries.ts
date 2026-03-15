/**
 * Why this file exists:
 * Holds read-side logic so filtering and metrics stay outside React components.
 * Pattern:
 * Query object style helpers for derived views of state.
 */
import { isTodoCompleted, type Todo } from "@/src/domain/todos/entities/todo";

export type TodoFilter = "all" | "active" | "completed";
export type TodoSort = "newest" | "oldest" | "alphabetical" | "priority";

export interface TodoMetrics {
  readonly total: number;
  readonly active: number;
  readonly completed: number;
  readonly completionRate: number;
}

const priorityRank = {
  high: 0,
  medium: 1,
  low: 2,
} as const satisfies Record<Todo["priority"], number>;

export function getTodoMetrics(todos: readonly Todo[]): TodoMetrics {
  const completed = todos.filter(isTodoCompleted).length;
  const total = todos.length;
  const active = total - completed;

  return {
    total,
    active,
    completed,
    completionRate: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
}

export function getVisibleTodos(params: {
  todos: readonly Todo[];
  filter: TodoFilter;
  sort: TodoSort;
  searchTerm: string;
}): readonly Todo[] {
  const normalizedSearch = params.searchTerm.trim().toLocaleLowerCase();

  return [...params.todos]
    .filter((todo) => {
      if (params.filter === "active") {
        return todo.status === "active";
      }

      if (params.filter === "completed") {
        return todo.status === "completed";
      }

      return true;
    })
    .filter((todo) =>
      normalizedSearch
        ? todo.title.toLocaleLowerCase().includes(normalizedSearch)
        : true,
    )
    .sort((left, right) => {
      switch (params.sort) {
        case "alphabetical":
          return left.title.localeCompare(right.title);
        case "oldest":
          return left.createdAt.localeCompare(right.createdAt);
        case "priority":
          return priorityRank[left.priority] - priorityRank[right.priority];
        case "newest":
        default:
          return right.createdAt.localeCompare(left.createdAt);
      }
    });
}
