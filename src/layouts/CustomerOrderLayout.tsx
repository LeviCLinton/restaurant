import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { IconButton } from "@/components/ui";
import { CartSheet } from "@/components/order/CartSheet";
import { useCart } from "@/context/CartContext";
import { tables } from "@/data";

export function CustomerOrderLayout() {
  const [cartOpen, setCartOpen] = useState(false);
  const cart = useCart();
  const table = tables.find((t) => t.id === cart.tableId);

  return (
    <div className="min-h-screen bg-paper-50 pb-24">
      <header className="sticky top-0 z-40 border-b border-paper-300 bg-paper-50/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
          <Link to="/demo" aria-label="Back to demo picker" className="flex items-center gap-2 text-ink-900">
            <ArrowLeft className="size-4 text-slate-400" aria-hidden="true" />
            <Logo />
          </Link>
          <IconButton aria-label={`View cart, ${cart.itemCount} items`} onClick={() => setCartOpen(true)} className="relative">
            <ShoppingBag className="size-5" />
            {cart.itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex size-4.5 min-w-[1.125rem] items-center justify-center rounded-full bg-brass-500 px-1 text-[0.625rem] font-semibold text-ink-950">
                {cart.itemCount}
              </span>
            )}
          </IconButton>
        </div>
        {table && (
          <div className="border-t border-paper-300 bg-brass-500/[0.08] px-4 py-1.5 text-center text-xs font-medium text-brass-700 sm:px-6">
            You're ordering from Table {table.label.replace("T0", "").replace("T", "")}
          </div>
        )}
      </header>

      <Outlet />

      {cart.itemCount > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed inset-x-4 bottom-4 z-30 flex items-center justify-between rounded-[var(--radius-md)] bg-ink-950 px-5 py-4 text-paper-50 shadow-[var(--shadow-raised)] transition-transform active:scale-[0.98] sm:mx-auto sm:max-w-md"
        >
          <span className="flex items-center gap-2 text-sm font-medium">
            <ShoppingBag className="size-4" aria-hidden="true" />
            View order · {cart.itemCount} item{cart.itemCount > 1 ? "s" : ""}
          </span>
          <span className="font-mono text-sm font-semibold tabular-nums">
            {new Intl.NumberFormat("en-KE").format(cart.subtotal)} KSh
          </span>
        </button>
      )}

      <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
