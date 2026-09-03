import type { Restaurant } from "@/types";

/**
 * EMBER is TABLEFLOW's fictional demo restaurant, used consistently across
 * the marketing demo, customer ordering experience, and dashboard. It is
 * not a real business.
 */
export const restaurant: Restaurant = {
  id: "rest_ember",
  name: "Ember",
  tagline: "Modern contemporary kitchen",
  logoInitial: "E",
  address: "14 Riverside Drive, Nairobi",
  currency: "KES",
  serviceFeePercent: 5,
  taxPercent: 16,
};
