import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CreditCard, Smartphone, Banknote, ArrowLeft } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { Button, EmptyState } from "@/components/ui";
import { useCart } from "@/context/CartContext";
import { useAppStore } from "@/context/AppStoreContext";
import { useToast } from "@/context/ToastContext";
import { formatCurrency } from "@/lib/utils";
import { restaurant } from "@/data";
import type { PaymentMethod } from "@/types";
import { ShoppingBag } from "lucide-react";

const METHODS: { id: PaymentMethod; label: string; icon: typeof CreditCard; helper: string }[] = [
  { id: "mpesa", label: "M-PESA", icon: Smartphone, helper: "Pay via STK push to your phone" },
  { id: "card", label: "Card", icon: CreditCard, helper: "Visa, Mastercard" },
  { id: "cash", label: "Cash", icon: Banknote, helper: "Pay your server directly" },
];

export function CheckoutPage() {
  useSeo({ title: "Checkout", description: "Complete your order at Ember.", path: "/demo/order/checkout" });

  const cart = useCart();
  const { placeOrder } = useAppStore();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [method, setMethod] = useState<PaymentMethod>("mpesa");
  const [placing, setPlacing] = useState(false);

  const tax = Math.round(cart.subtotal * (restaurant.taxPercent / 100));
  const serviceFee = Math.round(cart.subtotal * (restaurant.serviceFeePercent / 100));
  const total = cart.subtotal + tax + serviceFee;

  if (cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 pt-16 sm:px-6">
        <EmptyState
          icon={ShoppingBag}
          title="Nothing to check out"
          description="Add something from the menu before checking out."
          actionLabel="Back to menu"
          onAction={() => navigate("/demo/order")}
        />
      </div>
    );
  }

  function handlePlaceOrder() {
    setPlacing(true);
    // Simulated network latency for a realistic loading state.
    setTimeout(() => {
      const order = placeOrder({
        items: cart.items,
        tableId: cart.tableId,
        customerId: "cust_amina",
        paymentMethod: method,
      });
      cart.clear();
      showToast("Order placed — the kitchen has it now.");
      navigate(`/demo/order/track/${order.id}`);
    }, 900);
  }

  return (
    <div className="mx-auto max-w-md px-4 pt-5 pb-28 sm:px-6">
      <Link to="/demo/order" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-ink-900">
        <ArrowLeft className="size-4" /> Back to menu
      </Link>
      <h1 className="mt-3 font-display text-2xl font-semibold text-ink-950">Checkout</h1>

      <div className="mt-6">
        <p className="text-sm font-medium text-ink-950">Payment method</p>
        <div className="mt-2.5 flex flex-col gap-2">
          {METHODS.map((m) => (
            <label
              key={m.id}
              className={`flex cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] border px-4 py-3.5 transition-colors ${
                method === m.id ? "border-brass-500 bg-brass-500/[0.06]" : "border-paper-300 hover:border-slate-400"
              }`}
            >
              <input
                type="radio"
                name="payment-method"
                checked={method === m.id}
                onChange={() => setMethod(m.id)}
                className="size-4 accent-[#B1823E]"
              />
              <m.icon className="size-4.5 text-ink-700" aria-hidden="true" />
              <span>
                <span className="block text-sm font-medium text-ink-950">{m.label}</span>
                <span className="block text-xs text-slate-500">{m.helper}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-[var(--radius-md)] border border-paper-300 bg-paper-50 p-4">
        <p className="text-sm font-medium text-ink-950">Order summary</p>
        <ul className="mt-2.5 space-y-1.5 text-sm text-slate-600">
          {cart.items.map((line) => (
            <li key={line.id} className="flex justify-between">
              <span>
                {line.quantity}× {line.name}
              </span>
              <span className="tabular-nums">{formatCurrency(line.unitPrice * line.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 space-y-1 border-t border-paper-300 pt-3 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span className="tabular-nums">{formatCurrency(cart.subtotal)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Tax</span>
            <span className="tabular-nums">{formatCurrency(tax)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Service fee</span>
            <span className="tabular-nums">{formatCurrency(serviceFee)}</span>
          </div>
          <div className="flex justify-between border-t border-paper-300 pt-1.5 font-semibold text-ink-950">
            <span>Total</span>
            <span className="tabular-nums">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-4 bottom-4 sm:static sm:mt-6 sm:inset-auto">
        <Button fullWidth size="lg" loading={placing} onClick={handlePlaceOrder}>
          {method === "mpesa" ? `Pay ${formatCurrency(total)} with M-PESA` : `Place order · ${formatCurrency(total)}`}
        </Button>
      </div>
    </div>
  );
}
