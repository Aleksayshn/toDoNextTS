/**
 * Why this file exists:
 * Exposes safe accessors for the feature context.
 * Pattern:
 * Custom hook facade over React Context.
 */
import { useContext } from "react";
import { TodoContext } from "@/src/features/todos/context/todo-provider";

export function useTodoContext() {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("useTodoContext must be used within TodoProvider");
  }

  return context;
}
