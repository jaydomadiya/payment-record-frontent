import { Download, IndianRupee, TrendingUp, Users, Wallet, Layers } from "lucide-react"
import { toast } from "sonner"
import { PageHeader } from "@/components/common/page-header"
import { Button } from "@/components/ui/button"
import { StatCard } from "@/components/dashboard/stat-card"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { StatusPieChart } from "@/components/dashboard/status-pie-chart"
import { RecentPaymentsTable } from "@/components/dashboard/recent-payments-table"
import { ActivityTimeline } from "@/components/dashboard/activity-timeline"
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton"
import { useDashboardStore } from "@/store/useDashboardStore"
import { usePaymentsStore } from "@/store/usePaymentsStore"
import { formatCurrency, formatNumber } from "@/lib/formatters"

export function DashboardOverviewPage() {
  const { stats, activity, isLoading: statsLoading } = useDashboardStore()
  const { payments, isLoading: paymentsLoading } = usePaymentsStore()

  if (statsLoading || paymentsLoading) {
    return (
      <div>
        <PageHeader title="Dashboard" description="Overview of your payments and plans" />
        <DashboardSkeleton />
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview of your payments and plans"
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success("Export started (demo)")}
          >
            <Download />
            Export
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          index={0}
          title="Today's Revenue"
          value={stats.todayRevenue}
          formatter={formatCurrency}
          icon={IndianRupee}
          gradient="bg-gradient-to-br from-violet-600 to-indigo-600"
        />
        <StatCard
          index={1}
          title="Weekly Revenue"
          value={stats.weeklyRevenue}
          formatter={formatCurrency}
          icon={Wallet}
          gradient="bg-gradient-to-br from-sky-500 to-blue-600"
        />
        <StatCard
          index={2}
          title="Monthly Revenue"
          value={stats.monthlyRevenue}
          formatter={formatCurrency}
          icon={IndianRupee}
          gradient="bg-gradient-to-br from-emerald-500 to-teal-600"
        />
        <StatCard
          index={3}
          title="Total Customers"
          value={stats.totalCustomers}
          formatter={formatNumber}
          icon={Users}
          gradient="bg-gradient-to-br from-orange-500 to-amber-600"
        />
        <StatCard
          index={4}
          title="Active Plans"
          value={stats.activePlans}
          icon={Layers}
          gradient="bg-gradient-to-br from-fuchsia-500 to-pink-600"
        />
        <StatCard
          index={5}
          title="Growth"
          value={stats.growthPercent}
          formatter={(v) => `+${v}%`}
          icon={TrendingUp}
          gradient="bg-gradient-to-br from-rose-500 to-red-600"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <StatusPieChart />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentPaymentsTable payments={payments} />
        </div>
        <ActivityTimeline activity={activity} />
      </div>
    </div>
  )
}
