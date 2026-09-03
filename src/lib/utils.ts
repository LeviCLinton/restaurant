import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names and resolve Tailwind conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as Kenyan Shillings, e.g. 184500 -> "KSh 184,500". */
export function formatCurrency(amount: number): string {
  return `KSh ${Math.round(amount).toLocaleString("en-KE")}`;
}

/** Format a percentage change with a leading sign, e.g. 14.2 -> "+14.2%". */
export function formatChange(percent: number): string {
  const sign = percent > 0 ? "+" : "";
  return `${sign}${percent.toFixed(1)}%`;
}

/** Relative elapsed time from a past ISO timestamp, e.g. "8 min ago". */
export function elapsedSince(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
}
