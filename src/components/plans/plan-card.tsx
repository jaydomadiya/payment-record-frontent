import { Check, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EditPlanDialog } from "@/components/plans/edit-plan-dialog"
import { formatCurrency } from "@/lib/formatters"
import type { Plan } from "@/types/plan"

export function PlanCard({ plan, index = 0 }: { plan: Plan; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -4 }}
    >
      <Card
        className={cn(
          "relative h-full overflow-hidden transition-shadow hover:shadow-xl",
          plan.popular && "border-primary shadow-lg shadow-primary/10",
          !plan.active && "opacity-60",
        )}
      >
        {plan.popular && (
          <div className="absolute top-0 right-0">
            <div className="flex items-center gap-1 rounded-bl-xl bg-gradient-to-r from-primary to-violet-500 px-3 py-1.5 text-xs font-medium text-primary-foreground">
              <Sparkles className="size-3.5" />
              Popular
            </div>
          </div>
        )}

        <CardHeader>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            {!plan.active && <Badge variant="secondary">Inactive</Badge>}
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold tracking-tight">{formatCurrency(plan.price)}</span>
            <span className="text-sm text-muted-foreground">/{plan.billingPeriod}</span>
          </div>
          <p className="text-sm text-muted-foreground">{plan.description}</p>
        </CardHeader>

        <CardContent>
          <ul className="space-y-2.5">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm">
                <span className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="size-3" />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button
            className={cn(
              "w-full",
              plan.popular ? "bg-gradient-to-r from-primary to-violet-500" : "",
            )}
            variant={plan.popular ? "default" : "secondary"}
            disabled
          >
            {plan.buttonText}
          </Button>
          <EditPlanDialog plan={plan} />
        </CardFooter>
      </Card>
    </motion.div>
  )
}
