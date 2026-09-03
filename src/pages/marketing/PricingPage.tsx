import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { Button } from "@/components/ui";
import { formatCurrency } from "@/lib/utils";
import { CtaSection } from "@/components/marketing/CtaSection";

const PLANS = [
  {
    name: "Starter",
    price: 0,
    period: "free",
    description: "For a single location getting started with digital ordering.",
    features: ["QR ordering", "Up to 10 tables", "Basic menu management", "Order tracking"],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Growth",
    price: 6500,
    period: "/month",
    description: "For restaurants ready to run everything from one dashboard.",
    features: [
      "Everything in Starter",
      "Unlimited tables",
      "Kitchen display system",
      "Reservations & waitlist",
      "Customer CRM & loyalty",
      "Analytics & AI insights",
    ],
    cta: "Start Free",
    highlighted: true,
  },
  {
    name: "Multi-location",
    price: null,
    period: "custom",
    description: "For restaurant groups managing several branches.",
    features: ["Everything in Growth", "Multi-location dashboard", "Role-based staff access", "Dedicated support"],
    cta: "Talk to sales",
    highlighted: false,
  },
];

export function PricingPage() {
  useSeo({
    title: "Pricing",
    description: "Simple TABLEFLOW pricing for single locations and multi-location restaurant groups.",
    path: "/pricing",
  });

  return (
    <>
      <header className="border-b border-paper-300 px-5 py-16 text-center sm:px-8 sm:py-20">
        <h1 className="font-display text-4xl font-semibold text-ink-950">Simple pricing, no surprises.</h1>
        <p className="mx-auto mt-3 max-w-lg text-slate-600">Start free. Upgrade when your kitchen needs more.</p>
      </header>
      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-[var(--radius-lg)] border p-7 ${
                plan.highlighted
                  ? "border-brass-500 bg-ink-950 text-paper-50 shadow-[var(--shadow-brass-glow)]"
                  : "border-paper-300 bg-paper-50"
              }`}
            >
              <h3 className="font-display text-xl font-semibold">{plan.name}</h3>
              <p className={`mt-1.5 text-sm ${plan.highlighted ? "text-paper-200/75" : "text-slate-600"}`}>
                {plan.description}
              </p>
              <div className="mt-5 flex items-baseline gap-1">
                {plan.price !== null ? (
                  <>
                    <span className="font-display text-3xl font-semibold tabular-nums">
                      {plan.price === 0 ? "KSh 0" : formatCurrency(plan.price)}
                    </span>
                    <span className={`text-sm ${plan.highlighted ? "text-paper-200/60" : "text-slate-500"}`}>
                      {plan.period}
                    </span>
                  </>
                ) : (
                  <span className="font-display text-3xl font-semibold">Custom</span>
                )}
              </div>
              <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check
                      className={`mt-0.5 size-4 shrink-0 ${plan.highlighted ? "text-brass-400" : "text-brass-600"}`}
                      aria-hidden="true"
                    />
                    <span className={plan.highlighted ? "text-paper-100" : "text-ink-800"}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to={plan.cta === "Talk to sales" ? "/demo" : "/signup"} className="mt-7">
                <Button variant={plan.highlighted ? "primary" : "secondary"} fullWidth>
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>
      <CtaSection />
    </>
  );
}
