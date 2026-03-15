## Architecture

This project uses a layered architecture inspired by **Clean Architecture** and **Domain-Driven Design (DDD)**.  
The goal is to keep business rules independent from React, persistence, and UI concerns.

### Why this architecture?

- Keeps **core business logic framework-agnostic**
- Improves **maintainability** as the app grows
- Makes logic easier to **test and refactor**
- Reduces coupling between **UI, state management, and persistence**
- Encourages clear boundaries and predictable data flow

---

## Architecture Overview

The application is split into four main layers:

1. **Domain**
   Contains the core business model and contracts.
2. **Application**
   Contains use cases and query logic.
3. **Infrastructure**
   Contains technical implementations such as browser persistence.
4. **Features / UI**
   Contains React components, state orchestration, and user interaction logic.

```text
UI / Feature Components
        ↓
Feature State / Context
        ↓
Application Use Cases / Queries
        ↓
Domain Models / Contracts
        ↓
Infrastructure Adapters
```

---

## Folder Structure

```text
app/
  globals.css
  layout.tsx
  page.tsx

src/
  application/
    todos/
      queries/
      use-cases/

  domain/
    todos/
      entities/
      repositories/

  features/
    todos/
      components/
      context/
      hooks/
      model/

  infrastructure/
    todos/
```

---

## Main Layers and Responsibilities

### `app/`
Next.js application entry layer.

- Defines the root layout and global styles
- Connects the route entry point to the Todo feature
- Keeps routing concerns separate from feature logic

### `src/domain/`
Core business layer.

- Defines the `Todo` entity and related types
- Declares repository contracts such as `TodoRepository`
- Contains rules that should not depend on React or storage details

### `src/application/`
Application logic layer.

- Implements **use cases** such as create, rename, toggle, and delete todo
- Implements **queries** for filtering, sorting, and metrics
- Orchestrates domain behavior without knowing about UI rendering

### `src/infrastructure/`
Technical implementation layer.

- Implements the repository contract using `localStorage`
- Provides seed data for initial app state
- Adapts browser-specific APIs to the abstractions defined in the domain layer

### `src/features/todos/`
Feature layer for the Todo module.

- `components/`: reusable UI pieces
- `context/`: feature-level state boundary using React Context
- `hooks/`: custom hooks for accessing feature state
- `model/`: reducer, actions, and feature state definitions

---

## Purpose of Each Major Folder

- `app/`  
  Route entry, layout composition, and global styling.

- `src/domain/`  
  Business entities and contracts. The most stable and reusable part of the system.

- `src/application/`  
  Use cases and read models that transform domain data into application behavior.

- `src/infrastructure/`  
  External and technical concerns such as persistence.

- `src/features/`  
  React-facing feature implementation, including UI composition and state management.

---

## Key Features

- Advanced Todo management:
  - create
  - rename
  - toggle completion
  - delete
  - clear completed
- Filtering by status
- Sorting by multiple strategies
- Search support
- Derived metrics and progress overview
- Local persistence through browser storage
- Reducer-driven state updates
- React 19 patterns such as deferred updates and transitions

---

## Data Flow Between Layers

```text
User Action
  → Feature Component
  → Context / Reducer
  → Application Use Case or Query
  → Domain Types / Rules
  → Infrastructure Repository (for persistence)
  → Updated State
  → UI Re-render
```

### Interaction details

- **Components** trigger actions from the feature context
- The **reducer** updates state predictably
- **Use cases** handle write operations
- **Queries** derive filtered lists and metrics
- The **repository adapter** loads and saves todos
- The **domain layer** provides the shared language and contracts used by all other layers

---

## How the Layers Interact

- **Features** depend on **application** logic, not on storage details
- **Application** depends on **domain** models and contracts
- **Infrastructure** implements **domain** contracts
- **Domain** depends on nothing outside itself

This keeps dependency direction inward, which is a core Clean Architecture principle.

---

## Summary

This structure is intentionally designed to make a small project feel production-ready without unnecessary complexity.  
It demonstrates how to separate **business rules**, **technical concerns**, and **UI composition** so the codebase remains clear, scalable, and easier to evolve.