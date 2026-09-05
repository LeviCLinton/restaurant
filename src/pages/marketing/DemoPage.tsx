import { Link } from "react-router-dom";
import { Smartphone, LayoutDashboard, ChefHat, ArrowRight } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";

const MODES = [
  {
    to: "/demo/order",
    icon: Smartphone,
    title: "Customer",
    description: "Browse the menu at LCN Restaurant, add items to a cart, and place an order from Table 14.",
  },
  {
    to: "/dashboard",
    icon: LayoutDashboard,
    title: "Restaurant",
    description: "See live orders, tables, reservations, and revenue the way a manager would.",
  },
  {
    to: "/kitchen",
    icon: ChefHat,
    title: "Kitchen",
    description: "Move tickets from New to Preparing to Ready on a touch-friendly kitchen display.",
  },
];

export function DemoPage() {
  useSeo({
    title: "Explore the demo",
    description: "Explore TABLEFLOW as a customer, restaurant manager, or kitchen — no account needed.",
    path: "/demo",
  });

  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="font-display text-4xl font-semibold text-ink-950">Explore TABLEFLOW.</h1>
        <p className="mx-auto mt-3 max-w-md text-slate-600">
          Every view below shares the same live data — place an order as a customer, then watch
          it appear in the kitchen.
        </p>
      </div>
      <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-3">
        {MODES.map((mode) => (
          <Link
            key={mode.to}
            to={mode.to}
            className="group flex flex-col rounded-[var(--radius-md)] border border-paper-300 bg-paper-50 p-6 transition-colors hover:border-brass-500/50"
          >
            <div className="flex size-11 items-center justify-center rounded-[var(--radius-sm)] bg-brass-500/10 text-brass-600">
              <mode.icon className="size-5" aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-ink-950">{mode.title}</h3>
            <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600">{mode.description}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brass-600 group-hover:gap-1.5 transition-all">
              Explore <ArrowRight className="size-3.5" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
