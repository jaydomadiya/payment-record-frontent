export interface RevenuePoint {
  label: string
  revenue: number
}

export interface StatusSlice {
  status: string
  value: number
}

export interface ActivityItem {
  id: string
  title: string
  description: string
  timestamp: string
}

export interface DashboardStats {
  todayRevenue: number
  weeklyRevenue: number
  monthlyRevenue: number
  totalCustomers: number
  activePlans: number
  growthPercent: number
}
