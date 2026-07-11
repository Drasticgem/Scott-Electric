import { getSupabaseServerClient } from "@/lib/supabase/server";
import { FALLBACK_CATALOG } from "./fallback";
import { buildDiscSlug, colorFromString, slugify } from "./format";
import type { CatalogSearchParams, FlightNumbers, PublicCatalogDisc } from "./types";

type CatalogRow = Record<string, unknown>;

const TABLE_NAME = process.env.SUPABASE_CATALOG_TABLE || "discs";
const DEFAULT_LIMIT = 24;
const MAX_LIMIT = 60;

// Only the columns the catalog UI actually renders — not a full `select("*")`.
// Extend this list deliberately as new fields get wired into the UI.
const SELECT_COLUMNS =
  "id,brand,brand_slug,mold_name,category,speed,glide,turn,fade,image_url,color,flight_chart_image";

function asString(row: CatalogRow, keys: string[], fallback = "") {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number") return String(value);
  }
  return fallback;
}

function asNumber(row: CatalogRow, keys: string[], fallback = 0) {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string" && value.trim() && Number.isFinite(Number(value))) {
      return Number(value);
    }
  }
  return fallback;
}

function asNullableString(row: CatalogRow, keys: string[]) {
  const value = asString(row, keys);
  return value || null;
}

function normalizeDisc(row: CatalogRow, index: number): PublicCatalogDisc {
  const id = asString(row, ["id", "disc_id", "uuid"], `disc-${index + 1}`);
  const brand = asString(row, ["brand", "brand_name", "manufacturer", "manufacturer_name"], "Unknown Brand");
  const mold = asString(row, ["mold", "mold_name", "name", "disc_name"], "Unnamed Disc");
  const category = asString(row, ["category", "disc_type", "type", "class"], "Disc");
  const flightNumbers: FlightNumbers = [
    asNumber(row, ["speed"], 0),
    asNumber(row, ["glide"], 0),
    asNumber(row, ["turn"], 0),
    asNumber(row, ["fade"], 0),
  ];
  const color = asString(row, ["color", "fallback_color", "primary_color", "disc_color"], colorFromString(`${brand} ${mold}`));
  const slug = asString(row, ["slug", "disc_slug"], buildDiscSlug(brand, mold, id));

  return {
    id,
    slug,
    brand,
    brandSlug: asString(row, ["brand_slug"], slugify(brand)),
    mold,
    category,
    flightNumbers,
    imageUrl: asNullableString(row, ["image_url", "disc_image_url", "image", "photo_url"]),
    brandLogoUrl: asNullableString(row, ["brand_logo_url", "logo_url", "manufacturer_logo_url"]),
    flightChartImage: asNullableString(row, ["flight_chart_image"]),
    color,
    flightSummary: asNullableString(row, ["flight_summary", "summary", "description"]),
    whatToExpect: asNullableString(row, ["what_to_expect", "flight_notes", "expectations"]),
    brandContext: asNullableString(row, ["brand_context", "manufacturer_context"]),
  };
}

function filterFallback(query?: string, limit = DEFAULT_LIMIT) {
  const normalizedQuery = query?.trim().toLowerCase();
  const source = normalizedQuery
    ? FALLBACK_CATALOG.filter((disc) =>
        [disc.brand, disc.mold, disc.category].some((value) =>
          value.toLowerCase().includes(normalizedQuery),
        ),
      )
    : FALLBACK_CATALOG;
  return source.slice(0, limit);
}

export async function searchCatalogDiscs({ query, limit = DEFAULT_LIMIT }: CatalogSearchParams = {}) {
  const boundedLimit = Math.min(Math.max(limit, 1), MAX_LIMIT);
  const supabase = getSupabaseServerClient();
  if (!supabase) return filterFallback(query, boundedLimit);

  let request = supabase.from(TABLE_NAME).select(SELECT_COLUMNS).limit(boundedLimit);
  const term = query?.trim();

  if (term) {
    const escaped = term.replaceAll("%", "\\%").replaceAll("_", "\\_");
    request = request.or(`brand.ilike.%${escaped}%,mold_name.ilike.%${escaped}%`);
  }

  const { data, error } = await request;
  if (error || !data) {
    console.warn("Catalog Supabase query failed; using fallback catalog preview.", error?.message);
    return filterFallback(query, boundedLimit);
  }

  return data.map(normalizeDisc);
}

export async function getCatalogDiscBySlug(slug: string) {
  const fallback = FALLBACK_CATALOG.find((disc) => disc.slug === slug || disc.id === slug);
  const supabase = getSupabaseServerClient();
  if (!supabase) return fallback ?? null;

  const { data, error } = await supabase.from(TABLE_NAME).select(SELECT_COLUMNS).eq("id", slug).limit(1).maybeSingle();
  if (error || !data) return fallback ?? null;
  return normalizeDisc(data, 0);
}
