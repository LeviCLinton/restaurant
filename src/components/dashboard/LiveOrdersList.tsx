import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card, CardBody, CardHeader, StatusPill, EmptyState } from "@/components/ui";
import { useAppStore } from "@/context/AppStoreContext";
import { elapsedSince } from "@/lib/utils";
import { ClipboardList } from "lucide-react";

export function LiveOrdersList() {
  const { orders, tables } = useAppStore();
  const active = orders.filter((o) => o.status !== "completed" && o.status !== "cancelled").slice(0, 6);

  return (
    <Card>
      <CardHeader>
        <h3 className="font-display font-semibold text-ink-950">Live orders</h3>
        <Link to="/dashboard/orders" className="flex items-center gap-1 text-xs font-medium text-brass-600 hover:text-brass-700">
          View all <ArrowRight className="size-3" />
        </Link>
      </CardHeader>
      <CardBody>
        {active.length === 0 ? (
          <EmptyState icon={ClipboardList} title="No active orders" description="New orders will appear here as they come in." />
        ) : (
          <ul className="flex flex-col divide-y divide-paper-200">
            {active.map((order) => {
              const table = tables.find((t) => t.id === order.tableId);
              return (
                <li key={order.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <p className="font-mono text-sm font-semibold text-ink-950">
                      #{order.orderNumber} <span className="text-slate-400">· {table?.label ?? "Pickup"}</span>
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {order.items.map((i) => `${i.quantity}× ${i.name}`).join(", ")}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <StatusPill status={order.status} size="sm" />
                    <span className="text-[0.6875rem] text-slate-400">{elapsedSince(order.placedAt)} ago</span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}
