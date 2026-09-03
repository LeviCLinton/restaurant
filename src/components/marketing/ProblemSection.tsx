import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/layout/Logo";

const FRAGMENTS = ["WhatsApp", "Phone bookings", "Walk-ins", "Paper menus", "Spreadsheets", "POS terminal"];

export function ProblemSection() {
  return (
    <section className="border-b border-paper-300 bg-paper-100/60 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="font-display text-3xl font-semibold text-ink-950 sm:text-4xl">
          Your restaurant has too many systems.
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-slate-600">
          Orders come from six directions and none of them talk to each other.
        </p>

        <div className="mt-14 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-4">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {FRAGMENTS.map((f, i) => (
              <motion.span
                key={f}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="rounded-[var(--radius-sm)] border border-paper-300 bg-paper-50 px-3.5 py-2.5 text-sm text-slate-600"
              >
                {f}
              </motion.span>
            ))}
          </div>

          <ArrowRight className="hidden size-6 shrink-0 text-slate-400 sm:block" aria-hidden="true" />

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.3 }}
            className="flex items-center gap-2 rounded-[var(--radius-md)] border border-brass-500/30 bg-ink-950 px-6 py-4 shadow-[var(--shadow-brass-glow)]"
          >
            <Logo dark />
          </motion.div>
        </div>
        <p className="mt-8 text-sm text-slate-500">One connected system. Nothing falls through the cracks.</p>
      </div>
    </section>
  );
}
