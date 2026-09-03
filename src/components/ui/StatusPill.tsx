import { cn } from "@/lib/utils";
import type { OrderStatus, ReservationStatus, TableStatus } from "@/types";

/**
 * Every status badge in the product (tables, orders, reservations, kitchen
 * tickets) renders through this component so a status color can never drift
 * between screens. Add new statuses here, never inline a status color.
 */
export type Status =
  | TableStatus
  | OrderStatus
  | ReservationStatus
  | "success"
  | "warning"
  | "error";

const STATUS_CONFIG: Record<string, { label: string; dot: string; bg: string; fg: string }> = {
  available: { label: "Available", dot: "bg-status-available", bg: "bg-status-available-bg", fg: "text-status-available" },
  occupied: { label: "Occupied", dot: "bg-status-occupied", bg: "bg-status-occupied-bg", fg: "text-status-occupied" },
  reserved: { label: "Reserved", dot: "bg-status-reserved", bg: "bg-status-reserved-bg", fg: "text-status-reserved" },
  attention: { label: "Needs attention", dot: "bg-status-attention", bg: "bg-status-attention-bg", fg: "text-status-attention" },
  new: { label: "New", dot: "bg-status-attention", bg: "bg-status-attention-bg", fg: "text-status-attention" },
  preparing: { label: "Preparing", dot: "bg-status-preparing", bg: "bg-status-preparing-bg", fg: "text-status-preparing" },
  ready: { label: "Ready", dot: "bg-status-ready", bg: "bg-status-ready-bg", fg: "text-status-ready" },
  served: { label: "Served", dot: "bg-status-completed", bg: "bg-status-completed-bg", fg: "text-status-completed" },
  completed: { label: "Completed", dot: "bg-status-completed", bg: "bg-status-completed-bg", fg: "text-status-completed" },
  cancelled: { label: "Cancelled", dot: "bg-status-error", bg: "bg-status-error-bg", fg: "text-status-error" },
  pending: { label: "Pending", dot: "bg-status-warning", bg: "bg-status-warning-bg", fg: "text-status-warning" },
  confirmed: { label: "Confirmed", dot: "bg-status-ready", bg: "bg-status-ready-bg", fg: "text-status-ready" },
  seated: { label: "Seated", dot: "bg-status-occupied", bg: "bg-status-occupied-bg", fg: "text-status-occupied" },
  "no-show": { label: "No-show", dot: "bg-status-error", bg: "bg-status-error-bg", fg: "text-status-error" },
  success: { label: "Success", dot: "bg-status-success", bg: "bg-status-success-bg", fg: "text-status-success" },
  warning: { label: "Warning", dot: "bg-status-warning", bg: "bg-status-warning-bg", fg: "text-status-warning" },
  error: { label: "Error", dot: "bg-status-error", bg: "bg-status-error-bg", fg: "text-status-error" },
};

export function StatusPill({
  status,
  label,
  size = "md",
  className,
}: {
  status: Status;
  label?: string;
  size?: "sm" | "md";
  className?: string;
}) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.completed;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-[0.8125rem]",
        config.bg,
        config.fg,
        className
      )}
    >
      <span className={cn("size-1.5 rounded-full shrink-0", config.dot)} aria-hidden="true" />
      {label ?? config.label}
    </span>
  );
}
