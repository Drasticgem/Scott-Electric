import { getSupabaseServerClient } from "@/lib/supabase/server";
import { FALLBACK_CATALOG } from "./fallback";
import { buildDiscSlug, colorFromString, slugify } from "./format";
import type { CatalogSearchParams, FlightNumbers, PublicCatalogDisc } from "./types";

type CatalogRow = Record<string, unknown>;
type SupabaseClient = NonNullable<ReturnType<typeof getSupabaseServerClient>>;
type BrandLogoMap = Record<string, string>;

const TABLE_NAME = process.env.SUPABASE_CATALOG_TABLE || "discs";
const BRANDS_TABLE_NAME = process.env.SUPABASE_BRANDS_TABLE || "brands";
const DISC_CONTEXTS_TABLE_NAME = process.env.SUPABASE_DISC_CONTEXTS_TABLE || "disc_contexts";
const BRAND_CONTEXTS_TABLE_NAME = process.env.SUPABASE_BRAND_CONTEXTS_TABLE || "brand_contexts";
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

// discs.brand_slug has no formal foreign key to brands.slug, so PostgREST
// can't embed the join — fetch the small brands table once per request and
// look logos up by slug instead.
async function getBrandLogoMap(supabase: SupabaseClient): Promise<BrandLogoMap> {
  const { data, error } = await supabase.from(BRANDS_TABLE_NAME).select("slug,logo_url");
  if (error || !data) return {};

  const map: BrandLogoMap = {};
  for (const row of data as CatalogRow[]) {
    const slug = asString(row, ["slug"]);
    const logoUrl = asString(row, ["logo_url"]);
    if (slug && logoUrl) map[slug] = logoUrl;
  }
  return map;
}

// Detail-page-only content — a disc's write-up (disc_contexts) and its
// brand's write-up (brand_contexts). Not fetched for list/search results,
// which never render this text. Each has several rotating content
// variations per disc/brand (a "version" column) — always take the lowest
// version present so the public page reads the same copy on every visit
// instead of a random variant.
async function getDiscContext(supabase: SupabaseClient, brand: string, mold: string) {
  const { data } = await supabase
    .from(DISC_CONTEXTS_TABLE_NAME)
    .select("disc_summary,what_to_expect,brand_context")
    .eq("brand", brand)
    .eq("mold_name", mold)
    .order("version", { ascending: true })
    .limit(1)
    .maybeSingle();
  return (data as CatalogRow | null) ?? null;
}

async function getBrandContext(supabase: SupabaseClient, brand: string) {
  const { data } = await supabase
    .from(BRAND_CONTEXTS_TABLE_NAME)
    .select("brand_context")
    .eq("brand", brand)
    .order("version", { ascending: true })
    .limit(1)
    .maybeSingle();
  return (data as CatalogRow | null) ?? null;
}

function normalizeDisc(row: CatalogRow, index: number, brandLogos: BrandLogoMap): PublicCatalogDisc {
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
  const brandSlug = asString(row, ["brand_slug"], slugify(brand));

  return {
    id,
    slug,
    brand,
    brandSlug,
    mold,
    category,
    flightNumbers,
    imageUrl: asNullableString(row, ["image_url", "disc_image_url", "image", "photo_url"]),
    brandLogoUrl: brandLogos[brandSlug] ?? null,
    flightChartImage: asNullableString(row, ["flight_chart_image"]),
    color,
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

  // List/grid results never render a brand logo, so skip that lookup here.
  return data.map((row, index) => normalizeDisc(row, index, {}));
}

export async function getCatalogDiscBySlug(slug: string) {
  const fallback = FALLBACK_CATALOG.find((disc) => disc.slug === slug || disc.id === slug);
  const supabase = getSupabaseServerClient();
  if (!supabase) return fallback ?? null;

  const { data, error } = await supabase.from(TABLE_NAME).select(SELECT_COLUMNS).eq("id", slug).limit(1).maybeSingle();
  if (error || !data) return fallback ?? null;

  const disc = normalizeDisc(data, 0, {});
  const [brandLogos, discContext, brandContext] = await Promise.all([
    getBrandLogoMap(supabase),
    getDiscContext(supabase, disc.brand, disc.mold),
    getBrandContext(supabase, disc.brand),
  ]);

  return {
    ...disc,
    brandLogoUrl: brandLogos[disc.brandSlug] ?? null,
    flightSummary: asNullableString(discContext ?? {}, ["disc_summary"]),
    whatToExpect: asNullableString(discContext ?? {}, ["what_to_expect"]),
    brandContext: asNullableString(brandContext ?? {}, ["brand_context"]) ?? asNullableString(discContext ?? {}, ["brand_context"]),
  };
}
