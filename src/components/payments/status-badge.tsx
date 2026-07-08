import { CheckCircle2, Clock, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PaymentStatus } from "@/types/payment"

const STATUS_STYLES: Record<PaymentStatus, string> = {
  Paid: "bg-success/15 text-success border-success/30",
  Pending: "bg-warning/15 text-warning-foreground border-warning/40 dark:text-warning",
  Failed: "bg-destructive/10 text-destructive border-destructive/30",
}

const STATUS_ICONS: Record<PaymentStatus, typeof CheckCircle2> = {
  Paid: CheckCircle2,
  Pending: Clock,
  Failed: XCircle,
}

export function StatusBadge({ status }: { status: PaymentStatus }) {
  const Icon = STATUS_ICONS[status]
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        STATUS_STYLES[status],
      )}
    >
      <Icon className="size-3.5" />
      {status}
    </span>
  )
}
