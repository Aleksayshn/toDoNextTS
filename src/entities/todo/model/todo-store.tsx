"use client";

import {
  createContext,
  useContext,
  useEffect,
  useEffectEvent,
  useMemo,
  useReducer,
} from "react";
import type { Dispatch, PropsWithChildren } from "react";
import { BrowserTodoRepository } from "@/src/entities/todo/api/browser-todo-repository";
import { seedTodos } from "@/src/entities/todo/lib/seed-todos";
import {
  clearCompletedTodos,
  createTodo,
  removeTodo,
  renameTodo,
  toggleTodo,
} from "@/src/entities/todo/model/todo-operations";
import type { TodoFilter, TodoSort } from "@/src/entities/todo/model/todo-queries";
import type { Todo, TodoPriority } from "@/src/entities/todo/model/todo";

const STORAGE_KEY = "advanced-todo-list";

export interface TodoState {
  readonly todos: readonly Todo[];
  readonly searchTerm: string;
  readonly filter: TodoFilter;
  readonly sort: TodoSort;
  readonly draftTitle: string;
  readonly draftPriority: TodoPriority;
  readonly isHydrated: boolean;
}

type TodoAction =
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

export interface TodoStoreActions {
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

interface TodoStoreValue {
  readonly state: TodoState;
  readonly actions: TodoStoreActions;
}

const initialTodoState: TodoState = {
  todos: [],
  searchTerm: "",
  filter: "all",
  sort: "newest",
  draftTitle: "",
  draftPriority: "medium",
  isHydrated: false,
};

const TodoStoreContext = createContext<TodoStoreValue | null>(null);

function todoReducer(state: TodoState, action: TodoAction): TodoState {
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

function createTodoStoreActions(dispatch: Dispatch<TodoAction>): TodoStoreActions {
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

export function TodoStoreProvider({ children }: PropsWithChildren) {
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

  const actions = useMemo(() => createTodoStoreActions(dispatch), [dispatch]);
  const value = useMemo(() => ({ state, actions }), [actions, state]);

  return (
    <TodoStoreContext.Provider value={value}>
      {children}
    </TodoStoreContext.Provider>
  );
}

export function useTodoStore() {
  const context = useContext(TodoStoreContext);

  if (!context) {
    throw new Error("useTodoStore must be used within TodoStoreProvider");
  }

  return context;
}
