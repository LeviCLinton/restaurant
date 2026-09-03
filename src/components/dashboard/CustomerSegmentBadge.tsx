import type { CustomerSegment } from "@/types";

const CONFIG: Record<CustomerSegment, { label: string; className: string }> = {
  new: { label: "New", className: "bg-status-reserved-bg text-status-reserved" },
  regular: { label: "Regular", className: "bg-status-available-bg text-status-available" },
  vip: { label: "VIP", className: "bg-brass-500/15 text-brass-700" },
  "at-risk": { label: "At risk", className: "bg-status-attention-bg text-status-attention" },
};

export function CustomerSegmentBadge({ segment }: { segment: CustomerSegment }) {
  const config = CONFIG[segment];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
}
