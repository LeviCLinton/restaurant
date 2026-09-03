import { DollarSign, ClipboardList, Users, Receipt } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { StatCard } from "@/components/dashboard/StatCard";
import { LiveOrdersList } from "@/components/dashboard/LiveOrdersList";
import { FloorMapMini } from "@/components/dashboard/FloorMapMini";
import { AiInsightCard } from "@/components/dashboard/AiInsightCard";
import { useAppStore } from "@/context/AppStoreContext";
import { revenueSeries7d, aiInsights } from "@/data";
import { formatCurrency } from "@/lib/utils";

export function OverviewPage() {
  useSeo({ title: "Dashboard", description: "Live overview of orders, tables, and revenue at Ember.", path: "/dashboard" });

  const { orders, customers } = useAppStore();
  const todayRevenue = revenueSeries7d[revenueSeries7d.length - 1]?.revenue ?? 0;
  const activeOrders = orders.filter((o) => o.status !== "completed" && o.status !== "cancelled");
  const avgOrder = orders.length ? Math.round(orders.reduce((s, o) => s + o.total, 0) / orders.length) : 0;

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-5">
        <h1 className="font-display text-2xl font-semibold text-ink-950">Good evening.</h1>
        <p className="text-sm text-slate-500">Here's what's happening at Ember right now.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Revenue today" value={formatCurrency(todayRevenue)} change={14.2} icon={DollarSign} />
        <StatCard label="Orders today" value={String(orders.length)} change={8.4} icon={ClipboardList} />
        <StatCard label="Customers" value={String(customers.length)} icon={Users} />
        <StatCard label="Avg. order" value={formatCurrency(avgOrder)} icon={Receipt} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <LiveOrdersList />
        <div className="flex flex-col gap-5">
          <FloorMapMini />
          <AiInsightCard insight={aiInsights[0]} />
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-400">{activeOrders.length} active orders in the kitchen right now.</p>
    </div>
  );
}
