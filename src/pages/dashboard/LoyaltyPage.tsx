import { useState } from "react";
import { Gift, Plus, Users, Award } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { useAppStore } from "@/context/AppStoreContext";
import { loyaltyRewards as initialRewards } from "@/data";
import { Card, CardBody, Button, Input } from "@/components/ui";
import { StatCard } from "@/components/dashboard/StatCard";
import type { LoyaltyReward } from "@/types";

export function LoyaltyPage() {
  useSeo({ title: "Loyalty", description: "Manage Ember's loyalty rewards program.", path: "/dashboard/loyalty" });

  const { customers } = useAppStore();
  const [rewards, setRewards] = useState<LoyaltyReward[]>(initialRewards);
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [points, setPoints] = useState(100);

  const totalPoints = customers.reduce((s, c) => s + c.loyaltyPoints, 0);
  const topCustomers = [...customers].sort((a, b) => b.loyaltyPoints - a.loyaltyPoints).slice(0, 5);

  function handleAddReward() {
    if (!name.trim()) return;
    setRewards((r) => [...r, { id: `rw_${Date.now()}`, name: name.trim(), pointsRequired: points, description: "" }]);
    setName("");
    setPoints(100);
    setAdding(false);
  }

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-1 font-display text-2xl font-semibold text-ink-950">Loyalty</h1>
      <p className="mb-5 text-sm text-slate-500">1 point earned per KSh 20 spent.</p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="Members" value={String(customers.length)} icon={Users} />
        <StatCard label="Points issued" value={totalPoints.toLocaleString()} icon={Award} />
        <StatCard label="Active rewards" value={String(rewards.length)} icon={Gift} />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <h2 className="font-display font-semibold text-ink-950">Rewards</h2>
        <Button size="sm" variant="secondary" onClick={() => setAdding((v) => !v)}>
          <Plus className="size-4" /> New reward
        </Button>
      </div>

      {adding && (
        <Card className="mt-3">
          <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <Input label="Reward name" value={name} onChange={(e) => setName(e.target.value)} className="flex-1" />
            <Input
              label="Points required"
              type="number"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
              className="w-full sm:w-40"
            />
            <Button onClick={handleAddReward}>Add</Button>
          </CardBody>
        </Card>
      )}

      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {rewards.map((reward) => (
          <Card key={reward.id}>
            <CardBody>
              <div className="flex size-9 items-center justify-center rounded-[var(--radius-sm)] bg-brass-500/10 text-brass-600">
                <Gift className="size-4.5" />
              </div>
              <p className="mt-3 font-display font-semibold text-ink-950">{reward.name}</p>
              <p className="text-sm text-slate-500">{reward.pointsRequired} points</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="mb-2.5 font-display font-semibold text-ink-950">Top members</h2>
        <ul className="flex flex-col divide-y divide-paper-200 overflow-hidden rounded-[var(--radius-md)] border border-paper-300 bg-paper-50">
          {topCustomers.map((c, i) => (
            <li key={c.id} className="flex items-center justify-between px-4 py-3">
              <span className="flex items-center gap-3 text-sm">
                <span className="flex size-6 items-center justify-center rounded-full bg-paper-200 text-xs font-semibold text-ink-800">
                  {i + 1}
                </span>
                <span className="font-medium text-ink-950">{c.name}</span>
              </span>
              <span className="font-mono text-sm font-semibold tabular-nums text-brass-700">{c.loyaltyPoints} pts</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
