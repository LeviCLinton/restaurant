import type { LoyaltyReward } from "@/types";

export const loyaltyRewards: LoyaltyReward[] = [
  { id: "rw_drink", name: "Free Drink", pointsRequired: 100, description: "Any soft drink or juice on the menu." },
  { id: "rw_dessert", name: "Free Dessert", pointsRequired: 200, description: "Any dessert on the menu." },
  { id: "rw_burger", name: "Free Burger", pointsRequired: 300, description: "Any burger, dine-in or pickup." },
  { id: "rw_platter", name: "Free Nyama Choma Platter", pointsRequired: 600, description: "Our signature platter, on the house." },
];
