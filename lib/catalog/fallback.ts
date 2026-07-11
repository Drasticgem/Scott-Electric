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
  };
});
