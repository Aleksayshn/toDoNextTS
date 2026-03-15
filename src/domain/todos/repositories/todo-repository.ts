/**
 * Why this file exists:
 * Declares the persistence contract without coupling the domain to localStorage.
 * Pattern:
 * Dependency inversion through a repository interface.
 */
import type { Todo } from "@/src/domain/todos/entities/todo";

export interface TodoRepository {
  load(): readonly Todo[];
  save(todos: readonly Todo[]): void;
}
