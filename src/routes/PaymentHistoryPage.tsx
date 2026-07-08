import { PageHeader } from "@/components/common/page-header"
import { PaymentsTable } from "@/components/payments/payments-table"
import { PaymentsTableSkeleton } from "@/components/payments/payments-table-skeleton"
import { usePaymentsStore } from "@/store/usePaymentsStore"

export function PaymentHistoryPage() {
  const { payments, isLoading } = usePaymentsStore()

  return (
    <div>
      <PageHeader title="Payment History" description="Search, filter, and review every transaction" />
      {isLoading ? <PaymentsTableSkeleton /> : <PaymentsTable payments={payments} />}
    </div>
  )
}
