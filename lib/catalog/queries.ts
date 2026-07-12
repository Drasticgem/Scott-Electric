import { getSupabaseServerClient } from "@/lib/supabase/server";
import { FALLBACK_CATALOG } from "./fallback";
import { colorFromString, slugify } from "./format";
import { HYDRATED_DISCS } from "@/lib/data/hydratedDiscs";
import type { CatalogSearchParams, FlightNumbers, PublicCatalogDisc } from "./types";

type CatalogRow = Record<string, unknown>;
type SupabaseClient = NonNullable<ReturnType<typeof getSupabaseServerClient>>;
type BrandLogoMap = Record<string, string>;

const TABLE_NAME = process.env.SUPABASE_CATALOG_TABLE || "discs";
const BRANDS_TABLE_NAME = process.env.SUPABASE_BRANDS_TABLE || "brands";
const DISC_CONTEXTS_TABLE_NAME = process.env.SUPABASE_DISC_CONTEXTS_TABLE || "disc_contexts";
const BRAND_CONTEXTS_TABLE_NAME = process.env.SUPABASE_BRAND_CONTEXTS_TABLE || "brand_contexts";
const DEFAULT_LIMIT = 24;
const MAX_LIMIT = 100;

// The public catalog is temporarily restricted to discs with a real hydrated
// image (see lib/data/hydratedDiscs.ts) — everything else in `discs` still
// only has a color-swatch fallback, which reads as unfinished for a public
// page. HYDRATED_KEYS is for exact (brand, mold) membership checks;
// HYDRATED_MOLD_NAMES narrows the Supabase query to just candidate rows.
const HYDRATED_KEYS = new Set(HYDRATED_DISCS.map((d) => `${slugify(d.brand)}/${slugify(d.mold)}`));
const HYDRATED_MOLD_NAMES = Array.from(new Set(HYDRATED_DISCS.map((d) => d.mold)));

function isHydrated(brandSlug: string, moldSlug: string) {
  return HYDRATED_KEYS.has(`${brandSlug}/${moldSlug}`);
}

// Unbiased Fisher-Yates shuffle — used for the "randomized" default catalog
// order instead of a `.sort(() => Math.random() - 0.5)` biased shuffle.
function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

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
  const brandSlug = asString(row, ["brand_slug"], slugify(brand));

  return {
    id,
    brand,
    brandSlug,
    mold,
    moldSlug: slugify(mold),
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
    : shuffle(FALLBACK_CATALOG);
  return source.slice(0, limit);
}

export async function searchCatalogDiscs({ query, limit = DEFAULT_LIMIT }: CatalogSearchParams = {}) {
  const boundedLimit = Math.min(Math.max(limit, 1), MAX_LIMIT);
  const supabase = getSupabaseServerClient();
  if (!supabase) return filterFallback(query, boundedLimit);

  const { data, error } = await supabase.from(TABLE_NAME).select(SELECT_COLUMNS).in("mold_name", HYDRATED_MOLD_NAMES);
  if (error || !data) {
    console.warn("Catalog Supabase query failed; using fallback catalog preview.", error?.message);
    return filterFallback(query, boundedLimit);
  }

  const hydratedRows = (data as CatalogRow[]).filter((row) =>
    isHydrated(
      asString(row, ["brand_slug"]) || slugify(asString(row, ["brand"])),
      slugify(asString(row, ["mold_name"])),
    ),
  );

  const term = query?.trim().toLowerCase();
  const matched = term
    ? hydratedRows.filter((row) =>
        [asString(row, ["brand"]), asString(row, ["mold_name"])].some((value) =>
          value.toLowerCase().includes(term),
        ),
      )
    : shuffle(hydratedRows);

  // List/grid results never render a brand logo, so skip that lookup here.
  return matched.slice(0, boundedLimit).map((row, index) => normalizeDisc(row, index, {}));
}

// The public disc URL is /discs/<brand-slug>/<mold-slug> — readable and
// stable for SEO, unlike a raw row id. discs has brand_slug but no
// mold-slug column (and the DB's own name_slug has quality issues, e.g.
// trailing hyphens), so this fetches every disc for the brand (a small,
// cheap set — ~20-30 rows) and matches by slugifying mold_name in app code.
export async function getDiscByBrandAndMold(brandSlug: string, moldSlug: string) {
  if (!isHydrated(brandSlug, moldSlug)) return null;

  const fallback = FALLBACK_CATALOG.find(
    (disc) => disc.brandSlug === brandSlug && disc.moldSlug === moldSlug,
  );
  const supabase = getSupabaseServerClient();
  if (!supabase) return fallback ?? null;

  const { data, error } = await supabase.from(TABLE_NAME).select(SELECT_COLUMNS).eq("brand_slug", brandSlug);
  if (error || !data) return fallback ?? null;

  const row = (data as CatalogRow[]).find(
    (candidate) => slugify(asString(candidate, ["mold", "mold_name", "name", "disc_name"])) === moldSlug,
  );
  if (!row) return fallback ?? null;

  const disc = normalizeDisc(row, 0, {});
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

// Legacy support: the old /catalog/<id> route now 301s here once it knows
// the disc's real brand/mold slugs, in case any of those links already got
// shared or indexed. Resolves to null (404) for anything outside the
// current hydrated set, same as getDiscByBrandAndMold.
export async function getDiscRouteById(id: string) {
  const fallback = FALLBACK_CATALOG.find((disc) => disc.id === id);
  if (fallback) return { brandSlug: fallback.brandSlug, moldSlug: fallback.moldSlug };

  const supabase = getSupabaseServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase.from(TABLE_NAME).select("brand_slug,brand,mold_name").eq("id", id).limit(1).maybeSingle();
  if (error || !data) return null;

  const row = data as CatalogRow;
  const brandSlug = asString(row, ["brand_slug"]) || slugify(asString(row, ["brand"]));
  const moldSlug = slugify(asString(row, ["mold_name"]));
  if (!brandSlug || !moldSlug || !isHydrated(brandSlug, moldSlug)) return null;

  return { brandSlug, moldSlug };
}

// Every disc's route, for sitemap.xml — scoped to the same hydrated set as
// the rest of the public catalog, DB-verified so the sitemap never lists a
// URL that would 404.
export async function getAllDiscRoutes(): Promise<{ brandSlug: string; moldSlug: string }[]> {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return FALLBACK_CATALOG.map((disc) => ({ brandSlug: disc.brandSlug, moldSlug: disc.moldSlug }));
  }

  const { data, error } = await supabase.from(TABLE_NAME).select("brand_slug,brand,mold_name").in("mold_name", HYDRATED_MOLD_NAMES);
  if (error || !data) return [];

  const routes = new Map<string, { brandSlug: string; moldSlug: string }>();
  for (const row of data as CatalogRow[]) {
    const brandSlug = asString(row, ["brand_slug"]) || slugify(asString(row, ["brand"]));
    const moldSlug = slugify(asString(row, ["mold_name"]));
    if (isHydrated(brandSlug, moldSlug)) routes.set(`${brandSlug}/${moldSlug}`, { brandSlug, moldSlug });
  }

  return Array.from(routes.values());
}
