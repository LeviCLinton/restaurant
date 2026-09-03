import { motion } from "framer-motion";
import { QrCode, LayoutGrid, ChefHat, CalendarClock, Users, BarChart3 } from "lucide-react";
import { StatusPill } from "@/components/ui";
import { tables } from "@/data";

const FEATURES = [
  {
    id: "qr",
    icon: QrCode,
    title: "QR ordering",
    description: "A guest scans the table code, browses the menu, and pays — no app install, no waiting to flag a waiter.",
  },
  {
    id: "tables",
    icon: LayoutGrid,
    title: "Smart tables",
    description: "See every table's status at a glance. Tap a table to view its order, seat time, and party size.",
  },
  {
    id: "kitchen",
    icon: ChefHat,
    title: "Kitchen display",
    description: "Orders route straight to the kitchen the moment they're placed — no shouted tickets, no lost slips.",
  },
  {
    id: "reservations",
    icon: CalendarClock,
    title: "Reservations",
    description: "Bookings, walk-ins, and waitlists in one calendar, with tables assigned automatically where possible.",
  },
  {
    id: "crm",
    icon: Users,
    title: "Customer CRM",
    description: "Every order builds a profile — spend, frequency, favorite dishes — so regulars feel remembered.",
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Analytics",
    description: "Revenue, best sellers, and busy hours in one view, so decisions come from data instead of guesswork.",
  },
];

export function ProductShowcase() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-lg">
          <h2 className="font-display text-3xl font-semibold text-ink-950 sm:text-4xl">
            Everything connected, nothing bolted on.
          </h2>
          <p className="mt-3 text-slate-600">
            Each part of TABLEFLOW feeds the next — an order placed at a table updates the
            kitchen, the floor plan, and the customer's profile at the same time.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.3, delay: (i % 3) * 0.06 }}
              className="rounded-[var(--radius-md)] border border-paper-300 bg-paper-50 p-6"
            >
              <div className="flex size-10 items-center justify-center rounded-[var(--radius-sm)] bg-brass-500/10 text-brass-600">
                <feature.icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink-950">{feature.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{feature.description}</p>

              {feature.id === "tables" && (
                <div className="mt-4 grid grid-cols-6 gap-1">
                  {tables.slice(0, 12).map((t) => (
                    <div
                      key={t.id}
                      className={`h-4 rounded-[3px] ${
                        t.status === "available"
                          ? "bg-status-available/40"
                          : t.status === "occupied"
                            ? "bg-status-occupied/40"
                            : t.status === "reserved"
                              ? "bg-status-reserved/40"
                              : "bg-status-attention/40"
                      }`}
                    />
                  ))}
                </div>
              )}
              {feature.id === "kitchen" && (
                <div className="mt-4 flex gap-1.5">
                  <StatusPill status="new" size="sm" />
                  <StatusPill status="preparing" size="sm" />
                  <StatusPill status="ready" size="sm" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
