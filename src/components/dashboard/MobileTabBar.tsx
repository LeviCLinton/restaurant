import { useState } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, ClipboardList, LayoutGrid, UtensilsCrossed, MoreHorizontal, CalendarClock, Users, Gift, BarChart3, ChefHat, Settings, X } from "lucide-react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { IconButton } from "@/components/ui";

const PRIMARY = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/dashboard/orders", label: "Orders", icon: ClipboardList },
  { to: "/dashboard/tables", label: "Tables", icon: LayoutGrid },
  { to: "/dashboard/menu", label: "Menu", icon: UtensilsCrossed },
];

const MORE_ITEMS = [
  { to: "/dashboard/reservations", label: "Reservations", icon: CalendarClock },
  { to: "/dashboard/customers", label: "Customers", icon: Users },
  { to: "/dashboard/loyalty", label: "Loyalty", icon: Gift },
  { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/kitchen", label: "Kitchen display", icon: ChefHat },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function MobileTabBar() {
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <>
      <nav
        aria-label="Dashboard"
        className="fixed inset-x-0 bottom-0 z-40 flex border-t border-paper-300 bg-paper-50/95 backdrop-blur-md md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {PRIMARY.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[0.6875rem] font-medium ${
                isActive ? "text-ink-950" : "text-slate-400"
              }`
            }
          >
            <item.icon className="size-5" aria-hidden="true" />
            {item.label}
          </NavLink>
        ))}
        <button
          onClick={() => setMoreOpen(true)}
          className="flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[0.6875rem] font-medium text-slate-400"
        >
          <MoreHorizontal className="size-5" aria-hidden="true" />
          More
        </button>
      </nav>

      {createPortal(
        <AnimatePresence>
          {moreOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-ink-950/50"
                onClick={() => setMoreOpen(false)}
              />
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
                className="absolute inset-x-0 bottom-0 rounded-t-[var(--radius-xl)] bg-paper-50 p-5 pb-8"
              >
                <div className="flex items-center justify-between">
                  <p className="font-display text-lg font-semibold text-ink-950">More</p>
                  <IconButton aria-label="Close" onClick={() => setMoreOpen(false)}>
                    <X className="size-5" />
                  </IconButton>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {MORE_ITEMS.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setMoreOpen(false)}
                      className="flex flex-col items-center gap-1.5 rounded-[var(--radius-sm)] border border-paper-300 py-4 text-xs font-medium text-ink-800"
                    >
                      <item.icon className="size-5" aria-hidden="true" />
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
