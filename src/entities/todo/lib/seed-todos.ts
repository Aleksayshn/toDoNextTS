import type { Todo } from "@/src/entities/todo/model/todo";

const baseDate = "2026-03-11T08:00:00.000Z";

export const seedTodos: readonly Todo[] = [
  {
    id: "seed-1" as Todo["id"],
    title: "Model todo rules as pure functions",
    status: "completed",
    priority: "high",
    createdAt: baseDate,
    updatedAt: "2026-03-11T09:15:00.000Z",
  },
  {
    id: "seed-2" as Todo["id"],
    title: "Expose slices through public API boundaries",
    status: "active",
    priority: "high",
    createdAt: "2026-03-11T10:00:00.000Z",
    updatedAt: "2026-03-11T10:00:00.000Z",
  },
  {
    id: "seed-3" as Todo["id"],
    title: "Use deferred search for responsive filtering",
    status: "active",
    priority: "medium",
    createdAt: "2026-03-11T11:30:00.000Z",
    updatedAt: "2026-03-11T11:30:00.000Z",
  },
];
