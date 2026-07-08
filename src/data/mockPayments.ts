import type { Payment, PaymentStatus } from "@/types/payment"
import { createRng, pick, randomInt } from "@/lib/mock-generators"

const FIRST_NAMES = [
  "Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Krishna",
  "Ishaan", "Rohan", "Ananya", "Diya", "Saanvi", "Aadhya", "Kiara", "Myra",
  "Priya", "Neha", "Riya", "Isha",
]
const LAST_NAMES = [
  "Sharma", "Verma", "Gupta", "Mehta", "Kapoor", "Iyer", "Nair", "Rao",
  "Reddy", "Singh", "Patel", "Chopra", "Malhotra", "Bose", "Menon",
]
const PLAN_NAMES = ["Starter", "Pro", "Enterprise"] as const
const PLAN_AMOUNTS: Record<(typeof PLAN_NAMES)[number], number> = {
  Starter: 199,
  Pro: 499,
  Enterprise: 1499,
}
const STATUS_WEIGHTS: PaymentStatus[] = [
  "Paid", "Paid", "Paid", "Paid", "Paid", "Paid", "Paid",
  "Pending", "Pending",
  "Failed",
]

function makeTransactionId(rng: () => number, index: number): string {
  const rand = randomInt(rng, 100000, 999999)
  return `TXN${String(index).padStart(4, "0")}${rand}`
}

function generatePayments(count: number, days: number): Payment[] {
  const rng = createRng(20260708)
  const now = new Date()
  const payments: Payment[] = []

  for (let i = 0; i < count; i++) {
    const first = pick(rng, FIRST_NAMES)
    const last = pick(rng, LAST_NAMES)
    const plan = pick(rng, PLAN_NAMES)
    const daysAgo = randomInt(rng, 0, days - 1)
    const date = new Date(now)
    date.setDate(date.getDate() - daysAgo)
    date.setHours(randomInt(rng, 8, 21), randomInt(rng, 0, 59), 0, 0)

    const baseAmount = PLAN_AMOUNTS[plan]
    const jitter = randomInt(rng, -20, 40)

    payments.push({
      id: `pay-${i + 1}`,
      transactionId: makeTransactionId(rng, i + 1),
      customerName: `${first} ${last}`,
      customerEmail: `${first.toLowerCase()}.${last.toLowerCase()}@example.com`,
      plan,
      amount: baseAmount + jitter,
      date: date.toISOString(),
      status: pick(rng, STATUS_WEIGHTS),
    })
  }

  return payments.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export const mockPayments: Payment[] = generatePayments(58, 30)
