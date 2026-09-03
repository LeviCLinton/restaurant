import { createContext, useCallback, useContext, useMemo, useReducer, type ReactNode } from "react";
import type {
  AppNotification,
  Customer,
  Feedback,
  MenuItem,
  Order,
  OrderStatus,
  Reservation,
  ReservationStatus,
  RestaurantTable,
  TableStatus,
} from "@/types";
import {
  menuItems as initialMenuItems,
  tables as initialTables,
  orders as initialOrders,
  customers as initialCustomers,
  reservations as initialReservations,
  notifications as initialNotifications,
} from "@/data";
import { applyOrderToCustomer, buildOrder, pointsForOrder } from "@/services";
import type { OrderLineItem } from "@/types";

interface AppState {
  menuItems: MenuItem[];
  tables: RestaurantTable[];
  orders: Order[];
  customers: Customer[];
  reservations: Reservation[];
  notifications: AppNotification[];
  feedback: Feedback[];
}

type Action =
  | { type: "TOGGLE_MENU_AVAILABILITY"; itemId: string }
  | { type: "UPDATE_MENU_ITEM"; item: MenuItem }
  | { type: "ADD_MENU_ITEM"; item: MenuItem }
  | { type: "SET_TABLE_STATUS"; tableId: string; status: TableStatus }
  | { type: "PLACE_ORDER"; order: Order }
  | { type: "SET_ORDER_STATUS"; orderId: string; status: OrderStatus }
  | { type: "ADD_RESERVATION"; reservation: Reservation }
  | { type: "SET_RESERVATION_STATUS"; reservationId: string; status: ReservationStatus }
  | { type: "MARK_NOTIFICATION_READ"; id: string }
  | { type: "MARK_ALL_NOTIFICATIONS_READ" }
  | { type: "ADD_NOTIFICATION"; notification: AppNotification }
  | { type: "ADD_FEEDBACK"; feedback: Feedback };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "TOGGLE_MENU_AVAILABILITY":
      return {
        ...state,
        menuItems: state.menuItems.map((m) =>
          m.id === action.itemId ? { ...m, isAvailable: !m.isAvailable } : m
        ),
      };
    case "UPDATE_MENU_ITEM":
      return { ...state, menuItems: state.menuItems.map((m) => (m.id === action.item.id ? action.item : m)) };
    case "ADD_MENU_ITEM":
      return { ...state, menuItems: [action.item, ...state.menuItems] };
    case "SET_TABLE_STATUS":
      return {
        ...state,
        tables: state.tables.map((t) => (t.id === action.tableId ? { ...t, status: action.status } : t)),
      };
    case "PLACE_ORDER": {
      const notification: AppNotification = {
        id: `note_${Date.now()}`,
        type: "new-order",
        title: `New order — Table ${action.order.tableId?.replace("t", "") ?? "?"}`,
        body: `Order #${action.order.orderNumber} just came in.`,
        createdAt: action.order.placedAt,
        read: false,
      };
      return {
        ...state,
        orders: [action.order, ...state.orders],
        tables: action.order.tableId
          ? state.tables.map((t) =>
              t.id === action.order.tableId
                ? { ...t, status: "occupied", currentOrderId: action.order.id }
                : t
            )
          : state.tables,
        notifications: [notification, ...state.notifications],
      };
    }
    case "SET_ORDER_STATUS": {
      const order = state.orders.find((o) => o.id === action.orderId);
      if (!order) return state;
      const now = new Date().toISOString();
      const updatedOrder: Order = {
        ...order,
        status: action.status,
        statusHistory: [...order.statusHistory, { status: action.status, at: now }],
        paymentStatus: action.status === "completed" ? "paid" : order.paymentStatus,
      };

      let customers = state.customers;
      let tables = state.tables;

      if (action.status === "completed") {
        const customer = state.customers.find((c) => c.id === order.customerId);
        if (customer) {
          customers = state.customers.map((c) =>
            c.id === customer.id ? applyOrderToCustomer(c, updatedOrder) : c
          );
        }
        if (order.tableId) {
          tables = state.tables.map((t) =>
            t.id === order.tableId ? { ...t, status: "available", currentOrderId: undefined } : t
          );
        }
      }

      return {
        ...state,
        orders: state.orders.map((o) => (o.id === order.id ? updatedOrder : o)),
        customers,
        tables,
      };
    }
    case "ADD_RESERVATION": {
      const notification: AppNotification = {
        id: `note_${Date.now()}`,
        type: "reservation",
        title: "New reservation",
        body: `${action.reservation.customerName} requested a table for ${action.reservation.partySize} on ${action.reservation.date} at ${action.reservation.time}.`,
        createdAt: action.reservation.createdAt,
        read: false,
      };
      return {
        ...state,
        reservations: [action.reservation, ...state.reservations],
        notifications: [notification, ...state.notifications],
      };
    }
    case "SET_RESERVATION_STATUS": {
      const reservation = state.reservations.find((r) => r.id === action.reservationId);
      let tables = state.tables;
      if (reservation?.tableId) {
        if (action.status === "seated") {
          tables = state.tables.map((t) =>
            t.id === reservation.tableId ? { ...t, status: "occupied" } : t
          );
        } else if (action.status === "completed" || action.status === "cancelled" || action.status === "no-show") {
          tables = state.tables.map((t) =>
            t.id === reservation.tableId ? { ...t, status: "available" } : t
          );
        } else if (action.status === "confirmed") {
          tables = state.tables.map((t) =>
            t.id === reservation.tableId ? { ...t, status: "reserved" } : t
          );
        }
      }
      return {
        ...state,
        tables,
        reservations: state.reservations.map((r) =>
          r.id === action.reservationId ? { ...r, status: action.status } : r
        ),
      };
    }
    case "MARK_NOTIFICATION_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) => (n.id === action.id ? { ...n, read: true } : n)),
      };
    case "MARK_ALL_NOTIFICATIONS_READ":
      return { ...state, notifications: state.notifications.map((n) => ({ ...n, read: true })) };
    case "ADD_NOTIFICATION":
      return { ...state, notifications: [action.notification, ...state.notifications] };
    case "ADD_FEEDBACK": {
      const notification: AppNotification = {
        id: `note_${Date.now()}`,
        type: "feedback",
        title: "New feedback",
        body: `A guest left a ${action.feedback.rating}-star review.`,
        createdAt: action.feedback.createdAt,
        read: false,
      };
      return {
        ...state,
        feedback: [action.feedback, ...state.feedback],
        notifications: [notification, ...state.notifications],
      };
    }
    default:
      return state;
  }
}

