/**
 * Why this file exists:
 * Implements predictable state transitions for the feature.
 * Pattern:
 * Reducer architecture with pure update logic and application use cases.
 */
import {
  clearCompletedTodos,
  createTodo,
  removeTodo,
  renameTodo,
  toggleTodo,
} from "@/src/application/todos/use-cases/manage-todos";
import type {
  TodoAction,
  TodoState,
} from "@/src/features/todos/model/todo-state";

export function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case "hydrated":
      return {
        ...state,
        todos: action.todos,
        isHydrated: true,
      };
    case "draft/titleChanged":
      return {
        ...state,
        draftTitle: action.value,
      };
    case "draft/priorityChanged":
      return {
        ...state,
        draftPriority: action.value,
      };
    case "searchChanged":
      return {
        ...state,
        searchTerm: action.value,
      };
    case "filterChanged":
      return {
        ...state,
        filter: action.value,
      };
    case "sortChanged":
      return {
        ...state,
        sort: action.value,
      };
    case "todo/created": {
      const nextTodo = createTodo(state.draftTitle, state.draftPriority);

      if (!nextTodo) {
        return state;
      }

      return {
        ...state,
        todos: [nextTodo, ...state.todos],
        draftTitle: "",
        draftPriority: "medium",
      };
    }
    case "todo/toggled":
      return {
        ...state,
        todos: toggleTodo(state.todos, action.todoId),
      };
    case "todo/renamed":
      return {
        ...state,
        todos: renameTodo(state.todos, action.todoId, action.title),
      };
    case "todo/deleted":
      return {
        ...state,
        todos: removeTodo(state.todos, action.todoId),
      };
    case "todo/completedCleared":
      return {
        ...state,
        todos: clearCompletedTodos(state.todos),
      };
    default:
      return state;
  }
}
