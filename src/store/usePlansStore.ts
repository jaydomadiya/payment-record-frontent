import { create } from "zustand"
import type { Plan } from "@/types/plan"
import { initialPlans } from "@/data/mockPlans"

interface PlansState {
  plans: Plan[]
  isLoading: boolean
  updatePlan: (id: string, patch: Partial<Plan>) => void
}

export const usePlansStore = create<PlansState>((set) => {
  setTimeout(() => set({ isLoading: false }), 600)

  return {
    plans: initialPlans,
    isLoading: true,
    updatePlan: (id, patch) =>
      set((state) => ({
        plans: state.plans.map((plan) => (plan.id === id ? { ...plan, ...patch } : plan)),
      })),
  }
})
