import { useEffect, useState } from "react";
import { Sheet, Button, Input } from "@/components/ui";
import { menuCategories } from "@/data";
import type { MenuItem } from "@/types";

export function MenuItemFormSheet({
  item,
  open,
  onClose,
  onSave,
}: {
  item: MenuItem | null;
  open: boolean;
  onClose: () => void;
  onSave: (item: MenuItem) => void;
}) {
  const [form, setForm] = useState<Partial<MenuItem>>({});

  useEffect(() => {
    setForm(
      item ?? {
        id: `item_${Date.now()}`,
        categoryId: menuCategories[1]?.id ?? menuCategories[0].id,
        name: "",
        description: "",
        price: 0,
        imageQuery: "",
        dietaryTags: [],
        ingredients: [],
        allergens: [],
        isPopular: false,
        isAvailable: true,
      }
    );
  }, [item, open]);

  function handleSave() {
    if (!form.name?.trim()) return;
    onSave(form as MenuItem);
    onClose();
  }

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title={item ? "Edit item" : "Add menu item"}
      footer={
        <Button fullWidth onClick={handleSave}>
          {item ? "Save changes" : "Add item"}
        </Button>
      }
    >
      <div className="flex flex-col gap-4">
        <Input
          label="Name"
          required
          value={form.name ?? ""}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
        <div>
          <label className="text-[0.8125rem] font-medium text-ink-800">Category</label>
          <select
            value={form.categoryId}
            onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
            className="mt-1.5 h-11 w-full rounded-[var(--radius-sm)] border border-paper-300 bg-paper-50 px-3.5 text-sm focus:border-brass-500 focus:outline-none focus:ring-2 focus:ring-brass-500/40"
          >
            {menuCategories
              .filter((c) => c.id !== "cat_popular")
              .map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label className="text-[0.8125rem] font-medium text-ink-800">Description</label>
          <textarea
            value={form.description ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            rows={3}
            className="mt-1.5 w-full resize-none rounded-[var(--radius-sm)] border border-paper-300 bg-paper-50 px-3.5 py-2.5 text-sm focus:border-brass-500 focus:outline-none focus:ring-2 focus:ring-brass-500/40"
          />
        </div>
        <Input
          label="Price (KSh)"
          type="number"
          value={form.price ?? 0}
          onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
        />
        <label className="flex items-center justify-between rounded-[var(--radius-sm)] border border-paper-300 px-3.5 py-3">
          <span className="text-sm font-medium text-ink-950">Available to order</span>
          <input
            type="checkbox"
            checked={form.isAvailable ?? true}
            onChange={(e) => setForm((f) => ({ ...f, isAvailable: e.target.checked }))}
            className="size-4 accent-[#B1823E]"
          />
        </label>
      </div>
    </Sheet>
  );
}
