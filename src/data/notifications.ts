import type { AppNotification } from "@/types";

const minutesAgo = (m: number) => new Date(Date.now() - m * 60_000).toISOString();

export const notifications: AppNotification[] = [
  { id: "n1", type: "new-order", title: "New order — Table 5", body: "Order #105 just came in.", createdAt: minutesAgo(2), read: false },
  { id: "n2", type: "vip-visit", title: "VIP guest seated", body: "Amina Hassan was seated at Table 14.", createdAt: minutesAgo(8), read: false },
  { id: "n3", type: "reservation", title: "New reservation", body: "Brian Otieno requested a table for 2 tomorrow at 1:00 PM.", createdAt: minutesAgo(40), read: true },
  { id: "n4", type: "feedback", title: "New feedback", body: "A guest left a 5-star review for tonight's service.", createdAt: minutesAgo(55), read: true },
  { id: "n5", type: "low-inventory", title: "Low stock warning", body: "Tilapia is running low — 6 portions left.", createdAt: minutesAgo(120), read: true },
];
