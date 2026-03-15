import type { Todo } from "@/src/entities/todo/model/todo";

export interface TodoRepository {
  load(): readonly Todo[];
  save(todos: readonly Todo[]): void;
}
