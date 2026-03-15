"use client";

import type { PropsWithChildren } from "react";
import { TodoStoreProvider } from "@/src/entities/todo";

export function AppProvider({ children }: PropsWithChildren) {
  return <TodoStoreProvider>{children}</TodoStoreProvider>;
}
