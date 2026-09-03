import { useState } from "react";
import { Calendar, Search } from "lucide-react";
import {
  Button,
  StatusPill,
  Card,
  CardHeader,
  CardBody,
  Input,
  Ticket,
  Skeleton,
  EmptyState,
  IconButton,
} from "@/components/ui";
import type { Status } from "@/components/ui";

const COLOR_GROUPS: { name: string; swatches: { label: string; className: string }[] }[] = [
  {
    name: "Ink (dark surface / text)",
    swatches: [
      { label: "ink-950", className: "bg-ink-950" },
      { label: "ink-900", className: "bg-ink-900" },
      { label: "ink-800", className: "bg-ink-800" },
      { label: "ink-700", className: "bg-ink-700" },
      { label: "ink-600", className: "bg-ink-600" },
    ],
  },
  {
    name: "Paper (light surface)",
    swatches: [
      { label: "paper-50", className: "bg-paper-50 border border-paper-300" },
      { label: "paper-100", className: "bg-paper-100" },
      { label: "paper-200", className: "bg-paper-200" },
      { label: "paper-300", className: "bg-paper-300" },
    ],
  },
  {
    name: "Brass (brand accent)",
    swatches: [
      { label: "brass-300", className: "bg-brass-300" },
      { label: "brass-400", className: "bg-brass-400" },
      { label: "brass-500", className: "bg-brass-500" },
      { label: "brass-600", className: "bg-brass-600" },
      { label: "brass-700", className: "bg-brass-700" },
    ],
  },
  {
    name: "Slate (secondary text)",
    swatches: [
      { label: "slate-400", className: "bg-slate-400" },
      { label: "slate-500", className: "bg-slate-500" },
      { label: "slate-600", className: "bg-slate-600" },
      { label: "slate-700", className: "bg-slate-700" },
    ],
  },
];

const ALL_STATUSES: Status[] = [
  "available",
  "occupied",
  "reserved",
  "attention",
  "new",
  "preparing",
  "ready",
  "served",
  "completed",
  "cancelled",
  "pending",
  "confirmed",
  "seated",
  "no-show",
  "success",
  "warning",
  "error",
];

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-paper-300 py-10">
      <div className="mb-6">
        <h2 className="font-display text-xl font-semibold text-ink-950">{title}</h2>
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </div>
      {children}
    </section>
  );
}

export function StyleGuidePage() {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="min-h-screen bg-paper-50 pb-24">
      <header className="border-b border-paper-300 bg-ink-950 px-6 py-10 text-paper-50 sm:px-10">
        <p className="font-mono text-xs tracking-wide text-brass-300">TABLEFLOW / PHASE 1</p>
        <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Design System</h1>
        <p className="mt-2 max-w-xl text-sm text-paper-200/80">
          Tokens and primitive components used across every phase of the product. Nothing here
          is decorative — this page exists so color, type, and component states stay consistent
          as the product grows.
        </p>
      </header>

      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <Section title="Typography" description="Display uses Bricolage Grotesque; UI and body copy use Inter; order numbers and timestamps use JetBrains Mono.">
          <div className="flex flex-col gap-4">
            <p className="font-display text-5xl font-semibold leading-[1.05] text-ink-950">Run your restaurant, better.</p>
            <p className="font-display text-3xl font-semibold text-ink-950">H1 — Every table, one view</p>
            <p className="font-display text-2xl font-semibold text-ink-950">H2 — Kitchen display</p>
            <p className="font-display text-lg font-semibold text-ink-950">H3 — Today's reservations</p>
            <p className="max-w-xl text-base text-ink-800">
              Body — Orders, tables, payments, customers and insights, connected in one
              restaurant platform.
            </p>
            <p className="text-sm text-slate-500">Small — Table 14 · 4 guests · Seated 8 minutes ago</p>
            <p className="text-xs text-slate-400">Caption — Prices include VAT</p>
            <p className="font-mono text-sm tabular-nums text-ink-700">Mono — Order #104 · 08:42</p>
          </div>
        </Section>

        <Section title="Color" description="One accent (brass) plus a dedicated status palette. Status colors are never reused for anything else.">
          <div className="grid gap-6 sm:grid-cols-2">
            {COLOR_GROUPS.map((group) => (
              <div key={group.name}>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">{group.name}</p>
                <div className="flex gap-2">
                  {group.swatches.map((s) => (
                    <div key={s.label} className="flex flex-col items-center gap-1.5">
                      <div className={`size-11 rounded-[var(--radius-sm)] ${s.className}`} />
                      <span className="text-[0.6875rem] text-slate-500">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Status pills" description="Every table, order, and reservation status in the product routes through this single component.">
          <div className="flex flex-wrap gap-2">
            {ALL_STATUSES.map((status) => (
              <StatusPill key={status} status={status} />
            ))}
          </div>
        </Section>

        <Section title="Buttons" description="Every variant across default, hover, focus, disabled, and loading states.">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="dark">Dark</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
            <Button variant="primary" loading={loading} onClick={() => setLoading((v) => !v)}>
              {loading ? "Loading" : "Toggle loading"}
            </Button>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <IconButton aria-label="Search">
              <Search className="size-4" />
            </IconButton>
            <IconButton aria-label="Open calendar" variant="solid">
              <Calendar className="size-4" />
            </IconButton>
          </div>
        </Section>

        <Section title="Cards & tickets" description="Cards are for static content (soft radius). Tickets are for anything moving through an operational flow — orders, kitchen chits (near-square radius, torn-edge notch).">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <h3 className="font-display font-semibold text-ink-950">Today's revenue</h3>
                <StatusPill status="success" label="On track" />
              </CardHeader>
              <CardBody>
                <p className="font-display text-3xl font-semibold tabular-nums text-ink-950">KSh 184,500</p>
                <p className="mt-1 text-sm text-status-success">+14.2% vs last week</p>
              </CardBody>
            </Card>
            <Ticket className="p-5">
              <div className="flex items-center justify-between">
                <p className="font-mono text-sm font-semibold text-ink-950">ORDER #104</p>
                <StatusPill status="preparing" size="sm" />
              </div>
              <p className="mt-1 text-xs text-slate-500">Table 14</p>
              <ul className="mt-3 space-y-1 text-sm text-ink-800">
                <li>1× Smoked Chicken Burger</li>
                <li>1× Rosemary Fries</li>
                <li>1× Tusker Lager</li>
              </ul>
            </Ticket>
          </div>
        </Section>

        <Section title="Forms" description="Inline validation, helper text, and error states.">
          <div className="grid max-w-md gap-4">
            <Input
              label="Guest name"
              placeholder="e.g. Amina Hassan"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              required
            />
            <Input label="Party size" type="number" defaultValue={4} helperText="Includes children" />
            <Input label="Phone number" defaultValue="+254" error="Enter a valid Kenyan phone number." />
          </div>
        </Section>

        <Section title="Loading & empty states">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <EmptyState
              icon={Calendar}
              title="No reservations yet"
              description="Reservations booked for today will appear here as guests confirm."
              actionLabel="Create reservation"
              onAction={() => {}}
            />
          </div>
        </Section>
      </div>
    </div>
  );
}
