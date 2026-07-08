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
      "Browse your collection by category, see what you've added most recently, and get a quick read on your bag's balance — organized the moment you scan it in.",
    exploreLabel: "See Your Vault",
  },
  {
    slug: "bags",
    name: "Bags",
    tagline: "Build a lineup, then see how it flies",
    description:
      "Create named bags for every occasion, track your stability mix at a glance, and visualize your whole lineup on a flight map before you tee off.",
    exploreLabel: "See Your Bags",
  },
  {
    slug: "rounds",
    name: "Rounds",
    tagline: "Track every throw, hole by hole",
    description:
      "Start a round, pick your bag, and log the disc you throw on every hole — building a scorecard that connects straight back to your vault.",
    exploreLabel: "See Your Rounds",
  },
  {
    slug: "explore",
    name: "Explore",
    tagline: "Follow players, showcase your vault",
    description:
      "See what other players are throwing, follow their vaults, and showcase your own favorite discs — all from your public profile.",
    exploreLabel: "Meet the Community",
  },
];
