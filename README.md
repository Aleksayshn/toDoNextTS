## Architecture

This project uses **Feature-Sliced Design (FSD)** for a modern Next.js 16, React 19, and TypeScript application.
The codebase is organized around business boundaries, slice public APIs, and strict import direction instead of mixing state, UI, and infrastructure inside one feature folder.

## FSD principles used

### Layers

The project follows the standard top-down FSD layering model:

1. `app`
   Application-wide providers and startup composition.
2. `pages`
   Route-level screens.
3. `widgets`
   Large UI blocks composed from features and entities.
4. `features`
   User actions and scenarios.
5. `entities`
   Stable business data and behavior.
6. `shared`
   Cross-cutting reusable code.

### Slices

Each layer is divided into slices with a single responsibility:

- `pages/home-page`
- `widgets/todo-shell`
- `widgets/todo-list`
- `widgets/todo-stats`
- `features/create-todo`
- `features/change-todo-view`
- `features/edit-todo`
- `features/toggle-todo`
- `features/delete-todo`
- `features/clear-completed-todos`
- `entities/todo`

### Public API

Each slice exposes an `index.ts` public API. Consumers import from the slice root rather than reaching into internal folders:

```ts
import { HomePage } from "@/src/pages/home-page";
import { TodoShell } from "@/src/widgets/todo-shell";
import { useTodoStore } from "@/src/entities/todo";
```

This keeps internal refactors local to a slice and reduces accidental coupling.

### Import direction rules

Dependencies always point downward:

```text
app -> pages -> widgets -> features -> entities -> shared
```

Applied in this project:

- `app/page.tsx` imports `src/app/providers` and `src/pages/home-page`
- `pages/home-page` imports `widgets/todo-shell`
- `widgets/todo-list` imports feature actions and the todo entity
- `features/*` import only `entities/todo`
- `entities/todo` does not import from upper layers

That rule is the main scalability mechanism in FSD.

## Folder structure

```text
app/
  globals.css
  layout.tsx
  page.tsx

src/
  app/
    providers/

  pages/
    home-page/

  widgets/
    todo-list/
    todo-shell/
    todo-stats/

  features/
    change-todo-view/
    clear-completed-todos/
    create-todo/
    delete-todo/
    edit-todo/
    toggle-todo/

  entities/
    todo/
      api/
      lib/
      model/
```

## Responsibility split

### `entities/todo`

Owns the stable business model:

- todo types and helpers
- pure operations for create, rename, toggle, delete, clear
- read-side queries for filtering and metrics
- repository contract and browser adapter
- entity-level store provider and hook

### `features/*`

Each feature models one user intention:

- `create-todo`: create form
- `change-todo-view`: search, filter, sort
- `edit-todo`: inline title editing
- `toggle-todo`: completion toggle
- `delete-todo`: delete action
- `clear-completed-todos`: bulk cleanup

### `widgets/*`

Widgets compose the UI:

- `todo-shell`: main page shell
- `todo-list`: list rendering and card composition
- `todo-stats`: metrics and supporting controls

### `src/app` and root `app/`

- root `app/` remains the Next.js routing layer
- `src/app/providers` contains app-level composition such as store providers

## Why this structure is cleaner

- Layers express architectural intent directly.
- Slices are easier to grow without turning into god-modules.
- Public APIs make internal reorganization safe.
- Import direction is easy to reason about and enforce.
- The todo entity remains the stable center of the app while features and widgets stay replaceable.
