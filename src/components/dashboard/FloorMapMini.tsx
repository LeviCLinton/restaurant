import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui";
import { useAppStore } from "@/context/AppStoreContext";
import type { TableStatus } from "@/types";

const STATUS_COLOR: Record<TableStatus, string> = {
  available: "bg-status-available",
  occupied: "bg-status-occupied",
  reserved: "bg-status-reserved",
  attention: "bg-status-attention",
};

export function FloorMapMini() {
  const { tables } = useAppStore();
  const counts = tables.reduce<Record<TableStatus, number>>(
    (acc, t) => ({ ...acc, [t.status]: (acc[t.status] ?? 0) + 1 }),
    { available: 0, occupied: 0, reserved: 0, attention: 0 }
  );

  return (
    <Card>
      <CardHeader>
        <h3 className="font-display font-semibold text-ink-950">Live floor</h3>
        <Link to="/dashboard/tables" className="flex items-center gap-1 text-xs font-medium text-brass-600 hover:text-brass-700">
          Full view <ArrowRight className="size-3" />
        </Link>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-7 gap-1.5 sm:grid-cols-10">
          {tables.map((t) => (
            <div
              key={t.id}
              title={`${t.label} — ${t.status}`}
              className={`h-6 rounded-[4px] ${STATUS_COLOR[t.status]}/70`}
            />
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-500">
          {(Object.keys(counts) as TableStatus[]).map((status) => (
            <span key={status} className="flex items-center gap-1.5">
              <span className={`size-2 rounded-full ${STATUS_COLOR[status]}`} />
              {counts[status]} {status}
            </span>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
