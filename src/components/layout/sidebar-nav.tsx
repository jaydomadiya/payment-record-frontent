import { NavLink, useNavigate } from "react-router-dom"
import { LayoutDashboard, CreditCard, Package, Settings, LogOut, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/useAuthStore"

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/dashboard/payments", label: "Payments", icon: CreditCard, end: false },
  { to: "/dashboard/plans", label: "Plans", icon: Package, end: false },
  { to: "/dashboard/settings", label: "Settings", icon: Settings, end: false },
]

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)

  function handleLogout() {
    logout()
    onNavigate?.()
    navigate("/login", { replace: true })
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-6 py-6">
        <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-violet-500 text-primary-foreground shadow-lg shadow-primary/25">
          <Wallet className="size-5" />
        </div>
        <span className="text-lg font-semibold tracking-tight">PayAdmin</span>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground",
                isActive &&
                  "bg-primary/10 text-primary shadow-sm hover:bg-primary/10 hover:text-primary",
              )
            }
          >
            <item.icon className="size-4.5 shrink-0" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border p-3">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="size-4.5" />
          Logout
        </Button>
      </div>
    </div>
  )
}
