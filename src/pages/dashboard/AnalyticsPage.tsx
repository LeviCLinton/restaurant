import { useMemo, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from "recharts";
import { useSeo } from "@/hooks/useSeo";
import { useAppStore } from "@/context/AppStoreContext";
import { revenueSeries30d, revenueSeries7d, aiInsights } from "@/data";
import { AiInsightCard } from "@/components/dashboard/AiInsightCard";
import { Card, CardBody, CardHeader } from "@/components/ui";
import { formatCurrency } from "@/lib/utils";

const RANGES = [
  { id: "7d", label: "7 days" },
  { id: "30d", label: "30 days" },
] as const;

const HOURLY = [
  { hour: "11am", orders: 4 },
  { hour: "12pm", orders: 14 },
  { hour: "1pm", orders: 18 },
  { hour: "2pm", orders: 9 },
  { hour: "3pm", orders: 5 },
  { hour: "4pm", orders: 4 },
  { hour: "5pm", orders: 8 },
  { hour: "6pm", orders: 16 },
  { hour: "7pm", orders: 24 },
  { hour: "8pm", orders: 21 },
  { hour: "9pm", orders: 12 },
];

export function AnalyticsPage() {
  useSeo({ title: "Analytics", description: "Revenue, top products, and busy hours at Ember.", path: "/dashboard/analytics" });

  const { orders } = useAppStore();
  const [range, setRange] = useState<"7d" | "30d">("7d");
  const series = range === "7d" ? revenueSeries7d : revenueSeries30d;

  const topProducts = useMemo(() => {
    const counts = new Map<string, number>();
    orders.forEach((o) => o.items.forEach((li) => counts.set(li.name, (counts.get(li.name) ?? 0) + li.quantity)));
    return Array.from(counts.entries())
      .map(([name, qty]) => ({ name, qty }))
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 6);
  }, [orders]);

  const totalRevenue = series.reduce((s, p) => s + p.revenue, 0);
  const totalOrders = series.reduce((s, p) => s + p.orders, 0);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-950">Analytics</h1>
          <p className="text-sm text-slate-500">
            {formatCurrency(totalRevenue)} revenue · {totalOrders} orders over {range === "7d" ? "7 days" : "30 days"}
          </p>
        </div>
        <div className="flex gap-2">
          {RANGES.map((r) => (
            <button
              key={r.id}
              onClick={() => setRange(r.id)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium ${
                range === r.id ? "border-ink-950 bg-ink-950 text-paper-50" : "border-paper-300 text-slate-600"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <Card className="mb-5">
        <CardHeader>
          <h3 className="font-display font-semibold text-ink-950">Revenue</h3>
        </CardHeader>
        <CardBody>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={series} margin={{ left: -20 }}>
              <defs>
                <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#B1823E" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#B1823E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#ECE6D6" />
              <XAxis
                dataKey="date"
                tickFormatter={(d) => new Date(d).toLocaleDateString("en-KE", { day: "numeric", month: "short" })}
                tick={{ fontSize: 11, fill: "#726A58" }}
                axisLine={false}
                tickLine={false}
                minTickGap={24}
              />
              <YAxis tick={{ fontSize: 11, fill: "#726A58" }} axisLine={false} tickLine={false} width={56} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip
                formatter={(value) => formatCurrency(Number(value ?? 0))}
                labelFormatter={(d) => (d ? new Date(String(d)).toLocaleDateString("en-KE", { weekday: "short", day: "numeric", month: "short" }) : "")}
                contentStyle={{ borderRadius: 10, border: "1px solid #ECE6D6", fontSize: 13 }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#B1823E" strokeWidth={2} fill="url(#revenueFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <h3 className="font-display font-semibold text-ink-950">Top products</h3>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={topProducts} layout="vertical" margin={{ left: 10 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={140} tick={{ fontSize: 11, fill: "#3D3829" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #ECE6D6", fontSize: 13 }} />
                <Bar dataKey="qty" fill="#B1823E" radius={[0, 4, 4, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="font-display font-semibold text-ink-950">Busy hours today</h3>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={HOURLY}>
                <CartesianGrid vertical={false} stroke="#ECE6D6" />
                <XAxis dataKey="hour" tick={{ fontSize: 10, fill: "#726A58" }} axisLine={false} tickLine={false} interval={1} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #ECE6D6", fontSize: 13 }} />
                <Bar dataKey="orders" fill="#5F5789" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>

      <div className="mt-5">
        <h2 className="mb-2.5 font-display font-semibold text-ink-950">AI insights</h2>
        <div className="grid gap-3 lg:grid-cols-3">
          {aiInsights.map((insight) => (
            <AiInsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </div>
    </div>
  );
}
