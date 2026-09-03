/**
 * TABLEFLOW domain model.
 *
 * These types are the single source of truth for shape of data across the
 * customer experience, the restaurant dashboard, and the kitchen display.
 * Mock data (src/data) and future real API responses must both conform to
 * these types, so swapping services/* implementations later requires no
 * changes to components.
 */

export type Currency = "KES";

export interface Restaurant {
  id: string;
  name: string;
  tagline: string;
  logoInitial: string;
  address: string;
  currency: Currency;
  serviceFeePercent: number;
  taxPercent: number;
}

export type DietaryTag = "vegetarian" | "vegan" | "gluten-free" | "spicy" | "dairy-free";

export interface MenuCategory {
  id: string;
  name: string;
  sortOrder: number;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  imageQuery: string;
  dietaryTags: DietaryTag[];
  ingredients: string[];
  allergens: string[];
  isPopular: boolean;
  isAvailable: boolean;
  customizations?: MenuItemCustomization[];
}

export interface MenuItemCustomization {
  id: string;
  label: string;
  options: { id: string; label: string; priceDelta: number }[];
  required: boolean;
  multiSelect: boolean;
}

export type TableStatus = "available" | "occupied" | "reserved" | "attention";

export interface RestaurantTable {
  id: string;
  label: string;
  seats: number;
  status: TableStatus;
  zone: string;
  currentOrderId?: string;
  reservationId?: string;
  x: number;
  y: number;
}

export type OrderStatus = "new" | "preparing" | "ready" | "served" | "completed" | "cancelled";
export type OrderSource = "table" | "pickup" | "delivery";
export type PaymentMethod = "card" | "mpesa" | "cash";
export type PaymentStatus = "pending" | "paid" | "failed";

export interface OrderLineItem {
  id: string;
  menuItemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  selectedOptions: string[];
  specialInstructions?: string;
}

export interface OrderStatusEvent {
  status: OrderStatus;
  at: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  restaurantId: string;
  tableId?: string;
  customerId?: string;
  source: OrderSource;
  items: OrderLineItem[];
  status: OrderStatus;
  statusHistory: OrderStatusEvent[];
  subtotal: number;
  tax: number;
  serviceFee: number;
  total: number;
  paymentMethod?: PaymentMethod;
  paymentStatus: PaymentStatus;
  placedAt: string;
  notes?: string;
}

export type ReservationStatus = "pending" | "confirmed" | "seated" | "completed" | "cancelled" | "no-show";

export interface Reservation {
  id: string;
  customerId: string;
  customerName: string;
  partySize: number;
  date: string;
  time: string;
  tableId?: string;
  status: ReservationStatus;
  notes?: string;
  createdAt: string;
}

export type CustomerSegment = "new" | "regular" | "vip" | "at-risk";

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  segment: CustomerSegment;
  totalOrders: number;
  totalSpent: number;
  averageOrder: number;
  favoriteItemId?: string;
  lastVisitAt: string;
  loyaltyPoints: number;
}

export interface LoyaltyReward {
  id: string;
  name: string;
  pointsRequired: number;
  description: string;
}

export interface Feedback {
  id: string;
  orderId: string;
  customerId?: string;
  rating: number;
  categories: Partial<Record<"food" | "service" | "speed" | "cleanliness" | "payment", number>>;
  comment?: string;
  createdAt: string;
}

export type NotificationType =
  | "new-order"
  | "reservation"
  | "low-inventory"
  | "feedback"
  | "vip-visit"
  | "payment";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
}

export interface RevenuePoint {
  date: string;
  revenue: number;
  orders: number;
}

export interface AiInsight {
  id: string;
  insight: string;
  reason: string;
  recommendation: string;
}
