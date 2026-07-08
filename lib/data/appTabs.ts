/**
 * The four main tabs of the DiscVault app.
 * Single source of truth for the AppTabs showcase section.
 */
export type AppTabSlug = "vault" | "bags" | "rounds" | "explore";

export interface AppTab {
  slug: AppTabSlug;
  name: string;
  tagline: string;
  description: string;
  exploreLabel: string;
}

export const APP_TABS: AppTab[] = [
  {
    slug: "vault",
    name: "Vault",
    tagline: "Every disc you own, all in one place",
    description:
      "See every disc you own, how your bag is balanced, and what you've added recently — organized the moment you add it.",
    exploreLabel: "Explore Vault",
  },
  {
    slug: "bags",
    name: "Bags",
    tagline: "Build a lineup for every round",
    description:
      "Build bags for courses, conditions, and play styles, then see how each setup actually flies before you tee off.",
    exploreLabel: "Explore Bags",
  },
  {
    slug: "rounds",
    name: "Rounds",
    tagline: "Track every throw, hole by hole",
    description:
      "Track what you throw during a round and connect every shot back to your actual bag — no more guessing what worked.",
    exploreLabel: "Explore Rounds",
  },
  {
    slug: "explore",
    name: "Explore",
    tagline: "Browse 10,000+ discs",
    description:
      "Browse discs by brand, category, and flight numbers, then save what belongs in your vault. No account required.",
    exploreLabel: "Browse Catalog",
  },
];
