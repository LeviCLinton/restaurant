import type { RestaurantTable } from "@/types";

export const tables: RestaurantTable[] = [
  { id: "t01", label: "T01", seats: 2, status: "available", zone: "Window", x: 8, y: 10 },
  { id: "t02", label: "T02", seats: 2, status: "occupied", zone: "Window", x: 8, y: 30 },
  { id: "t03", label: "T03", seats: 4, status: "reserved", zone: "Window", reservationId: "res_1", x: 8, y: 50 },
  { id: "t04", label: "T04", seats: 4, status: "available", zone: "Main", x: 32, y: 10 },
  { id: "t05", label: "T05", seats: 4, status: "occupied", zone: "Main", currentOrderId: "ord_105", x: 32, y: 30 },
  { id: "t06", label: "T06", seats: 6, status: "attention", zone: "Main", currentOrderId: "ord_106", x: 32, y: 50 },
  { id: "t07", label: "T07", seats: 2, status: "available", zone: "Main", x: 32, y: 70 },
  { id: "t08", label: "T08", seats: 4, status: "occupied", zone: "Patio", currentOrderId: "ord_107", x: 58, y: 10 },
  { id: "t09", label: "T09", seats: 2, status: "available", zone: "Patio", x: 58, y: 30 },
  { id: "t10", label: "T10", seats: 8, status: "reserved", zone: "Patio", reservationId: "res_2", x: 58, y: 50 },
  { id: "t11", label: "T11", seats: 4, status: "available", zone: "Bar", x: 82, y: 10 },
  { id: "t12", label: "T12", seats: 2, status: "occupied", zone: "Bar", currentOrderId: "ord_108", x: 82, y: 30 },
  { id: "t13", label: "T13", seats: 2, status: "available", zone: "Bar", x: 82, y: 50 },
  { id: "t14", label: "T14", seats: 4, status: "occupied", zone: "Main", currentOrderId: "ord_104", x: 32, y: 90 },
];
