import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EmptyState } from "@/components/common/empty-state"
import { PaymentStatusBadge } from "@/components/payments/payment-status-badge"
import { PaymentMethodBadge } from "@/components/payments/payment-method-badge"
import { formatCurrencyValue, formatDateTime } from "@/lib/formatters"
import type { PaymentRecord } from "@/types/paymentRecord"

interface PaymentsTableProps {
  payments: PaymentRecord[]
  page: number
  totalPages: number
  totalElements: number
  isFirstPage: boolean
  isLastPage: boolean
  onPreviousPage: () => void
  onNextPage: () => void
}

export function PaymentsTable({
  payments,
  page,
  totalPages,
  totalElements,
  isFirstPage,
  isLastPage,
  onPreviousPage,
  onNextPage,
}: PaymentsTableProps) {
  if (payments.length === 0) {
    return (
      <EmptyState
        title="No Payments Found"
        description="There are no payment records to display yet."
      />
    )
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">Payment ID</TableHead>
              <TableHead className="whitespace-nowrap">Customer</TableHead>
              <TableHead className="whitespace-nowrap">Event / Plan</TableHead>
              <TableHead className="whitespace-nowrap">Method</TableHead>
              <TableHead className="whitespace-nowrap">Amount</TableHead>
              <TableHead className="whitespace-nowrap">Status</TableHead>
              <TableHead className="whitespace-nowrap">Date & Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="whitespace-nowrap font-mono text-xs text-muted-foreground">
                  {payment.paymentId || "—"}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <div className="font-medium">{payment.userName || "—"}</div>
                  <div className="text-xs text-muted-foreground">
                    {payment.mobileNumber || payment.email || "—"}
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap text-muted-foreground">
                  {payment.eventName || payment.eventId || "—"}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <PaymentMethodBadge method={payment.paymentMethod} />
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {formatCurrencyValue(payment.amount, payment.currency)}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <PaymentStatusBadge status={payment.paymentStatus} />
                </TableCell>
                <TableCell className="whitespace-nowrap text-muted-foreground">
                  {payment.createdAt ? formatDateTime(payment.createdAt) : "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          Page {page + 1} of {totalPages || 1} · {totalElements} total records
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onPreviousPage} disabled={isFirstPage}>
            <ChevronLeft className="size-4" />
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={onNextPage} disabled={isLastPage}>
            Next
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
