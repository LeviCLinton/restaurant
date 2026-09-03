import { Sheet, Button, StatusPill } from "@/components/ui";
import { useAppStore } from "@/context/AppStoreContext";
import { formatCurrency } from "@/lib/utils";
import type { RestaurantTable, TableStatus } from "@/types";

const STATUS_OPTIONS: TableStatus[] = ["available", "occupied", "reserved", "attention"];

export function TableDetailDrawer({ table, onClose }: { table: RestaurantTable | null; onClose: () => void }) {
  const { orders, reservations, setTableStatus } = useAppStore();
  if (!table) return null;

  const order = orders.find((o) => o.id === table.currentOrderId);
  const reservation = reservations.find((r) => r.id === table.reservationId);

  return (
    <Sheet open={!!table} onClose={onClose} title={table.label}>
      <div className="flex items-center justify-between">
        <StatusPill status={table.status} />
        <span className="text-sm text-slate-500">{table.seats} seats · {table.zone}</span>
      </div>

      {order && (
        <div className="mt-4 rounded-[var(--radius-sm)] border border-paper-300 p-3.5">
          <p className="text-sm font-medium text-ink-950">Order #{order.orderNumber}</p>
          <ul className="mt-1.5 space-y-1 text-sm text-slate-600">
            {order.items.map((line) => (
              <li key={line.id}>{line.quantity}× {line.name}</li>
            ))}
          </ul>
          <p className="mt-2 font-mono text-sm font-semibold tabular-nums text-ink-950">{formatCurrency(order.total)}</p>
        </div>
      )}

      {reservation && (
        <div className="mt-4 rounded-[var(--radius-sm)] border border-paper-300 p-3.5">
          <p className="text-sm font-medium text-ink-950">{reservation.customerName}</p>
          <p className="mt-0.5 text-sm text-slate-500">
            {reservation.partySize} guests · {reservation.time}
          </p>
        </div>
      )}

      <div className="mt-5">
        <p className="text-sm font-medium text-ink-950">Change status</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {STATUS_OPTIONS.map((status) => (
            <Button
              key={status}
              variant={table.status === status ? "primary" : "secondary"}
              size="sm"
              onClick={() => setTableStatus(table.id, status)}
              className="capitalize"
            >
              {status}
            </Button>
          ))}
        </div>
      </div>
    </Sheet>
  );
}
