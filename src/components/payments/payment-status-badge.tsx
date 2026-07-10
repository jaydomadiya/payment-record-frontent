import { CheckCircle2, Clock, HelpCircle, RotateCcw, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const STATUS_STYLES: Record<string, string> = {
  SUCCESS: "bg-success/15 text-success border-success/30",
  PENDING: "bg-warning/15 text-warning-foreground border-warning/40 dark:text-warning",
  FAILED: "bg-destructive/10 text-destructive border-destructive/30",
  REFUNDED: "bg-sky-500/10 text-sky-600 border-sky-500/30 dark:text-sky-400",
  CANCELLED: "bg-muted text-muted-foreground border-border",
}

const STATUS_ICONS: Record<string, typeof CheckCircle2> = {
  SUCCESS: CheckCircle2,
  PENDING: Clock,
  FAILED: XCircle,
  REFUNDED: RotateCcw,
  CANCELLED: XCircle,
}

export function PaymentStatusBadge({ status }: { status?: string }) {
  const key = status?.toUpperCase() ?? ""
  const Icon = STATUS_ICONS[key] ?? HelpCircle
  const style = STATUS_STYLES[key] ?? "bg-muted text-muted-foreground border-border"

  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        style,
      )}
    >
      <Icon className="size-3.5" />
      {status || "Unknown"}
    </span>
  )
}
