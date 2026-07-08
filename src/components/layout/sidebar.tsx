import { SidebarNav } from "@/components/layout/sidebar-nav"

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-border bg-sidebar lg:flex">
      <SidebarNav />
    </aside>
  )
}
