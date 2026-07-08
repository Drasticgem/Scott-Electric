/**
 * Illustrative disc rows for the BrowseCatalog preview — mirrors the
 * real in-app Disc Database search results. Static/non-functional until
 * real /catalog routes ship in a later phase.
 */
export interface CatalogDisc {
  brand: string;
  mold: string;
  category: string;
  /** [speed, glide, turn, fade] */
  flightNumbers: [number, number, number, number];
  color: string;
}

export const CATALOG_PREVIEW: CatalogDisc[] = [
  {
    brand: "Axiom Discs",
    mold: "Time-Lapse",
    category: "Distance Driver",
    flightNumbers: [12, 5, -1, 3],
    color: "#e0954a",
  },
  {
    brand: "Axiom Discs",
    mold: "Pyro",
    category: "Midrange",
    flightNumbers: [5, 4, 0, 2.5],
    color: "#4a7de0",
  },
  {
    brand: "Axiom Discs",
    mold: "Balance",
    category: "Midrange",
    flightNumbers: [5, 5, 0, 2],
    color: "#8a8f98",
  },
  {
    brand: "Axiom Discs",
    mold: "Envy",
    category: "Putter",
    flightNumbers: [3, 3, 0, 2],
    color: "#4aa8c8",
  },
  {
    brand: "Axiom Discs",
    mold: "Pitch",
    category: "Putter",
    flightNumbers: [1, 7, -0.5, 0],
    color: "#c0392b",
  },
];
