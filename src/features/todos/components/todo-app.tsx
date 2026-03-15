/**
 * Why this file exists:
 * Serves as the feature entry point imported by the Next.js route.
 * Pattern:
 * Thin composition root for the todo feature.
 */
import { TodoProvider } from "@/src/features/todos/context/todo-provider";
import { TodoShell } from "@/src/features/todos/components/todo-shell";

export function TodoApp() {
  return (
    <TodoProvider>
      <TodoShell />
    </TodoProvider>
  );
}
