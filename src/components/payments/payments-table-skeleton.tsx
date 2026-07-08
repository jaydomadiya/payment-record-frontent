import { Skeleton } from "@/components/ui/skeleton"

export function PaymentsTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Skeleton className="h-10 flex-1 sm:max-w-xs" />
        <Skeleton className="h-10 w-full sm:w-40" />
      </div>
      <div className="space-y-2 rounded-xl border border-border p-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    </div>
  )
}
