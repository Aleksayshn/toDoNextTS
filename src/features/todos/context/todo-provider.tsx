"use client";

/**
 * Why this file exists:
 * Owns feature state, persistence wiring, and public actions for the UI tree.
 * Pattern:
 * Context boundary that hides reducer/repository details and prevents prop drilling.
 */
import {
  createContext,
  useEffect,
  useEffectEvent,
  useMemo,
  useReducer,
} from "react";
import type { Dispatch, PropsWithChildren } from "react";
import type { Todo, TodoPriority } from "@/src/domain/todos/entities/todo";
import type {
  TodoFilter,
  TodoSort,
} from "@/src/application/todos/queries/todo-queries";
import { BrowserTodoRepository } from "@/src/infrastructure/todos/browser-todo-repository";
import { seedTodos } from "@/src/infrastructure/todos/seed-todos";
import { todoReducer } from "@/src/features/todos/model/todo-reducer";
import {
  initialTodoState,
  type TodoAction,
  type TodoState,
} from "@/src/features/todos/model/todo-state";

const STORAGE_KEY = "advanced-todo-list";

export interface TodoActions {
  readonly changeDraftTitle: (value: string) => void;
  readonly changeDraftPriority: (value: TodoPriority) => void;
  readonly createTodo: () => void;
  readonly toggleTodo: (todoId: Todo["id"]) => void;
  readonly renameTodo: (todoId: Todo["id"], title: string) => void;
  readonly deleteTodo: (todoId: Todo["id"]) => void;
  readonly clearCompleted: () => void;
  readonly changeFilter: (value: TodoFilter) => void;
  readonly changeSearch: (value: string) => void;
  readonly changeSort: (value: TodoSort) => void;
}

export interface TodoContextValue {
  readonly state: TodoState;
  readonly actions: TodoActions;
}

const TodoContext = createContext<TodoContextValue | null>(null);

function createTodoActions(dispatch: Dispatch<TodoAction>): TodoActions {
  return {
    changeDraftTitle(value) {
      dispatch({ type: "draft/titleChanged", value });
    },
    changeDraftPriority(value) {
      dispatch({ type: "draft/priorityChanged", value });
    },
    createTodo() {
      dispatch({ type: "todo/created" });
    },
    toggleTodo(todoId) {
      dispatch({ type: "todo/toggled", todoId });
    },
    renameTodo(todoId, title) {
      dispatch({ type: "todo/renamed", todoId, title });
    },
    deleteTodo(todoId) {
      dispatch({ type: "todo/deleted", todoId });
    },
    clearCompleted() {
      dispatch({ type: "todo/completedCleared" });
    },
    changeFilter(value) {
      dispatch({ type: "filterChanged", value });
    },
    changeSearch(value) {
      dispatch({ type: "searchChanged", value });
    },
    changeSort(value) {
      dispatch({ type: "sortChanged", value });
    },
  };
}

export function TodoProvider({ children }: PropsWithChildren) {
  const repository = useMemo(() => new BrowserTodoRepository(STORAGE_KEY), []);
  const [state, dispatch] = useReducer(todoReducer, {
    ...initialTodoState,
    todos: seedTodos,
  });

  const handleExternalStorageChange = useEffectEvent((event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) {
      return;
    }

    dispatch({ type: "hydrated", todos: repository.load() });
  });

  useEffect(() => {
    dispatch({ type: "hydrated", todos: repository.load() });
  }, [repository]);

  useEffect(() => {
    if (!state.isHydrated) {
      return;
    }

    repository.save(state.todos);
  }, [repository, state.isHydrated, state.todos]);

  useEffect(() => {
    window.addEventListener("storage", handleExternalStorageChange);

    return () => {
      window.removeEventListener("storage", handleExternalStorageChange);
    };
  }, []);

  const actions = useMemo(() => createTodoActions(dispatch), [dispatch]);
  const value = useMemo(() => ({ state, actions }), [actions, state]);

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export { TodoContext };
