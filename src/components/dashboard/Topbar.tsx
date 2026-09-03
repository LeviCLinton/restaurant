import { useState, useRef, useEffect } from "react";
import { Bell, Search, HelpCircle, ChevronDown } from "lucide-react";
import { IconButton, StatusPill } from "@/components/ui";
import { useAppStore } from "@/context/AppStoreContext";
import { restaurant } from "@/data";
import { elapsedSince } from "@/lib/utils";
import type { NotificationType } from "@/types";

const TYPE_LABEL: Record<NotificationType, string> = {
  "new-order": "New order",
  reservation: "Reservation",
  "low-inventory": "Inventory",
  feedback: "Feedback",
  "vip-visit": "VIP visit",
  payment: "Payment",
};

export function Topbar() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAppStore();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-paper-300 bg-paper-50/95 px-4 backdrop-blur-md sm:px-6">
      <button className="flex items-center gap-2 rounded-[var(--radius-sm)] border border-paper-300 px-3 py-2 text-sm font-medium text-ink-900 hover:bg-paper-100">
        <span className="flex size-6 items-center justify-center rounded-[var(--radius-xs)] bg-brass-500 text-xs font-semibold text-ink-950">
          {restaurant.logoInitial}
        </span>
        <span className="hidden sm:inline">{restaurant.name}</span>
        <ChevronDown className="size-3.5 text-slate-400" />
      </button>

      <div className="relative hidden max-w-sm flex-1 sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder="Search orders, tables, customers…"
          aria-label="Search"
          className="h-10 w-full rounded-[var(--radius-sm)] border border-paper-300 bg-paper-50 pl-9 pr-3 text-sm text-ink-950 placeholder:text-slate-400 focus:border-brass-500 focus:outline-none focus:ring-2 focus:ring-brass-500/40"
        />
      </div>

      <div className="flex items-center gap-1">
        <IconButton aria-label="Help">
          <HelpCircle className="size-5" />
        </IconButton>
        <div className="relative" ref={panelRef}>
          <IconButton aria-label={`Notifications, ${unread} unread`} onClick={() => setOpen((v) => !v)} className="relative">
            <Bell className="size-5" />
            {unread > 0 && (
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-status-attention" />
            )}
          </IconButton>
          {open && (
            <div
              role="menu"
              className="absolute right-0 top-12 z-40 w-80 rounded-[var(--radius-md)] border border-paper-300 bg-paper-50 shadow-[var(--shadow-raised)]"
            >
              <div className="flex items-center justify-between border-b border-paper-300 px-4 py-3">
                <p className="text-sm font-semibold text-ink-950">Notifications</p>
                {unread > 0 && (
                  <button onClick={markAllNotificationsRead} className="text-xs font-medium text-brass-600 hover:text-brass-700">
                    Mark all read
                  </button>
                )}
              </div>
              <ul className="max-h-80 overflow-y-auto">
                {notifications.slice(0, 8).map((n) => (
                  <li key={n.id}>
                    <button
                      onClick={() => markNotificationRead(n.id)}
                      className={`flex w-full flex-col items-start gap-1 border-b border-paper-200 px-4 py-3 text-left last:border-0 hover:bg-paper-100 ${
                        n.read ? "" : "bg-brass-500/[0.05]"
                      }`}
                    >
                      <div className="flex w-full items-center justify-between gap-2">
                        <StatusPill status={n.read ? "completed" : "warning"} label={TYPE_LABEL[n.type]} size="sm" />
                        <span className="text-[0.6875rem] text-slate-400">{elapsedSince(n.createdAt)} ago</span>
                      </div>
                      <p className="text-sm font-medium text-ink-950">{n.title}</p>
                      <p className="text-xs text-slate-500">{n.body}</p>
                    </button>
                  </li>
                ))}
                {notifications.length === 0 && (
                  <p className="px-4 py-8 text-center text-sm text-slate-500">No notifications yet.</p>
                )}
              </ul>
            </div>
          )}
        </div>
        <div className="ml-1 flex size-9 items-center justify-center rounded-full bg-ink-950 text-xs font-semibold text-paper-50">
          MK
        </div>
      </div>
    </header>
  );
}
