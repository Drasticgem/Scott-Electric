import type { Metadata } from "next";
import { CatalogBrowser } from "@/components/catalog/CatalogBrowser";
import { searchCatalogDiscs } from "@/lib/catalog/queries";

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

  return (
    <section className="min-h-screen bg-surface py-16 max-[768px]:py-10">
      <div className="container-1140">
        <CatalogBrowser initialDiscs={discs} initialQuery={query} />
      </div>
    </section>
  );
}