const initialState: AppState = {
  menuItems: initialMenuItems,
  tables: initialTables,
  orders: initialOrders,
  customers: initialCustomers,
  reservations: initialReservations,
  notifications: initialNotifications,
  feedback: [],
};

interface AppStoreValue extends AppState {
  toggleMenuAvailability: (itemId: string) => void;
  updateMenuItem: (item: MenuItem) => void;
  addMenuItem: (item: MenuItem) => void;
  setTableStatus: (tableId: string, status: TableStatus) => void;
  placeOrder: (params: {
    items: OrderLineItem[];
    tableId?: string;
    customerId?: string;
    paymentMethod?: Order["paymentMethod"];
    notes?: string;
  }) => Order;
  setOrderStatus: (orderId: string, status: OrderStatus) => void;
  addReservation: (reservation: Reservation) => void;
  setReservationStatus: (reservationId: string, status: ReservationStatus) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addFeedback: (feedback: Feedback) => void;
  pointsForOrder: (total: number) => number;
}

const AppStoreContext = createContext<AppStoreValue | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleMenuAvailability = useCallback((itemId: string) => dispatch({ type: "TOGGLE_MENU_AVAILABILITY", itemId }), []);
  const updateMenuItem = useCallback((item: MenuItem) => dispatch({ type: "UPDATE_MENU_ITEM", item }), []);
  const addMenuItem = useCallback((item: MenuItem) => dispatch({ type: "ADD_MENU_ITEM", item }), []);
  const setTableStatus = useCallback(
    (tableId: string, status: TableStatus) => dispatch({ type: "SET_TABLE_STATUS", tableId, status }),
    []
  );
  const placeOrder = useCallback(
    (params: {
      items: OrderLineItem[];
      tableId?: string;
      customerId?: string;
      paymentMethod?: Order["paymentMethod"];
      notes?: string;
    }) => {
      const order = buildOrder({
        items: params.items,
        tableId: params.tableId,
        customerId: params.customerId,
        restaurantId: "rest_ember",
        taxPercent: 16,
        serviceFeePercent: 5,
        paymentMethod: params.paymentMethod,
        notes: params.notes,
      });
      dispatch({ type: "PLACE_ORDER", order });
      return order;
    },
    []
  );
  const setOrderStatus = useCallback(
    (orderId: string, status: OrderStatus) => dispatch({ type: "SET_ORDER_STATUS", orderId, status }),
    []
  );
  const addReservation = useCallback(
    (reservation: Reservation) => dispatch({ type: "ADD_RESERVATION", reservation }),
    []
  );
  const setReservationStatus = useCallback(
    (reservationId: string, status: ReservationStatus) =>
      dispatch({ type: "SET_RESERVATION_STATUS", reservationId, status }),
    []
  );
  const markNotificationRead = useCallback((id: string) => dispatch({ type: "MARK_NOTIFICATION_READ", id }), []);
  const markAllNotificationsRead = useCallback(() => dispatch({ type: "MARK_ALL_NOTIFICATIONS_READ" }), []);
  const addFeedback = useCallback((feedback: Feedback) => dispatch({ type: "ADD_FEEDBACK", feedback }), []);

  const value = useMemo<AppStoreValue>(
    () => ({
      ...state,
      toggleMenuAvailability,
      updateMenuItem,
      addMenuItem,
      setTableStatus,
      placeOrder,
      setOrderStatus,
      addReservation,
      setReservationStatus,
      markNotificationRead,
      markAllNotificationsRead,
      addFeedback,
      pointsForOrder,
    }),
    [
      state,
      toggleMenuAvailability,
      updateMenuItem,
      addMenuItem,
      setTableStatus,
      placeOrder,
      setOrderStatus,
      addReservation,
      setReservationStatus,
      markNotificationRead,
      markAllNotificationsRead,
      addFeedback,
    ]
  );

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
}

export function useAppStore(): AppStoreValue {
  const ctx = useContext(AppStoreContext);
  if (!ctx) throw new Error("useAppStore must be used within AppStoreProvider");
  return ctx;
}
