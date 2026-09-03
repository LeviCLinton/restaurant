import type { Reservation } from "@/types";

export const reservations: Reservation[] = [
  {
    id: "res_1",
    customerId: "cust_faith",
    customerName: "Faith Wambui",
    partySize: 4,
    date: new Date().toISOString().slice(0, 10),
    time: "19:30",
    tableId: "t03",
    status: "confirmed",
    createdAt: new Date().toISOString(),
  },
  {
    id: "res_2",
    customerId: "cust_amina",
    customerName: "Amina Hassan",
    partySize: 8,
    date: new Date().toISOString().slice(0, 10),
    time: "20:00",
    tableId: "t10",
    status: "confirmed",
    notes: "Birthday — requested a cake candle.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "res_3",
    customerId: "cust_brian",
    customerName: "Brian Otieno",
    partySize: 2,
    date: new Date(Date.now() + 86_400_000).toISOString().slice(0, 10),
    time: "13:00",
    status: "pending",
    createdAt: new Date().toISOString(),
  },
];
