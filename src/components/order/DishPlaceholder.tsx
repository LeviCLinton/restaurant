import { UtensilsCrossed } from "lucide-react";

const PALETTES = [
  ["#EDE1C2", "#B1823E"],
  ["#E6E1D2", "#8B7355"],
  ["#EFE6D8", "#C9A05A"],
  ["#E3E7DD", "#5C7A5E"],
];

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  return hash;
}

/**
 * Abstract plate visual used in place of stock food photography — avoids
 * hotlinking third-party images while still giving each dish a distinct,
 * intentional look tied to its name.
 */
export function DishPlaceholder({ name, className }: { name: string; className?: string }) {
  const [from, to] = PALETTES[hashString(name) % PALETTES.length];
  return (
    <div
      className={`flex items-center justify-center ${className ?? ""}`}
      style={{ background: `radial-gradient(circle at 35% 30%, ${from}, ${to})` }}
    >
      <div className="flex size-11 items-center justify-center rounded-full bg-paper-50/40 backdrop-blur-sm">
        <UtensilsCrossed className="size-5 text-ink-900/70" aria-hidden="true" />
      </div>
    </div>
  );
}
