import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { useAppStore } from "@/context/AppStoreContext";
import { CustomerSegmentBadge } from "@/components/dashboard/CustomerSegmentBadge";
import { CustomerDetailDrawer } from "@/components/dashboard/CustomerDetailDrawer";
import { formatCurrency } from "@/lib/utils";
import type { Customer } from "@/types";

export function CustomersPage() {
  useSeo({ title: "Customers", description: "Customer profiles and segments for Ember.", path: "/dashboard/customers" });

  const { customers } = useAppStore();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Customer | null>(null);

  const filtered = useMemo(
    () => customers.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())),
    [customers, query]
  );

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-950">Customers</h1>
          <p className="text-sm text-slate-500">{customers.length} total</p>
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search customers"
            className="h-10 w-full rounded-[var(--radius-sm)] border border-paper-300 bg-paper-50 pl-9 pr-3 text-sm sm:w-64"
          />
        </div>
      </div>

      <div className="hidden overflow-hidden rounded-[var(--radius-md)] border border-paper-300 bg-paper-50 sm:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-paper-300 bg-paper-100/60 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Orders</th>
              <th className="px-4 py-3">Total spent</th>
              <th className="px-4 py-3">Avg. order</th>
              <th className="px-4 py-3">Last visit</th>
              <th className="px-4 py-3">Segment</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr
                key={c.id}
                onClick={() => setSelected(c)}
                className="cursor-pointer border-b border-paper-200 last:border-0 hover:bg-paper-100/60"
              >
                <td className="px-4 py-3 font-medium text-ink-950">{c.name}</td>
                <td className="px-4 py-3 text-slate-600">{c.totalOrders}</td>
                <td className="px-4 py-3 font-mono tabular-nums text-ink-950">{formatCurrency(c.totalSpent)}</td>
                <td className="px-4 py-3 font-mono tabular-nums text-slate-600">{formatCurrency(c.averageOrder)}</td>
                <td className="px-4 py-3 text-slate-500">{new Date(c.lastVisitAt).toLocaleDateString("en-KE")}</td>
                <td className="px-4 py-3">
                  <CustomerSegmentBadge segment={c.segment} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="flex flex-col gap-2.5 sm:hidden">
        {filtered.map((c) => (
          <li key={c.id}>
            <button
              onClick={() => setSelected(c)}
              className="flex w-full items-center justify-between rounded-[var(--radius-md)] border border-paper-300 bg-paper-50 px-4 py-3 text-left"
            >
              <div>
                <p className="text-sm font-medium text-ink-950">{c.name}</p>
                <p className="text-xs text-slate-500">{c.totalOrders} orders · {formatCurrency(c.totalSpent)}</p>
              </div>
              <CustomerSegmentBadge segment={c.segment} />
            </button>
          </li>
        ))}
      </ul>

      <CustomerDetailDrawer customer={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
