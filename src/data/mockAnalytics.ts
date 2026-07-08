import type { RevenuePoint, StatusSlice } from "@/types/dashboard"
import { mockPayments } from "@/data/mockPayments"
import { createRng, randomInt } from "@/lib/mock-generators"

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

function sumPaidOnDay(date: Date): number {
  const key = date.toDateString()
  return mockPayments
    .filter((p) => p.status === "Paid" && new Date(p.date).toDateString() === key)
    .reduce((sum, p) => sum + p.amount, 0)
}

export function buildDailyRevenue(days: number): RevenuePoint[] {
  const now = new Date()
  const points: RevenuePoint[] = []
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    points.push({
      label: `${date.getDate()} ${MONTH_LABELS[date.getMonth()]}`,
      revenue: sumPaidOnDay(date),
    })
  }
  return points
}

export function buildWeeklyRevenue(weeks: number): RevenuePoint[] {
  const rng = createRng(4471)
  const points: RevenuePoint[] = []
  for (let i = weeks - 1; i >= 0; i--) {
    points.push({
      label: i === 0 ? "This wk" : `Wk -${i}`,
      revenue: randomInt(rng, 32000, 62000),
    })
  }
  return points
}

export function buildMonthlyRevenue(months: number): RevenuePoint[] {
  const rng = createRng(88213)
  const now = new Date()
  const points: RevenuePoint[] = []
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    points.push({
      label: MONTH_LABELS[date.getMonth()],
      revenue: randomInt(rng, 140000, 260000),
    })
  }
  return points
}

export function buildYearlyRevenue(years: number): RevenuePoint[] {
  const rng = createRng(19203)
  const now = new Date()
  const points: RevenuePoint[] = []
  for (let i = years - 1; i >= 0; i--) {
    points.push({
      label: String(now.getFullYear() - i),
      revenue: randomInt(rng, 1400000, 3200000),
    })
  }
  return points
}

export function buildStatusDistribution(): StatusSlice[] {
  const counts: Record<string, number> = { Paid: 0, Pending: 0, Failed: 0 }
  for (const payment of mockPayments) {
    counts[payment.status] += 1
  }
  return Object.entries(counts).map(([status, value]) => ({ status, value }))
}

export const dailyRevenue = buildDailyRevenue(14)
export const weeklyRevenue = buildWeeklyRevenue(8)
export const monthlyRevenue = buildMonthlyRevenue(12)
export const yearlyRevenue = buildYearlyRevenue(5)
export const statusDistribution = buildStatusDistribution()

export { DAY_LABELS }
