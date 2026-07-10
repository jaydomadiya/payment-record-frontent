import { AlertCircle } from "lucide-react"
import { PageHeader } from "@/components/common/page-header"
import { PaymentsTable } from "@/components/payments/payments-table"
import { PaymentsTableSkeleton } from "@/components/payments/payments-table-skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { usePaymentRecords } from "@/hooks/usePaymentRecords"

export function PaymentHistoryPage() {
  const {
    payments,
    page,
    totalPages,
    totalElements,
    isFirstPage,
    isLastPage,
    isLoading,
    error,
    goToNextPage,
    goToPreviousPage,
  } = usePaymentRecords()

  return (
    <div>
      <PageHeader title="Payment History" description="Review every transaction recorded by the payment gateway" />

      {isLoading ? (
        <PaymentsTableSkeleton />
      ) : error ? (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Failed to load payments</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <PaymentsTable
          payments={payments}
          page={page}
          totalPages={totalPages}
          totalElements={totalElements}
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
          onPreviousPage={goToPreviousPage}
          onNextPage={goToNextPage}
        />
      )}
    </div>
  )
}
