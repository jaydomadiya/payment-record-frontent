export type PaymentStatus = "Paid" | "Pending" | "Failed"

export interface Payment {
  id: string
  transactionId: string
  customerName: string
  customerEmail: string
  plan: string
  amount: number
  date: string
  status: PaymentStatus
}
