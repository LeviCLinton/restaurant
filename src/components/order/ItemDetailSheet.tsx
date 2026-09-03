import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import type { MenuItem } from "@/types";
import { Sheet, Button } from "@/components/ui";
import { DishPlaceholder } from "./DishPlaceholder";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

export function ItemDetailSheet({
  item,
  onClose,
}: {
  item: MenuItem | null;
  onClose: () => void;
}) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (item) {
      setQuantity(1);
      setNotes("");
      const defaults: Record<string, string[]> = {};
      item.customizations?.forEach((c) => {
        if (c.required && !c.multiSelect) defaults[c.id] = [c.options[0].id];
      });
      setSelections(defaults);
    }
  }, [item]);

  if (!item) return null;

  const priceDelta = (item.customizations ?? []).reduce((sum, c) => {
    const chosen = selections[c.id] ?? [];
    return sum + c.options.filter((o) => chosen.includes(o.id)).reduce((s, o) => s + o.priceDelta, 0);
  }, 0);
  const unitPrice = item.price + priceDelta;
  const canAdd = (item.customizations ?? []).every((c) => !c.required || (selections[c.id]?.length ?? 0) > 0);

  function toggleOption(customizationId: string, optionId: string, multiSelect: boolean) {
    setSelections((prev) => {
      const current = prev[customizationId] ?? [];
      if (multiSelect) {
        return {
          ...prev,
          [customizationId]: current.includes(optionId)
            ? current.filter((id) => id !== optionId)
            : [...current, optionId],
        };
      }
      return { ...prev, [customizationId]: [optionId] };
    });
  }

  function handleAdd() {
    if (!item) return;
    const selectedLabels = (item.customizations ?? []).flatMap((c) =>
      c.options.filter((o) => (selections[c.id] ?? []).includes(o.id)).map((o) => o.label)
    );
    addItem({
      menuItemId: item.id,
      name: item.name,
      quantity,
      unitPrice,
      selectedOptions: selectedLabels,
      specialInstructions: notes.trim() || undefined,
    });
    showToast(`Added ${item.name} to your order`);
    onClose();
  }

  return (
    <Sheet
      open={!!item}
      onClose={onClose}
      title={item.name}
      footer={
        <Button fullWidth size="lg" onClick={handleAdd} disabled={!canAdd}>
          Add to order · {formatCurrency(unitPrice * quantity)}
        </Button>
      }
    >
      <DishPlaceholder name={item.name} className="-mx-5 -mt-5 mb-4 h-40 w-[calc(100%+2.5rem)]" />

      <p className="text-sm leading-relaxed text-slate-600">{item.description}</p>

      {item.ingredients.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Ingredients</p>
          <p className="mt-1 text-sm text-ink-800">{item.ingredients.join(", ")}</p>
        </div>
      )}
      {item.allergens.length > 0 && (
        <div className="mt-3">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Allergens</p>
          <p className="mt-1 text-sm text-ink-800">{item.allergens.join(", ")}</p>
        </div>
      )}

      {item.customizations?.map((customization) => (
        <fieldset key={customization.id} className="mt-5 border-t border-paper-300 pt-4">
          <legend className="flex items-center gap-1.5 text-sm font-medium text-ink-950">
            {customization.label}
            {customization.required && <span className="text-status-error">*</span>}
          </legend>
          <div className="mt-2.5 flex flex-col gap-2">
            {customization.options.map((option) => {
              const checked = (selections[customization.id] ?? []).includes(option.id);
              return (
                <label
                  key={option.id}
                  className={`flex cursor-pointer items-center justify-between rounded-[var(--radius-sm)] border px-3.5 py-2.5 text-sm transition-colors ${
                    checked ? "border-brass-500 bg-brass-500/[0.06]" : "border-paper-300 hover:border-slate-400"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <input
                      type={customization.multiSelect ? "checkbox" : "radio"}
                      name={customization.id}
                      checked={checked}
                      onChange={() => toggleOption(customization.id, option.id, customization.multiSelect)}
                      className="size-4 accent-[#B1823E]"
                    />
                    {option.label}
                  </span>
                  {option.priceDelta > 0 && (
                    <span className="text-xs text-slate-500">+{formatCurrency(option.priceDelta)}</span>
                  )}
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}

      <div className="mt-5 border-t border-paper-300 pt-4">
        <label htmlFor="special-instructions" className="text-sm font-medium text-ink-950">
          Special instructions
        </label>
        <textarea
          id="special-instructions"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="E.g. no onions"
          rows={2}
          className="mt-2 w-full resize-none rounded-[var(--radius-sm)] border border-paper-300 bg-paper-50 px-3.5 py-2.5 text-sm text-ink-950 placeholder:text-slate-400 focus:border-brass-500 focus:outline-none focus:ring-2 focus:ring-brass-500/40"
        />
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-paper-300 pt-4">
        <span className="text-sm font-medium text-ink-950">Quantity</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex size-9 items-center justify-center rounded-full border border-paper-300 text-ink-800 hover:bg-paper-100 active:scale-95"
          >
            <Minus className="size-4" />
          </button>
          <span className="w-5 text-center font-mono text-sm font-semibold tabular-nums">{quantity}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((q) => q + 1)}
            className="flex size-9 items-center justify-center rounded-full border border-paper-300 text-ink-800 hover:bg-paper-100 active:scale-95"
          >
            <Plus className="size-4" />
          </button>
        </div>
      </div>
    </Sheet>
  );
}
