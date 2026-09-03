import { useMemo, useState } from "react";
import { Search, ClipboardList } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { useAppStore } from "@/context/AppStoreContext";
import { StatusPill, EmptyState } from "@/components/ui";
import { OrderDetailDrawer } from "@/components/dashboard/OrderDetailDrawer";
import { formatCurrency, elapsedSince } from "@/lib/utils";
import type { Order, OrderStatus } from "@/types";

const STATUS_FILTERS: { id: OrderStatus | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "new", label: "New" },
  { id: "preparing", label: "Preparing" },
  { id: "ready", label: "Ready" },
  { id: "served", label: "Served" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
];

export function OrdersPage() {
  useSeo({ title: "Orders", description: "Manage every order at Ember in one place.", path: "/dashboard/orders" });

  const { orders, tables } = useAppStore();
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Order | null>(null);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      if (statusFilter !== "all" && o.status !== statusFilter) return false;
      if (query.trim()) {
        const table = tables.find((t) => t.id === o.tableId);
        const q = query.toLowerCase();
        return o.orderNumber.includes(q) || table?.label.toLowerCase().includes(q);
      }
      return true;
    });
  }, [orders, statusFilter, query, tables]);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-950">Orders</h1>
          <p className="text-sm text-slate-500">{filtered.length} of {orders.length} orders</p>
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search order # or table"
            className="h-10 w-full rounded-[var(--radius-sm)] border border-paper-300 bg-paper-50 pl-9 pr-3 text-sm sm:w-64"
          />
        </div>
      </div>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setStatusFilter(f.id)}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
              statusFilter === f.id
                ? "border-ink-950 bg-ink-950 text-paper-50"
                : "border-paper-300 bg-paper-50 text-slate-600 hover:border-slate-400"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={ClipboardList} title="No orders match" description="Try a different filter or search term." />
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-[var(--radius-md)] border border-paper-300 bg-paper-50 sm:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-paper-300 bg-paper-100/60 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3">Table</th>
                  <th className="px-4 py-3">Items</th>
                  <th className="px-4 py-3">Placed</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => {
                  const table = tables.find((t) => t.id === order.tableId);
                  return (
                    <tr
                      key={order.id}
                      onClick={() => setSelected(order)}
                      className="cursor-pointer border-b border-paper-200 last:border-0 hover:bg-paper-100/60"
                    >
                      <td className="px-4 py-3 font-mono font-medium text-ink-950">#{order.orderNumber}</td>
                      <td className="px-4 py-3 text-ink-800">{table?.label ?? "Pickup"}</td>
                      <td className="max-w-56 truncate px-4 py-3 text-slate-500">
                        {order.items.map((i) => `${i.quantity}× ${i.name}`).join(", ")}
                      </td>
                      <td className="px-4 py-3 text-slate-500">{elapsedSince(order.placedAt)} ago</td>
                      <td className="px-4 py-3">
                        <StatusPill status={order.status} size="sm" />
                      </td>
                      <td className="px-4 py-3 text-right font-mono tabular-nums text-ink-950">
                        {formatCurrency(order.total)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <ul className="flex flex-col gap-2.5 sm:hidden">
            {filtered.map((order) => {
              const table = tables.find((t) => t.id === order.tableId);
              return (
                <li key={order.id}>
                  <button
                    onClick={() => setSelected(order)}
                    className="flex w-full items-center justify-between rounded-[var(--radius-md)] border border-paper-300 bg-paper-50 px-4 py-3 text-left"
                  >
                    <div>
                      <p className="font-mono text-sm font-semibold text-ink-950">
                        #{order.orderNumber} <span className="text-slate-400">· {table?.label ?? "Pickup"}</span>
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">{elapsedSince(order.placedAt)} ago · {formatCurrency(order.total)}</p>
                    </div>
                    <StatusPill status={order.status} size="sm" />
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}

      <OrderDetailDrawer order={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
