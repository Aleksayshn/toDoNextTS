/**
 * Why this file exists:
 * Centralizes UI state types and reducer actions for the feature.
 * Pattern:
 * Discriminated union actions with readonly state.
 */
import type {
  Todo,
  TodoPriority,
} from "@/src/domain/todos/entities/todo";
import type {
  TodoFilter,
  TodoSort,
} from "@/src/application/todos/queries/todo-queries";

export interface TodoState {
  readonly todos: readonly Todo[];
  readonly searchTerm: string;
  readonly filter: TodoFilter;
  readonly sort: TodoSort;
  readonly draftTitle: string;
  readonly draftPriority: TodoPriority;
  readonly isHydrated: boolean;
}

export type TodoAction =
  | { readonly type: "hydrated"; readonly todos: readonly Todo[] }
  | { readonly type: "draft/titleChanged"; readonly value: string }
  | { readonly type: "draft/priorityChanged"; readonly value: TodoPriority }
  | { readonly type: "searchChanged"; readonly value: string }
  | { readonly type: "filterChanged"; readonly value: TodoFilter }
  | { readonly type: "sortChanged"; readonly value: TodoSort }
  | { readonly type: "todo/created" }
  | { readonly type: "todo/toggled"; readonly todoId: Todo["id"] }
  | {
      readonly type: "todo/renamed";
      readonly todoId: Todo["id"];
      readonly title: string;
    }
  | { readonly type: "todo/deleted"; readonly todoId: Todo["id"] }
  | { readonly type: "todo/completedCleared" };

export const initialTodoState: TodoState = {
  todos: [],
  searchTerm: "",
  filter: "all",
  sort: "newest",
  draftTitle: "",
  draftPriority: "medium",
  isHydrated: false,
};
