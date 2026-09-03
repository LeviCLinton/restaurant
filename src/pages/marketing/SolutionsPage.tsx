import { Coffee, UtensilsCrossed, Beer, Building2 } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { CtaSection } from "@/components/marketing/CtaSection";

const SOLUTIONS = [
  {
    icon: UtensilsCrossed,
    title: "Full-service restaurants",
    description: "Table ordering, reservations, and a kitchen display that keeps every course moving in sync.",
  },
  {
    icon: Coffee,
    title: "Cafés & fast-casual",
    description: "QR ordering and pickup flows built for speed — order to payment in under a minute.",
  },
  {
    icon: Beer,
    title: "Bars & lounges",
    description: "Tab management across tables, fast reordering, and split-bill support at checkout.",
  },
  {
    icon: Building2,
    title: "Multi-location groups",
    description: "One dashboard across branches, with per-location menus, staff, and analytics.",
  },
];

export function SolutionsPage() {
  useSeo({
    title: "Solutions",
    description: "TABLEFLOW adapts to full-service restaurants, cafés, bars, and multi-location groups.",
    path: "/solutions",
  });

  return (
    <>
      <header className="border-b border-paper-300 px-5 py-16 text-center sm:px-8 sm:py-20">
        <h1 className="font-display text-4xl font-semibold text-ink-950">Built for how your restaurant actually runs.</h1>
        <p className="mx-auto mt-3 max-w-lg text-slate-600">
          Whichever format your business is, the underlying system is the same — only the
          workflow changes.
        </p>
      </header>
      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2">
          {SOLUTIONS.map((s) => (
            <div key={s.title} className="rounded-[var(--radius-md)] border border-paper-300 bg-paper-50 p-6">
              <div className="flex size-10 items-center justify-center rounded-[var(--radius-sm)] bg-brass-500/10 text-brass-600">
                <s.icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink-950">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{s.description}</p>
            </div>
          ))}
        </div>
      </section>
      <CtaSection />
    </>
  );
}
