import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { useAppStore } from "@/context/AppStoreContext";
import { elapsedSince } from "@/lib/utils";
import type { Order, OrderStatus } from "@/types";

const COLUMNS: { status: OrderStatus; label: string; next?: OrderStatus; action?: string }[] = [
  { status: "new", label: "New", next: "preparing", action: "Start" },
  { status: "preparing", label: "Preparing", next: "ready", action: "Ready" },
  { status: "ready", label: "Ready", next: "served", action: "Served" },
  { status: "served", label: "Served", action: undefined },
];

function KitchenTicket({ order, onAdvance, actionLabel }: { order: Order; onAdvance?: () => void; actionLabel?: string }) {
  const { tables } = useAppStore();
  const table = tables.find((t) => t.id === order.tableId);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
      className="rounded-[var(--radius-sm)] border border-paper-50/15 bg-ink-900 p-4"
    >
      <div className="flex items-center justify-between">
        <p className="font-mono text-lg font-bold text-paper-50">#{order.orderNumber}</p>
        <span className="rounded-full bg-paper-50/10 px-2.5 py-1 font-mono text-xs font-medium text-paper-200">
          {elapsedSince(order.placedAt)}
        </span>
      </div>
      <p className="mt-0.5 text-sm font-medium text-brass-300">Table {table?.label.replace("T", "") ?? "—"}</p>
      <ul className="mt-3 space-y-1">
        {order.items.map((line) => (
          <li key={line.id} className="text-[0.9375rem] text-paper-100">
            {line.quantity}× {line.name}
            {line.selectedOptions.length > 0 && (
              <span className="block text-xs text-paper-200/60">{line.selectedOptions.join(", ")}</span>
            )}
          </li>
        ))}
      </ul>
      {order.notes && (
        <p className="mt-2 rounded-[var(--radius-xs)] bg-status-attention/20 px-2.5 py-1.5 text-xs text-status-attention">
          {order.notes}
        </p>
      )}
      {onAdvance && actionLabel && (
        <button
          onClick={onAdvance}
          className="mt-4 flex h-12 w-full items-center justify-center rounded-[var(--radius-sm)] bg-brass-500 text-sm font-semibold text-ink-950 transition-transform active:scale-[0.97]"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
}

export function KitchenPage() {
  useSeo({ title: "Kitchen display", description: "Live kitchen order tickets at Ember.", path: "/kitchen" });

  const { orders, setOrderStatus } = useAppStore();

  return (
    <div className="min-h-screen bg-ink-950">
      <header className="flex items-center justify-between border-b border-paper-50/10 px-6 py-4">
        <Link to="/dashboard" className="flex items-center gap-2 text-sm text-paper-200/70 hover:text-paper-50">
          <ArrowLeft className="size-4" /> Dashboard
        </Link>
        <p className="font-display text-lg font-semibold text-paper-50">Ember — Kitchen</p>
        <span className="text-xs text-paper-200/50">{new Date().toLocaleTimeString("en-KE", { hour: "2-digit", minute: "2-digit" })}</span>
      </header>

      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        {COLUMNS.map((col) => {
          const columnOrders = orders.filter((o) => o.status === col.status);
          return (
            <div key={col.status} className="flex flex-col">
              <div className="mb-3 flex items-center justify-between px-1">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-paper-200">{col.label}</h2>
                <span className="rounded-full bg-paper-50/10 px-2 py-0.5 text-xs font-medium text-paper-200">
                  {columnOrders.length}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <AnimatePresence mode="popLayout">
                  {columnOrders.map((order) => (
                    <KitchenTicket
                      key={order.id}
                      order={order}
                      actionLabel={col.action}
                      onAdvance={col.next ? () => setOrderStatus(order.id, col.next!) : undefined}
                    />
                  ))}
                </AnimatePresence>
                {columnOrders.length === 0 && (
                  <div className="flex flex-1 items-center justify-center rounded-[var(--radius-sm)] border border-dashed border-paper-50/10 py-10 text-sm text-paper-200/40">
                    No tickets
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
