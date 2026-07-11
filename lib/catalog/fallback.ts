import { CATALOG_PREVIEW } from "@/lib/data/catalogPreview";
import { buildDiscSlug, colorFromString, slugify } from "./format";
import type { PublicCatalogDisc } from "./types";

export const FALLBACK_CATALOG: PublicCatalogDisc[] = CATALOG_PREVIEW.map((disc, index) => {
  const id = `preview-${index + 1}`;
  return {
    id,
    slug: buildDiscSlug(disc.brand, disc.mold, id),
    brand: disc.brand,
    brandSlug: slugify(disc.brand),
    mold: disc.mold,
    category: disc.category,
    flightNumbers: disc.flightNumbers,
    color: disc.color || colorFromString(`${disc.brand} ${disc.mold}`),
    flightSummary: `${disc.mold} is a ${disc.category.toLowerCase()} with a ${disc.flightNumbers[0]} speed profile built for clean, confident catalog browsing in DiscVault.`,
    whatToExpect: "Use the public catalog to compare flight numbers, disc classes, and molds before adding your next disc to the bag.",
    brandContext: `${disc.brand} appears in the DiscVault catalog alongside molds from across the disc golf world.`,
  };
});
