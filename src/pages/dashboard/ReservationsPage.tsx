import { useState } from "react";
import { Plus, CalendarClock } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { useAppStore } from "@/context/AppStoreContext";
import { Button, StatusPill, EmptyState } from "@/components/ui";
import { ReservationFormSheet } from "@/components/dashboard/ReservationFormSheet";
import type { ReservationStatus } from "@/types";

const STATUS_FLOW: Partial<Record<ReservationStatus, ReservationStatus>> = {
  pending: "confirmed",
  confirmed: "seated",
  seated: "completed",
};
const STATUS_ACTION_LABEL: Partial<Record<ReservationStatus, string>> = {
  pending: "Confirm",
  confirmed: "Seat",
  seated: "Complete",
};

export function ReservationsPage() {
  useSeo({ title: "Reservations", description: "Manage bookings and walk-ins at Ember.", path: "/dashboard/reservations" });

  const { reservations, tables, setReservationStatus } = useAppStore();
  const [formOpen, setFormOpen] = useState(false);

  const sorted = [...reservations].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-950">Reservations</h1>
          <p className="text-sm text-slate-500">{reservations.length} upcoming</p>
        </div>
        <Button size="sm" onClick={() => setFormOpen(true)}>
          <Plus className="size-4" /> New reservation
        </Button>
      </div>

      {sorted.length === 0 ? (
        <EmptyState
          icon={CalendarClock}
          title="No reservations yet"
          description="Reservations booked for today will appear here as guests confirm."
          actionLabel="Create reservation"
          onAction={() => setFormOpen(true)}
        />
      ) : (
        <ul className="flex flex-col gap-2.5">
          {sorted.map((res) => {
            const table = tables.find((t) => t.id === res.tableId);
            const next = STATUS_FLOW[res.status];
            return (
              <li
                key={res.id}
                className="flex flex-col gap-3 rounded-[var(--radius-md)] border border-paper-300 bg-paper-50 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-ink-950">{res.customerName}</p>
                  <p className="text-sm text-slate-500">
                    {res.partySize} guests · {res.date} at {res.time} {table && `· ${table.label}`}
                  </p>
                  {res.notes && <p className="mt-1 text-xs italic text-slate-400">{res.notes}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <StatusPill status={res.status} />
                  {next && (
                    <Button size="sm" variant="secondary" onClick={() => setReservationStatus(res.id, next)}>
                      {STATUS_ACTION_LABEL[res.status]}
                    </Button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <ReservationFormSheet open={formOpen} onClose={() => setFormOpen(false)} />
    </div>
  );
}
