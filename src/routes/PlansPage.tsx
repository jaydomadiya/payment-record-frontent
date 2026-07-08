import { PageHeader } from "@/components/common/page-header"
import { PlanCard } from "@/components/plans/plan-card"
import { PlansSkeleton } from "@/components/plans/plans-skeleton"
import { usePlansStore } from "@/store/usePlansStore"

export function PlansPage() {
  const { plans, isLoading } = usePlansStore()

  return (
    <div>
      <PageHeader
        title="Plans Management"
        description="Edit pricing and features — updates apply instantly across the app"
      />
      {isLoading ? (
        <PlansSkeleton />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan, index) => (
            <PlanCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}
