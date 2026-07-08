import { Link } from "react-router-dom"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { StatusBadge } from "@/components/payments/status-badge"
import { EmptyState } from "@/components/common/empty-state"
import { formatCurrency, formatDate } from "@/lib/formatters"
import type { Payment } from "@/types/payment"

export function RecentPaymentsTable({ payments }: { payments: Payment[] }) {
  const recent = payments.slice(0, 6)

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Recent Payments</CardTitle>
        <CardAction>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/dashboard/payments">View all</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {recent.length === 0 ? (
          <EmptyState title="No payments yet" description="Payments will show up here once received." />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recent.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.customerName}</TableCell>
                    <TableCell className="text-muted-foreground">{payment.plan}</TableCell>
                    <TableCell>{formatCurrency(payment.amount)}</TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(payment.date)}</TableCell>
                    <TableCell>
                      <StatusBadge status={payment.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
