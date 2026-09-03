import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { useAppStore } from "@/context/AppStoreContext";
import { useToast } from "@/context/ToastContext";
import { Button, EmptyState } from "@/components/ui";
import { formatCurrency } from "@/lib/utils";
import type { OrderStatus } from "@/types";

const STEPS: { status: OrderStatus; label: string }[] = [
  { status: "new", label: "Order received" },
  { status: "preparing", label: "Preparing" },
  { status: "ready", label: "Ready" },
  { status: "served", label: "Served" },
  { status: "completed", label: "Completed" },
];

function FeedbackForm({ orderId }: { orderId: string }) {
  const { addFeedback } = useAppStore();
  const { showToast } = useToast();
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="mt-6 rounded-[var(--radius-md)] border border-status-success/30 bg-status-success-bg px-4 py-3 text-center text-sm text-status-success">
        Thanks for the feedback — it helps Ember improve.
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-[var(--radius-md)] border border-paper-300 bg-paper-50 p-5 text-center">
      <p className="font-display text-base font-semibold text-ink-950">How was your experience?</p>
      <div className="mt-3 flex justify-center gap-1.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            onClick={() => setRating(n)}
            className="p-1"
          >
            <Star
              className={`size-7 transition-colors ${n <= rating ? "fill-brass-500 text-brass-500" : "text-paper-300"}`}
            />
          </button>
        ))}
      </div>
      <Button
        className="mt-4"
        size="sm"
        disabled={rating === 0}
        onClick={() => {
          addFeedback({
            id: `fb_${Date.now()}`,
            orderId,
            rating,
            categories: {},
            createdAt: new Date().toISOString(),
          });
          showToast("Feedback submitted");
          setSubmitted(true);
        }}
      >
        Submit
      </Button>
    </div>
  );
}

export function OrderTrackingPage() {
  const { orderId } = useParams();
  const { orders } = useAppStore();
  const order = orders.find((o) => o.id === orderId);

  useSeo({
    title: order ? `Order #${order.orderNumber}` : "Order tracking",
    description: "Track your order status live.",
    path: `/demo/order/track/${orderId ?? ""}`,
  });

  if (!order) {
    return (
      <div className="mx-auto max-w-md px-4 pt-16 sm:px-6">
        <EmptyState
          icon={Check}
          title="Order not found"
          description="This order may have already been completed or the link is incorrect."
          actionLabel="Back to menu"
          onAction={() => (window.location.href = "/demo/order")}
        />
      </div>
    );
  }

  const currentIndex = STEPS.findIndex((s) => s.status === order.status);

  return (
    <div className="mx-auto max-w-md px-4 pt-8 pb-16 sm:px-6">
      <div className="text-center">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Order</p>
        <h1 className="mt-1 font-mono text-3xl font-semibold tabular-nums text-ink-950">#{order.orderNumber}</h1>
        <p className="mt-1 text-sm text-slate-500">
          Table {order.tableId?.replace("t", "").replace(/^0/, "")} · {formatCurrency(order.total)}
        </p>
      </div>

      <ol className="mt-8 flex flex-col gap-0">
        {STEPS.map((step, i) => {
          const done = i <= currentIndex;
          const isCurrent = i === currentIndex;
          return (
            <li key={step.status} className="flex gap-3">
              <div className="flex flex-col items-center">
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor: done ? "#B1823E" : "#ECE6D6",
                    scale: isCurrent ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex size-7 items-center justify-center rounded-full"
                >
                  {done && <Check className="size-4 text-ink-950" />}
                </motion.div>
                {i < STEPS.length - 1 && (
                  <div className={`w-0.5 flex-1 ${i < currentIndex ? "bg-brass-500" : "bg-paper-300"}`} style={{ minHeight: 28 }} />
                )}
              </div>
              <div className="pb-7">
                <p className={`text-sm font-medium ${done ? "text-ink-950" : "text-slate-400"}`}>{step.label}</p>
                {isCurrent && <p className="text-xs text-brass-600">In progress</p>}
              </div>
            </li>
          );
        })}
      </ol>

      <div className="rounded-[var(--radius-md)] border border-paper-300 bg-paper-50 p-4">
        <p className="text-sm font-medium text-ink-950">Order items</p>
        <ul className="mt-2 space-y-1 text-sm text-slate-600">
          {order.items.map((line) => (
            <li key={line.id} className="flex justify-between">
              <span>
                {line.quantity}× {line.name}
              </span>
              <span className="tabular-nums">{formatCurrency(line.unitPrice * line.quantity)}</span>
            </li>
          ))}
        </ul>
      </div>

      {(order.status === "served" || order.status === "completed") && <FeedbackForm orderId={order.id} />}

      <Link to="/demo/order" className="mt-6 block text-center text-sm font-medium text-brass-600 hover:text-brass-700">
        Order something else
      </Link>
    </div>
  );
}
