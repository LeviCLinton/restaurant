import type { AiInsight, RevenuePoint } from "@/types";

function buildRevenueSeries(days: number): RevenuePoint[] {
  const points: RevenuePoint[] = [];
  const base = 145_000;
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(Date.now() - i * 86_400_000);
    const weekday = date.getDay();
    const weekendBoost = weekday === 5 || weekday === 6 ? 1.35 : 1;
    const noise = 0.85 + Math.sin(i * 1.7) * 0.1 + (i % 3) * 0.03;
    const revenue = Math.round(base * weekendBoost * noise);
    const orders = Math.round(revenue / 1255);
    points.push({ date: date.toISOString().slice(0, 10), revenue, orders });
  }
  return points;
}

export const revenueSeries30d: RevenuePoint[] = buildRevenueSeries(30);
export const revenueSeries7d: RevenuePoint[] = revenueSeries30d.slice(-7);

export const aiInsights: AiInsight[] = [
  {
    id: "ai_burger",
    insight: "Chicken Burger sales are up 28% this week.",
    reason: "Demand rose sharply after Thursday, concentrated in the 6–9pm window.",
    recommendation: "Feature the Smoked Chicken Burger on tonight's specials board.",
  },
  {
    id: "ai_tuesday",
    insight: "Tuesday 2–5pm traffic is 23% below your weekly average.",
    reason: "This is your quietest recurring window across the last 6 weeks.",
    recommendation: "Run a Tuesday afternoon promotion to lift covers during the lull.",
  },
  {
    id: "ai_pairing",
    insight: "68% of burger orders also include fries.",
    reason: "This pairing rate is consistent across all customer segments.",
    recommendation: "Create a Burger + Fries combo to increase average order value.",
  },
];
