import { CheckCircle2, Clock, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EmptyState } from "@/components/common/empty-state"
import { formatDateTime } from "@/lib/formatters"
import type { ActivityItem } from "@/types/dashboard"
import { cn } from "@/lib/utils"

function iconFor(title: string) {
  if (title.includes("received")) return { Icon: CheckCircle2, color: "text-success bg-success/15" }
  if (title.includes("pending")) return { Icon: Clock, color: "text-warning bg-warning/15" }
  return { Icon: XCircle, color: "text-destructive bg-destructive/10" }
}

export function ActivityTimeline({ activity }: { activity: ActivityItem[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {activity.length === 0 ? (
          <EmptyState title="No recent activity" />
        ) : (
          <ol className="relative space-y-5 pl-1">
            {activity.map((item, index) => {
              const { Icon, color } = iconFor(item.title)
              return (
                <li key={item.id} className="relative flex gap-3">
                  <div className="flex flex-col items-center">
                    <span className={cn("flex size-7 shrink-0 items-center justify-center rounded-full", color)}>
                      <Icon className="size-3.5" />
                    </span>
                    {index < activity.length - 1 && <span className="mt-1 w-px flex-1 bg-border" />}
                  </div>
                  <div className="pb-1">
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{formatDateTime(item.timestamp)}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        )}
      </CardContent>
    </Card>
  )
}
