import { motion } from "framer-motion"
import { Wallet } from "lucide-react"
import { PaymentPreviewCard } from "@/components/payment-settings/payment-preview-card"
import { usePaymentSettingsStore } from "@/store/usePaymentSettingsStore"

export function CustomerPaymentPage() {
  const { settings } = usePaymentSettingsStore()

  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-violet-500/10 p-4">
      <div className="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 -bottom-32 size-96 rounded-full bg-violet-500/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm"
      >
        <div className="mb-4 flex items-center justify-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-violet-500 text-primary-foreground shadow-lg shadow-primary/25">
            <Wallet className="size-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight">PayAdmin</span>
        </div>

        <PaymentPreviewCard settings={settings} className="border-border/60 shadow-2xl shadow-primary/10" />
      </motion.div>
    </div>
  )
}
