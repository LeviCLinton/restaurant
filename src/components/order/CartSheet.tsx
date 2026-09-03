import { Minus, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sheet, Button, EmptyState } from "@/components/ui";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";
import { restaurant } from "@/data";
import { ShoppingBag } from "lucide-react";

export function CartSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const cart = useCart();
  const navigate = useNavigate();

  const tax = Math.round(cart.subtotal * (restaurant.taxPercent / 100));
  const serviceFee = Math.round(cart.subtotal * (restaurant.serviceFeePercent / 100));
  const total = cart.subtotal + tax + serviceFee;

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="Your order"
      footer={
        cart.items.length > 0 ? (
          <div>
            <div className="mb-3 space-y-1 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatCurrency(cart.subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tax ({restaurant.taxPercent}%)</span>
                <span className="tabular-nums">{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Service fee ({restaurant.serviceFeePercent}%)</span>
                <span className="tabular-nums">{formatCurrency(serviceFee)}</span>
              </div>
              <div className="flex justify-between border-t border-paper-300 pt-1.5 font-semibold text-ink-950">
                <span>Total</span>
                <span className="tabular-nums">{formatCurrency(total)}</span>
              </div>
            </div>
            <Button
              fullWidth
              size="lg"
              onClick={() => {
                onClose();
                navigate("/demo/order/checkout");
              }}
            >
              Continue to payment
            </Button>
          </div>
        ) : undefined
      }
    >
      {cart.items.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Add something from the menu to get started."
        />
      ) : (
        <ul className="flex flex-col gap-4">
          {cart.items.map((line) => (
            <li key={line.id} className="flex gap-3">
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-ink-950">{line.name}</p>
                  <span className="font-mono text-sm tabular-nums text-ink-950">
                    {formatCurrency(line.unitPrice * line.quantity)}
                  </span>
                </div>
                {line.selectedOptions.length > 0 && (
                  <p className="mt-0.5 text-xs text-slate-500">{line.selectedOptions.join(", ")}</p>
                )}
                {line.specialInstructions && (
                  <p className="mt-0.5 text-xs italic text-slate-400">"{line.specialInstructions}"</p>
                )}
                <div className="mt-2 flex items-center gap-2.5">
                  <button
                    type="button"
                    aria-label={`Decrease ${line.name} quantity`}
                    onClick={() => cart.setQuantity(line.id, line.quantity - 1)}
                    className="flex size-7 items-center justify-center rounded-full border border-paper-300 text-ink-800 hover:bg-paper-100 active:scale-95"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="w-4 text-center font-mono text-xs font-semibold tabular-nums">{line.quantity}</span>
                  <button
                    type="button"
                    aria-label={`Increase ${line.name} quantity`}
                    onClick={() => cart.setQuantity(line.id, line.quantity + 1)}
                    className="flex size-7 items-center justify-center rounded-full border border-paper-300 text-ink-800 hover:bg-paper-100 active:scale-95"
                  >
                    <Plus className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Remove ${line.name}`}
                    onClick={() => cart.removeItem(line.id)}
                    className="ml-auto flex size-7 items-center justify-center rounded-full text-slate-400 hover:bg-status-error-bg hover:text-status-error"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Sheet>
  );
}
