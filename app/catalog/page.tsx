import type { Metadata } from "next";
import { DiscImage } from "@/components/catalog/DiscImage";
import { searchCatalogDiscs } from "@/lib/catalog/queries";
import { titleFromQuery } from "@/lib/catalog/format";

export const metadata: Metadata = {
  title: "Disc Catalog — DiscVault",
  description: "Search the public DiscVault disc catalog by brand or mold.",
};

interface CatalogPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const discs = await searchCatalogDiscs({ query, limit: 48 });
  const title = titleFromQuery(query);

  return (
    <section className="min-h-screen bg-surface py-16 max-[768px]:py-10">
      <div className="container-1140">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase text-accent" style={{ letterSpacing: "0.22em" }}>
              Public Catalog
            </p>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(44px,8vw,104px)] font-black leading-none tracking-[-0.06em] text-ink">
              {title}
            </h1>
          </div>
          <form action="/catalog" className="flex w-full max-w-[420px] items-center gap-2 rounded-full border border-border bg-paper p-2 shadow-sm">
            <input
              name="q"
              defaultValue={query}
              placeholder="Search brand or mold"
              className="min-w-0 flex-1 bg-transparent px-4 py-2 text-[15px] font-medium text-ink outline-none placeholder:text-muted-light"
            />
            <button type="submit" className="rounded-full bg-accent px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-accent-dark">
              Search
            </button>
          </form>
        </div>

        {discs.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
            {discs.map((disc) => (
              <a key={disc.id} href={`/catalog/${encodeURIComponent(disc.id)}`} className="group text-center">
                <div className="mx-auto mb-4 flex aspect-square w-full max-w-[180px] items-center justify-center rounded-[32px] bg-paper p-5 shadow-[0_18px_45px_rgba(0,0,0,0.08)] transition duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
                  <DiscImage src={disc.imageUrl} color={disc.color} alt={`${disc.brand} ${disc.mold}`} className="h-full w-full" />
                </div>
                <h2 className="text-[17px] font-black leading-tight text-ink">{disc.mold}</h2>
                <p className="mt-1 text-[12px] font-semibold uppercase text-muted-light" style={{ letterSpacing: "0.08em" }}>
                  {disc.brand}
                </p>
              </a>
            ))}
          </div>
        ) : (
          <div className="rounded-[34px] border border-border bg-paper p-12 text-center shadow-sm">
            <h2 className="text-[24px] font-black text-ink">No discs found</h2>
            <p className="mt-2 text-muted">Try searching another brand, mold, or disc class.</p>
          </div>
        )}
      </div>
    </section>
  );
}
