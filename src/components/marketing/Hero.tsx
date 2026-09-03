import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardList, LayoutGrid, TrendingUp } from "lucide-react";
import { Button, StatusPill } from "@/components/ui";
import { orders, tables, revenueSeries7d } from "@/data";
import { formatCurrency } from "@/lib/utils";

type Tab = "orders" | "tables" | "analytics";

const TABS: { id: Tab; label: string; icon: typeof ClipboardList }[] = [
  { id: "orders", label: "Orders", icon: ClipboardList },
  { id: "tables", label: "Tables", icon: LayoutGrid },
  { id: "analytics", label: "Analytics", icon: TrendingUp },
];

export function Hero() {
  const [tab, setTab] = useState<Tab>("orders");

  return (
    <section className="relative overflow-hidden bg-ink-950 text-paper-50">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #FBFAF6 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-28">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brass-500/30 bg-brass-500/10 px-3 py-1 text-xs font-medium text-brass-300">
            Built for restaurants in Kenya
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            Run your restaurant.
            <br />
            Better.
          </h1>
          <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-paper-200/80">
            Orders, tables, payments, customers and insights — connected in one intelligent
            restaurant platform.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/signup">
              <Button size="lg">Start Free</Button>
            </Link>
            <Link to="/demo">
              <Button size="lg" variant="dark" className="border border-paper-50/15">
                Explore the platform
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-xs text-paper-200/50">
            No card required · Explore customer, restaurant and kitchen views instantly
          </p>
        </div>

        <div className="rounded-[var(--radius-lg)] border border-paper-50/10 bg-ink-900 p-3 shadow-[var(--shadow-raised)] sm:p-4">
          <div className="flex gap-1 rounded-[var(--radius-sm)] bg-ink-950/60 p-1">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                aria-pressed={tab === id}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-[var(--radius-xs)] py-2 text-xs font-medium transition-colors duration-[var(--duration-fast)] ${
                  tab === id ? "bg-brass-500 text-ink-950" : "text-paper-200/70 hover:text-paper-50"
                }`}
              >
                <Icon className="size-3.5" aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>

          <div className="relative mt-3 h-72 overflow-hidden rounded-[var(--radius-sm)] bg-paper-50 p-4">
            <AnimatePresence mode="wait">
              {tab === "orders" && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="flex h-full flex-col gap-2 overflow-hidden"
                >
                  <p className="text-xs font-medium text-slate-500">Live orders</p>
                  {orders.slice(0, 4).map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between rounded-[var(--radius-xs)] border border-paper-300 bg-paper-50 px-3 py-2"
                    >
                      <div>
                        <p className="font-mono text-xs font-semibold text-ink-950">#{order.orderNumber}</p>
                        <p className="text-[0.6875rem] text-slate-500">Table {order.tableId?.replace("t", "")}</p>
                      </div>
                      <StatusPill status={order.status} size="sm" />
                    </div>
                  ))}
                </motion.div>
              )}
              {tab === "tables" && (
                <motion.div
                  key="tables"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="grid h-full grid-cols-5 gap-2"
                >
                  {tables.slice(0, 10).map((table) => (
                    <div
                      key={table.id}
                      className={`flex flex-col items-center justify-center gap-0.5 rounded-[var(--radius-xs)] border py-3 text-[0.625rem] font-medium ${
                        table.status === "available"
                          ? "border-status-available/30 bg-status-available-bg text-status-available"
                          : table.status === "occupied"
                            ? "border-status-occupied/30 bg-status-occupied-bg text-status-occupied"
                            : table.status === "reserved"
                              ? "border-status-reserved/30 bg-status-reserved-bg text-status-reserved"
                              : "border-status-attention/30 bg-status-attention-bg text-status-attention"
                      }`}
                    >
                      {table.label}
                    </div>
                  ))}
                </motion.div>
              )}
              {tab === "analytics" && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="flex h-full flex-col"
                >
                  <p className="text-xs font-medium text-slate-500">Revenue — 7 days</p>
                  <p className="mt-1 font-display text-2xl font-semibold tabular-nums text-ink-950">
                    {formatCurrency(revenueSeries7d.reduce((s, p) => s + p.revenue, 0))}
                  </p>
                  <div className="mt-4 flex flex-1 items-end gap-2">
                    {revenueSeries7d.map((point) => {
                      const max = Math.max(...revenueSeries7d.map((p) => p.revenue));
                      return (
                        <div key={point.date} className="flex flex-1 flex-col items-center gap-1">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${(point.revenue / max) * 100}%` }}
                            transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
                            className="w-full rounded-t-[3px] bg-brass-500"
                            style={{ minHeight: 4 }}
                          />
                          <span className="text-[0.5625rem] text-slate-400">
                            {new Date(point.date).toLocaleDateString("en-KE", { weekday: "narrow" })}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
