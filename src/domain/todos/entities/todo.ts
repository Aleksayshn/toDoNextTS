/**
 * Why this file exists:
 * Defines the core Todo entity and value types used across the app.
 * Pattern:
 * Domain model with branded identifiers and readonly data for stronger invariants.
 */
export type TodoId = string & { readonly __brand: "TodoId" };

export type TodoStatus = "active" | "completed";
export type TodoPriority = "low" | "medium" | "high";

export interface Todo {
  readonly id: TodoId;
  readonly title: string;
  readonly status: TodoStatus;
  readonly priority: TodoPriority;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export function createTodoId(): TodoId {
  return crypto.randomUUID() as TodoId;
}

export function isTodoCompleted(todo: Todo): boolean {
  return todo.status === "completed";
}
