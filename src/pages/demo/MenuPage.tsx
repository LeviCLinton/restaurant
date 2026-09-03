import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { useAppStore } from "@/context/AppStoreContext";
import { menuCategories, restaurant } from "@/data";
import { FoodCard } from "@/components/order/FoodCard";
import { ItemDetailSheet } from "@/components/order/ItemDetailSheet";
import type { MenuItem } from "@/types";

export function MenuPage() {
  useSeo({
    title: "Order from Ember",
    description: "Browse the menu at Ember and order straight from your table.",
    path: "/demo/order",
  });

  const { menuItems } = useAppStore();
  const [activeCategory, setActiveCategory] = useState("cat_popular");
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const filtered = useMemo(() => {
    if (query.trim()) {
      const q = query.toLowerCase();
      return menuItems.filter((item) => item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q));
    }
    if (activeCategory === "cat_popular") return menuItems.filter((item) => item.isPopular);
    return menuItems.filter((item) => item.categoryId === activeCategory);
  }, [menuItems, activeCategory, query]);

  return (
    <div className="mx-auto max-w-3xl px-4 pt-5 sm:px-6">
      <div className="text-center">
        <h1 className="font-display text-2xl font-semibold text-ink-950">{restaurant.name}</h1>
        <p className="text-sm text-slate-500">{restaurant.tagline}</p>
      </div>

      <div className="relative mt-5">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the menu"
          aria-label="Search the menu"
          className="h-11 w-full rounded-[var(--radius-sm)] border border-paper-300 bg-paper-50 pl-10 pr-3.5 text-sm text-ink-950 placeholder:text-slate-400 focus:border-brass-500 focus:outline-none focus:ring-2 focus:ring-brass-500/40"
        />
      </div>

      {!query.trim() && (
        <nav aria-label="Menu categories" className="sticky top-[calc(4rem+1px)] z-30 -mx-4 mt-4 overflow-x-auto bg-paper-50 px-4 py-2 sm:-mx-6 sm:px-6">
          <div className="flex gap-2">
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                aria-pressed={activeCategory === cat.id}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat.id
                    ? "border-ink-950 bg-ink-950 text-paper-50"
                    : "border-paper-300 bg-paper-50 text-slate-600 hover:border-slate-400"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </nav>
      )}

      <div className="mt-4 grid grid-cols-2 gap-3 pb-8 sm:grid-cols-3">
        {filtered.map((item) => (
          <FoodCard key={item.id} item={item} onSelect={setSelectedItem} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-12 text-center text-sm text-slate-500">
            No dishes match "{query}".
          </p>
        )}
      </div>

      <ItemDetailSheet item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
