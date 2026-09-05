import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  LayoutGrid,
  CalendarClock,
  UtensilsCrossed,
  Users,
  Gift,
  BarChart3,
  ChefHat,
  Settings,
} from "lucide-react";
import { Logo } from "@/components/layout/Logo";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/dashboard/orders", label: "Orders", icon: ClipboardList },
  { to: "/dashboard/tables", label: "Tables", icon: LayoutGrid },
  { to: "/dashboard/reservations", label: "Reservations", icon: CalendarClock },
  { to: "/dashboard/menu", label: "Menu", icon: UtensilsCrossed },
  { to: "/dashboard/customers", label: "Customers", icon: Users },
  { to: "/dashboard/loyalty", label: "Loyalty", icon: Gift },
  { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
];

export function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-paper-300 bg-paper-50 md:flex">
      <div className="flex h-16 items-center px-5">
        <Logo />
      </div>
      <nav aria-label="Dashboard" className="flex flex-1 flex-col gap-0.5 px-3 py-2">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-2.5 rounded-[var(--radius-sm)] px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive ? "bg-ink-950 text-paper-50" : "text-ink-800 hover:bg-paper-200"
              }`
            }
          >
            <item.icon className="size-4.5" aria-hidden="true" />
            {item.label}
          </NavLink>
        ))}
        <NavLink
          to="/kitchen"
          className="mt-2 flex items-center gap-2.5 rounded-[var(--radius-sm)] border border-paper-300 px-3 py-2.5 text-sm font-medium text-ink-800 hover:bg-paper-200"
        >
          <ChefHat className="size-4.5" aria-hidden="true" />
          Kitchen display
        </NavLink>
      </nav>
      <div className="border-t border-paper-300 px-3 py-3">
        <NavLink
          to="/dashboard/settings"
          className="flex items-center gap-2.5 rounded-[var(--radius-sm)] px-3 py-2.5 text-sm font-medium text-ink-800 hover:bg-paper-200"
        >
          <Settings className="size-4.5" aria-hidden="true" />
          Settings
        </NavLink>
      </div>
    </aside>
  );
}
