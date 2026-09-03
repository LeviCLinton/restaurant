import { useState } from "react";
import { Plus, Pencil } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { useAppStore } from "@/context/AppStoreContext";
import { Button } from "@/components/ui";
import { MenuItemFormSheet } from "@/components/dashboard/MenuItemFormSheet";
import { menuCategories } from "@/data";
import { formatCurrency } from "@/lib/utils";
import type { MenuItem } from "@/types";

export function MenuManagementPage() {
  useSeo({ title: "Menu management", description: "Manage Ember's menu, pricing, and availability.", path: "/dashboard/menu" });

  const { menuItems, toggleMenuAvailability, updateMenuItem, addMenuItem } = useAppStore();
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  function openEdit(item: MenuItem) {
    setEditing(item);
    setFormOpen(true);
  }
  function openAdd() {
    setEditing(null);
    setFormOpen(true);
  }
  function handleSave(item: MenuItem) {
    if (menuItems.some((m) => m.id === item.id)) updateMenuItem(item);
    else addMenuItem(item);
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-950">Menu</h1>
          <p className="text-sm text-slate-500">Toggle availability to instantly show "Currently unavailable" to customers.</p>
        </div>
        <Button size="sm" onClick={openAdd}>
          <Plus className="size-4" /> Add item
        </Button>
      </div>

      {menuCategories
        .filter((c) => c.id !== "cat_popular")
        .map((category) => {
          const items = menuItems.filter((i) => i.categoryId === category.id);
          if (items.length === 0) return null;
          return (
            <div key={category.id} className="mb-6">
              <h2 className="mb-2.5 text-xs font-medium uppercase tracking-wide text-slate-500">{category.name}</h2>
              <ul className="flex flex-col divide-y divide-paper-200 overflow-hidden rounded-[var(--radius-md)] border border-paper-300 bg-paper-50">
                {items.map((item) => (
                  <li key={item.id} className="flex items-center justify-between gap-3 px-4 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-ink-950">{item.name}</p>
                      <p className="truncate text-xs text-slate-500">{item.description}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="font-mono text-sm tabular-nums text-ink-950">{formatCurrency(item.price)}</span>
                      <button
                        onClick={() => toggleMenuAvailability(item.id)}
                        role="switch"
                        aria-checked={item.isAvailable}
                        aria-label={`${item.name} availability`}
                        className={`relative h-6 w-11 rounded-full transition-colors ${
                          item.isAvailable ? "bg-status-available" : "bg-paper-300"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 size-5 rounded-full bg-paper-50 shadow transition-transform ${
                            item.isAvailable ? "translate-x-5" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                      <button
                        onClick={() => openEdit(item)}
                        aria-label={`Edit ${item.name}`}
                        className="flex size-8 items-center justify-center rounded-[var(--radius-xs)] text-slate-400 hover:bg-paper-100 hover:text-ink-800"
                      >
                        <Pencil className="size-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

      <MenuItemFormSheet item={editing} open={formOpen} onClose={() => setFormOpen(false)} onSave={handleSave} />
    </div>
  );
}
