import { Sheet } from "@/components/ui";
import { CustomerSegmentBadge } from "./CustomerSegmentBadge";
import { useAppStore } from "@/context/AppStoreContext";
import { formatCurrency } from "@/lib/utils";
import type { Customer } from "@/types";

export function CustomerDetailDrawer({ customer, onClose }: { customer: Customer | null; onClose: () => void }) {
  const { orders, menuItems } = useAppStore();
  if (!customer) return null;

  const history = orders.filter((o) => o.customerId === customer.id);
  const favorite = menuItems.find((m) => m.id === customer.favoriteItemId);

  return (
    <Sheet open={!!customer} onClose={onClose} title={customer.name}>
      <div className="flex items-center justify-between">
        <CustomerSegmentBadge segment={customer.segment} />
        <span className="text-sm text-slate-500">{customer.phone}</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-[var(--radius-sm)] border border-paper-300 p-3">
          <p className="text-xs text-slate-500">Total spent</p>
          <p className="font-mono text-lg font-semibold tabular-nums text-ink-950">{formatCurrency(customer.totalSpent)}</p>
        </div>
        <div className="rounded-[var(--radius-sm)] border border-paper-300 p-3">
          <p className="text-xs text-slate-500">Orders</p>
          <p className="font-mono text-lg font-semibold tabular-nums text-ink-950">{customer.totalOrders}</p>
        </div>
        <div className="rounded-[var(--radius-sm)] border border-paper-300 p-3">
          <p className="text-xs text-slate-500">Avg. order</p>
          <p className="font-mono text-lg font-semibold tabular-nums text-ink-950">{formatCurrency(customer.averageOrder)}</p>
        </div>
        <div className="rounded-[var(--radius-sm)] border border-paper-300 p-3">
          <p className="text-xs text-slate-500">Loyalty points</p>
          <p className="font-mono text-lg font-semibold tabular-nums text-ink-950">{customer.loyaltyPoints}</p>
        </div>
      </div>

      {favorite && (
        <div className="mt-4">
          <p className="text-xs text-slate-500">Favorite item</p>
          <p className="mt-0.5 text-sm font-medium text-ink-950">{favorite.name}</p>
        </div>
      )}

      <div className="mt-5 border-t border-paper-300 pt-4">
        <p className="text-sm font-medium text-ink-950">Order history</p>
        {history.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">No orders recorded yet.</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {history.map((order) => (
              <li key={order.id} className="flex justify-between text-sm">
                <span className="text-slate-600">#{order.orderNumber} · {new Date(order.placedAt).toLocaleDateString("en-KE")}</span>
                <span className="font-mono tabular-nums text-ink-950">{formatCurrency(order.total)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Sheet>
  );
}
