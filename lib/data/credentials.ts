/**
 * Trust badges. Shared between the hero trust row and the WhyDiscVault
 * section badges.
 */
export interface Credential {
  value: string;
  /** Display the value slightly smaller (used for multi-line values). */
  smallValue?: boolean;
  title: string;
  sub: string;
  /** Short label for the hero trust row pill. */
  shortLabel: string;
}

export const CREDENTIALS: Credential[] = [
  {
    value: "1K+",
    title: "Discs Cataloged",
    sub: "Growing every week",
    shortLabel: "1,000+ Discs",
  },
  {
    value: "Free",
    title: "Browse Without an Account",
    sub: "No sign-in required to explore",
    shortLabel: "No Sign-In Required",
  },
  {
    value: "iOS",
    title: "Built for iPhone",
    sub: "Designed for on-course use",
    shortLabel: "Built for iPhone",
  },
];
