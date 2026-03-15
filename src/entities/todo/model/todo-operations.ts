import {
  createTodoId,
  type Todo,
  type TodoPriority,
} from "@/src/entities/todo/model/todo";

function now(): string {
  return new Date().toISOString();
}

function normalizeTitle(title: string): string {
  return title.trim().replace(/\s+/g, " ");
}

export function createTodo(title: string, priority: TodoPriority): Todo | null {
  const normalizedTitle = normalizeTitle(title);

  if (!normalizedTitle) {
    return null;
  }

  const timestamp = now();

  return {
    id: createTodoId(),
    title: normalizedTitle,
    status: "active",
    priority,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export function toggleTodo(
  todos: readonly Todo[],
  todoId: Todo["id"],
): readonly Todo[] {
  return todos.map((todo) =>
    todo.id === todoId
      ? {
          ...todo,
          status: todo.status === "active" ? "completed" : "active",
          updatedAt: now(),
        }
      : todo,
  );
}

export function renameTodo(
  todos: readonly Todo[],
  todoId: Todo["id"],
  title: string,
): readonly Todo[] {
  const normalizedTitle = normalizeTitle(title);

  if (!normalizedTitle) {
    return todos;
  }

  return todos.map((todo) =>
    todo.id === todoId
      ? {
          ...todo,
          title: normalizedTitle,
          updatedAt: now(),
        }
      : todo,
  );
}

export function removeTodo(
  todos: readonly Todo[],
  todoId: Todo["id"],
): readonly Todo[] {
  return todos.filter((todo) => todo.id !== todoId);
}

export function clearCompletedTodos(todos: readonly Todo[]): readonly Todo[] {
  return todos.filter((todo) => todo.status !== "completed");
}
