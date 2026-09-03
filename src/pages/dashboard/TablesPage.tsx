import { useState } from "react";
import { useSeo } from "@/hooks/useSeo";
import { useAppStore } from "@/context/AppStoreContext";
import { TableDetailDrawer } from "@/components/dashboard/TableDetailDrawer";
import type { RestaurantTable, TableStatus } from "@/types";

const STATUS_STYLES: Record<TableStatus, string> = {
  available: "border-status-available/40 bg-status-available-bg text-status-available",
  occupied: "border-status-occupied/40 bg-status-occupied-bg text-status-occupied",
  reserved: "border-status-reserved/40 bg-status-reserved-bg text-status-reserved",
  attention: "border-status-attention/40 bg-status-attention-bg text-status-attention animate-pulse",
};

export function TablesPage() {
  useSeo({ title: "Tables", description: "Live floor plan for Ember.", path: "/dashboard/tables" });

  const { tables } = useAppStore();
  const [selected, setSelected] = useState<RestaurantTable | null>(null);
  const zones = Array.from(new Set(tables.map((t) => t.zone)));

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-950">Tables</h1>
          <p className="text-sm text-slate-500">Tap a table to view its order or change its status.</p>
        </div>
        <div className="hidden flex-wrap gap-3 text-xs text-slate-500 sm:flex">
          {(Object.keys(STATUS_STYLES) as TableStatus[]).map((s) => (
            <span key={s} className="flex items-center gap-1.5 capitalize">
              <span className={`size-2.5 rounded-full border ${STATUS_STYLES[s]}`} />
              {s}
            </span>
          ))}
        </div>
      </div>

      {zones.map((zone) => (
        <div key={zone} className="mb-6">
          <h2 className="mb-2.5 text-xs font-medium uppercase tracking-wide text-slate-500">{zone}</h2>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-7">
            {tables
              .filter((t) => t.zone === zone)
              .map((table) => (
                <button
                  key={table.id}
                  onClick={() => setSelected(table)}
                  className={`flex aspect-square flex-col items-center justify-center gap-1 rounded-[var(--radius-md)] border-2 text-sm font-semibold transition-transform active:scale-95 ${STATUS_STYLES[table.status]}`}
                >
                  {table.label}
                  <span className="text-[0.6875rem] font-normal opacity-70">{table.seats} seats</span>
                </button>
              ))}
          </div>
        </div>
      ))}

      <TableDetailDrawer table={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
