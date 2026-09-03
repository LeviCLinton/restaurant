import { createContext, useCallback, useContext, useMemo, useReducer, type ReactNode } from "react";
import type { OrderLineItem } from "@/types";

interface CartState {
  items: OrderLineItem[];
  tableId: string;
}

type Action =
  | { type: "ADD"; item: OrderLineItem }
  | { type: "REMOVE"; lineId: string }
  | { type: "SET_QTY"; lineId: string; quantity: number }
  | { type: "CLEAR" };

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD":
      return { ...state, items: [...state.items, action.item] };
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.id !== action.lineId) };
    case "SET_QTY":
      return {
        ...state,
        items: state.items
          .map((i) => (i.id === action.lineId ? { ...i, quantity: action.quantity } : i))
          .filter((i) => i.quantity > 0),
      };
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}

interface CartValue {
  items: OrderLineItem[];
  tableId: string;
  addItem: (item: Omit<OrderLineItem, "id">) => void;
  removeItem: (lineId: string) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  clear: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children, tableId = "t14" }: { children: ReactNode; tableId?: string }) {
  const [state, dispatch] = useReducer(reducer, { items: [], tableId });

  const addItem = useCallback((item: Omit<OrderLineItem, "id">) => {
    dispatch({ type: "ADD", item: { ...item, id: `li_${Date.now()}_${Math.random().toString(36).slice(2, 7)}` } });
  }, []);
  const removeItem = useCallback((lineId: string) => dispatch({ type: "REMOVE", lineId }), []);
  const setQuantity = useCallback(
    (lineId: string, quantity: number) => dispatch({ type: "SET_QTY", lineId, quantity }),
    []
  );
  const clear = useCallback(() => dispatch({ type: "CLEAR" }), []);

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);

  const value = useMemo<CartValue>(
    () => ({ ...state, addItem, removeItem, setQuantity, clear, itemCount, subtotal }),
    [state, addItem, removeItem, setQuantity, clear, itemCount, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
