import { create } from "zustand";
import type { Task, NorthStar } from "@/types/database";

interface AppState {
  northStar: NorthStar | null;
  top3Tasks: Task[];
  setNorthStar: (star: NorthStar | null) => void;
  setTop3Tasks: (tasks: Task[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  northStar: null,
  top3Tasks: [],
  setNorthStar: (northStar) => set({ northStar }),
  setTop3Tasks: (top3Tasks) => set({ top3Tasks }),
}));
