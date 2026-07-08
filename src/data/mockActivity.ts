import type { ActivityItem } from "@/types/dashboard"
import { mockPayments } from "@/data/mockPayments"

export const mockActivity: ActivityItem[] = mockPayments.slice(0, 8).map((payment) => ({
  id: `activity-${payment.id}`,
  title:
    payment.status === "Paid"
      ? "Payment received"
      : payment.status === "Pending"
        ? "Payment pending"
        : "Payment failed",
  description: `${payment.customerName} · ${payment.plan} plan · ${payment.transactionId}`,
  timestamp: payment.date,
}))
