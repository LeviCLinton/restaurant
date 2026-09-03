import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardBody } from "@/components/ui";

export function StatCard({
  label,
  value,
  change,
  icon: Icon,
}: {
  label: string;
  value: string;
  change?: number;
  icon: LucideIcon;
}) {
  return (
    <Card>
      <CardBody className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
          <p className="mt-1.5 font-display text-2xl font-semibold tabular-nums text-ink-950">{value}</p>
          {change !== undefined && (
            <p
              className={`mt-1 flex items-center gap-1 text-xs font-medium ${
                change >= 0 ? "text-status-success" : "text-status-error"
              }`}
            >
              {change >= 0 ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
              {change >= 0 ? "+" : ""}
              {change.toFixed(1)}%
            </p>
          )}
        </div>
        <div className="flex size-9 items-center justify-center rounded-[var(--radius-sm)] bg-brass-500/10 text-brass-600">
          <Icon className="size-4.5" aria-hidden="true" />
        </div>
      </CardBody>
    </Card>
  );
}
