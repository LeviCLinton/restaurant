import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function PhasePlaceholder({ phase, title }: { phase: string; title: string }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-paper-50 px-6 text-center">
      <span className="rounded-full bg-paper-200 px-3 py-1 text-xs font-medium text-slate-600">
        {phase}
      </span>
      <h1 className="font-display text-2xl font-semibold text-ink-950">{title}</h1>
      <p className="max-w-sm text-sm text-slate-500">
        This route is scaffolded and ready. The screen itself is built in a later phase.
      </p>
      <Link
        to="/"
        className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-brass-600 hover:text-brass-700"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back home
      </Link>
    </div>
  );
}
