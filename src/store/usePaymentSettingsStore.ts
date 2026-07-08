import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { PaymentSettings } from "@/types/paymentSettings"
import { initialPaymentSettings } from "@/data/mockPaymentSettings"

interface PaymentSettingsState {
  settings: PaymentSettings
  isLoading: boolean
  updateSettings: (patch: Partial<PaymentSettings>) => void
}

export const usePaymentSettingsStore = create<PaymentSettingsState>()(
  persist(
    (set) => {
      setTimeout(() => set({ isLoading: false }), 500)

      return {
        settings: initialPaymentSettings,
        isLoading: true,
        updateSettings: (patch) =>
          set((state) => ({ settings: { ...state.settings, ...patch } })),
      }
    },
    {
      name: "payment-settings",
      partialize: (state) => ({ settings: state.settings }),
    },
  ),
)
