import type { LucideIcon } from "lucide-react"
import { TrendingDown, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { AnimatedCounter } from "@/components/dashboard/animated-counter"

export function StatCard({
  title,
  value,
  formatter,
  icon: Icon,
  gradient,
  trendPercent,
  index = 0,
}: {
  title: string
  value: number
  formatter?: (value: number) => string
  icon: LucideIcon
  gradient: string
  trendPercent?: number
  index?: number
}) {
  const isPositive = (trendPercent ?? 0) >= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -3 }}
      className={cn(
        "relative overflow-hidden rounded-xl p-5 text-white shadow-lg transition-shadow hover:shadow-xl",
        gradient,
      )}
    >
      <div className="pointer-events-none absolute -top-8 -right-8 size-28 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-10 -left-6 size-24 rounded-full bg-white/5" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-white/80">{title}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight">
            <AnimatedCounter value={value} formatter={formatter} />
          </p>
        </div>
        <div className="flex size-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
          <Icon className="size-5" />
        </div>
      </div>

      {trendPercent !== undefined && (
        <div className="relative mt-3 flex items-center gap-1 text-xs font-medium text-white/90">
          {isPositive ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
          <span>{Math.abs(trendPercent)}% vs last period</span>
        </div>
      )}
    </motion.div>
  )
}
