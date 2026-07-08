import { create } from "zustand"
import type { Payment } from "@/types/payment"
import { mockPayments } from "@/data/mockPayments"

interface PaymentsState {
  payments: Payment[]
  isLoading: boolean
}

export const usePaymentsStore = create<PaymentsState>((set) => {
  setTimeout(() => set({ isLoading: false }), 700)

  return {
    payments: mockPayments,
    isLoading: true,
  }
})
