import { Sparkles } from "lucide-react";
import type { AiInsight } from "@/types";

export function AiInsightCard({ insight }: { insight: AiInsight }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-brass-500/25 bg-brass-500/[0.05] p-4">
      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brass-700">
        <Sparkles className="size-3.5" aria-hidden="true" />
        AI insight
      </div>
      <p className="mt-1.5 text-sm font-medium text-ink-950">{insight.insight}</p>
      <p className="mt-1 text-xs text-slate-600">{insight.reason}</p>
      <div className="mt-2.5 rounded-[var(--radius-sm)] bg-paper-50 px-3 py-2 text-xs font-medium text-ink-800">
        Suggested action: {insight.recommendation}
      </div>
    </div>
  );
}
