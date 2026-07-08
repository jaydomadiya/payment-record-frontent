import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { statusDistribution } from "@/data/mockAnalytics"

const STATUS_COLORS: Record<string, string> = {
  Paid: "var(--color-success)",
  Pending: "var(--color-warning)",
  Failed: "var(--color-destructive)",
}

export function StatusPieChart() {
  const total = statusDistribution.reduce((sum, slice) => sum + slice.value, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusDistribution}
                dataKey="value"
                nameKey="status"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
              >
                {statusDistribution.map((slice) => (
                  <Cell key={slice.status} fill={STATUS_COLORS[slice.status]} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => {
                  const numericValue = Number(value)
                  const percent = total ? Math.round((numericValue / total) * 100) : 0
                  return [`${numericValue} (${percent}%)`, name]
                }}
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: "0.5rem",
                  fontSize: 12,
                }}
              />
              <Legend verticalAlign="bottom" iconType="circle" iconSize={8} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
