import { CreditCard, Landmark, Smartphone, Wallet } from "lucide-react"

const METHOD_ICONS: Record<string, typeof Smartphone> = {
  UPI: Smartphone,
  CARD: CreditCard,
  NETBANKING: Landmark,
  WALLET: Wallet,
}

export function PaymentMethodBadge({ method }: { method?: string }) {
  const key = method?.toUpperCase() ?? ""
  const Icon = METHOD_ICONS[key] ?? CreditCard

  return (
    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground">
      <Icon className="size-3.5" />
      {method || "Unknown"}
    </span>
  )
}
