import type { LucideIcon } from "lucide-react";
import { Button } from "./Button";

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-[var(--radius-md)] border border-dashed border-paper-300 bg-paper-100/50 px-6 py-14 text-center">
      <div className="flex size-11 items-center justify-center rounded-full bg-paper-200 text-ink-700">
        <Icon className="size-5" aria-hidden="true" />
      </div>
      <h3 className="font-display text-lg font-semibold text-ink-950">{title}</h3>
      <p className="max-w-sm text-sm text-slate-500">{description}</p>
      {actionLabel && onAction && (
        <Button size="sm" onClick={onAction} className="mt-1">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
