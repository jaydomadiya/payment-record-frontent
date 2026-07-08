import { create } from "zustand"
import type { ActivityItem, DashboardStats } from "@/types/dashboard"
import { mockStats } from "@/data/mockStats"
import { mockActivity } from "@/data/mockActivity"

interface DashboardState {
  stats: DashboardStats
  activity: ActivityItem[]
  isLoading: boolean
}

export const useDashboardStore = create<DashboardState>((set) => {
  setTimeout(() => set({ isLoading: false }), 800)

  return {
    stats: mockStats,
    activity: mockActivity,
    isLoading: true,
  }
})
