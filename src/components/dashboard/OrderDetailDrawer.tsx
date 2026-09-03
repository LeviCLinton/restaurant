import { Sheet, Button, StatusPill } from "@/components/ui";
import { useAppStore } from "@/context/AppStoreContext";
import { formatCurrency, elapsedSince } from "@/lib/utils";
import type { Order, OrderStatus } from "@/types";
import { useToast } from "@/context/ToastContext";

const NEXT_STATUS: Partial<Record<OrderStatus, OrderStatus>> = {
  new: "preparing",
  preparing: "ready",
  ready: "served",
  served: "completed",
};
const NEXT_LABEL: Partial<Record<OrderStatus, string>> = {
  new: "Start preparing",
  preparing: "Mark ready",
  ready: "Mark served",
  served: "Close order",
};

export function OrderDetailDrawer({ order, onClose }: { order: Order | null; onClose: () => void }) {
  const { tables, customers, setOrderStatus } = useAppStore();
  const { showToast } = useToast();
  if (!order) return null;

  const table = tables.find((t) => t.id === order.tableId);
  const customer = customers.find((c) => c.id === order.customerId);
  const next = NEXT_STATUS[order.status];

  return (
    <Sheet
      open={!!order}
      onClose={onClose}
      title={`Order #${order.orderNumber}`}
      footer={
        next ? (
          <div className="flex gap-2">
            <Button
              fullWidth
              onClick={() => {
                setOrderStatus(order.id, next);
                showToast(`Order #${order.orderNumber} marked ${next}`);
              }}
            >
              {NEXT_LABEL[order.status]}
            </Button>
            {order.status !== "completed" && order.status !== "cancelled" && (
              <Button
                variant="danger"
                onClick={() => {
                  setOrderStatus(order.id, "cancelled");
                  showToast(`Order #${order.orderNumber} cancelled`, "error");
                  onClose();
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        ) : undefined
      }
    >
      <div className="flex items-center justify-between">
        <StatusPill status={order.status} />
        <span className="text-xs text-slate-500">{elapsedSince(order.placedAt)} ago</span>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-xs text-slate-500">Table</dt>
          <dd className="font-medium text-ink-950">{table?.label ?? "Pickup"}</dd>
        </div>
        <div>
          <dt className="text-xs text-slate-500">Customer</dt>
          <dd className="font-medium text-ink-950">{customer?.name ?? "Guest"}</dd>
        </div>
        <div>
          <dt className="text-xs text-slate-500">Payment</dt>
          <dd className="font-medium capitalize text-ink-950">
            {order.paymentMethod ?? "—"} · {order.paymentStatus}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-slate-500">Total</dt>
          <dd className="font-mono font-semibold tabular-nums text-ink-950">{formatCurrency(order.total)}</dd>
        </div>
      </dl>

      {order.notes && (
        <div className="mt-4 rounded-[var(--radius-sm)] bg-status-warning-bg px-3 py-2 text-sm text-status-warning">
          Note: {order.notes}
        </div>
      )}

      <div className="mt-4 border-t border-paper-300 pt-4">
        <p className="text-sm font-medium text-ink-950">Items</p>
        <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
          {order.items.map((line) => (
            <li key={line.id} className="flex justify-between">
              <span>
                {line.quantity}× {line.name}
                {line.selectedOptions.length > 0 && (
                  <span className="text-xs text-slate-400"> ({line.selectedOptions.join(", ")})</span>
                )}
              </span>
              <span className="tabular-nums">{formatCurrency(line.unitPrice * line.quantity)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 border-t border-paper-300 pt-4">
        <p className="text-sm font-medium text-ink-950">Timeline</p>
        <ul className="mt-2 space-y-1.5 text-xs text-slate-500">
          {order.statusHistory.map((event, i) => (
            <li key={i} className="flex justify-between capitalize">
              <span>{event.status}</span>
              <span>{new Date(event.at).toLocaleTimeString("en-KE", { hour: "2-digit", minute: "2-digit" })}</span>
            </li>
          ))}
        </ul>
      </div>
    </Sheet>
  );
}
