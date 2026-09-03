import { Leaf, Flame } from "lucide-react";
import type { MenuItem } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { DishPlaceholder } from "./DishPlaceholder";

export function FoodCard({ item, onSelect }: { item: MenuItem; onSelect: (item: MenuItem) => void }) {
  const isSoldOut = !item.isAvailable;

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      disabled={isSoldOut}
      className="group flex flex-col overflow-hidden rounded-[var(--radius-md)] border border-paper-300 bg-paper-50 text-left transition-shadow duration-[var(--duration-fast)] hover:shadow-[var(--shadow-card)] disabled:cursor-not-allowed disabled:opacity-70"
    >
      <div className="relative h-32 w-full overflow-hidden">
        <DishPlaceholder name={item.name} className="h-full w-full transition-transform duration-[var(--duration-slow)] group-hover:scale-105" />
        {item.isPopular && !isSoldOut && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-ink-950/85 px-2 py-0.5 text-[0.6875rem] font-medium text-paper-50">
            Popular
          </span>
        )}
        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink-950/55">
            <span className="rounded-full bg-paper-50 px-3 py-1 text-xs font-semibold text-ink-950">
              Currently unavailable
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-[0.9375rem] font-semibold leading-tight text-ink-950">{item.name}</h3>
        </div>
        <p className="line-clamp-2 text-[0.8125rem] leading-snug text-slate-500">{item.description}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-mono text-sm font-semibold tabular-nums text-ink-950">
            {formatCurrency(item.price)}
          </span>
          <div className="flex items-center gap-1">
            {item.dietaryTags.includes("vegetarian") && (
              <Leaf className="size-3.5 text-status-available" aria-label="Vegetarian" />
            )}
            {item.dietaryTags.includes("spicy") && <Flame className="size-3.5 text-status-attention" aria-label="Spicy" />}
          </div>
        </div>
      </div>
    </button>
  );
}
