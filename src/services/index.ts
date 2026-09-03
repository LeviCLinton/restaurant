import type { Customer, MenuItem, Order, OrderLineItem, Reservation, RestaurantTable } from "@/types";

/**
 * Services hold business logic independent of how state is stored. Today
 * they're called synchronously from the store's reducer; swapping mock data
 * for a real backend later means replacing what's inside these functions
 * (making them async, calling fetch/an SDK) without touching components.
 */

let orderCounter = 108;
export function nextOrderNumber(): string {
  orderCounter += 1;
  return String(orderCounter);
}

export function buildOrder(input: {
  items: OrderLineItem[];
  tableId?: string;
  customerId?: string;
  restaurantId: string;
  taxPercent: number;
  serviceFeePercent: number;
  paymentMethod?: Order["paymentMethod"];
  notes?: string;
}): Order {
  const subtotal = input.items.reduce((sum, li) => sum + li.unitPrice * li.quantity, 0);
  const tax = Math.round(subtotal * (input.taxPercent / 100));
  const serviceFee = Math.round(subtotal * (input.serviceFeePercent / 100));
  const now = new Date().toISOString();
  return {
    id: `ord_${Date.now()}`,
    orderNumber: nextOrderNumber(),
    restaurantId: input.restaurantId,
    tableId: input.tableId,
    customerId: input.customerId,
    source: "table",
    items: input.items,
    status: "new",
    statusHistory: [{ status: "new", at: now }],
    subtotal,
    tax,
    serviceFee,
    total: subtotal + tax + serviceFee,
    paymentMethod: input.paymentMethod,
    paymentStatus: "pending",
    placedAt: now,
    notes: input.notes,
  };
}

export function isSoldOut(item: MenuItem): boolean {
  return !item.isAvailable;
}

/** Loyalty: 1 point per KSh 20 spent, rounded down. */
export function pointsForOrder(total: number): number {
  return Math.floor(total / 20);
}

export function applyOrderToCustomer(customer: Customer, order: Order): Customer {
  const totalOrders = customer.totalOrders + 1;
  const totalSpent = customer.totalSpent + order.total;
  const averageOrder = Math.round(totalSpent / totalOrders);
  const segment: Customer["segment"] =
    customer.segment === "vip" ? "vip" : totalOrders >= 10 ? "vip" : totalOrders >= 3 ? "regular" : "new";
  return {
    ...customer,
    totalOrders,
    totalSpent,
    averageOrder,
    segment,
    lastVisitAt: order.placedAt,
    loyaltyPoints: customer.loyaltyPoints + pointsForOrder(order.total),
  };
}

export function nextTableStatusOnOrderComplete(): RestaurantTable["status"] {
  return "available";
}

export function reservationToTableAssignment(reservation: Reservation): { tableId: string; status: RestaurantTable["status"] } | null {
  if (!reservation.tableId) return null;
  return { tableId: reservation.tableId, status: "reserved" };
}
