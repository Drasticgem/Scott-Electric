"use client";

import { useEffect, useRef, useState } from "react";
import { DiscImage } from "./DiscImage";
import type { PublicCatalogDisc } from "@/lib/catalog/types";

interface CatalogBrowserProps {
  initialDiscs: PublicCatalogDisc[];
  initialQuery: string;
}

/**
 * The full /catalog browse experience — the "Public Catalog" heading IS the
 * search field (no separate box), and results refetch live as you type, the
 * same live-as-you-type behavior as the homepage CatalogSearchPreview. The
 * previous grid stays on screen (dimmed) while a new fetch is in flight
 * instead of flashing to empty.
 */
export function CatalogBrowser({ initialDiscs, initialQuery }: CatalogBrowserProps) {
  const [query, setQuery] = useState(initialQuery);
  const [discs, setDiscs] = useState(initialDiscs);
  const [isFetching, setIsFetching] = useState(false);
  const skipNextFetch = useRef(true);

  useEffect(() => {
    if (skipNextFetch.current) {
      skipNextFetch.current = false;
      return;
    }

    const controller = new AbortController();
    const trimmed = query.trim();
    setIsFetching(true);

    const timer = window.setTimeout(async () => {
      const params = new URLSearchParams({ limit: "48" });
      if (trimmed) params.set("q", trimmed);

      try {
        const response = await fetch(`/api/catalog/search?${params.toString()}`, {
          signal: controller.signal,
        });
        if (!response.ok) return;
        const payload = (await response.json()) as { discs: PublicCatalogDisc[] };
        setDiscs(payload.discs);
        const url = trimmed ? `/catalog?q=${encodeURIComponent(trimmed)}` : "/catalog";
        window.history.replaceState(null, "", url);
      } catch {
        // Aborted or network error — keep showing the last good results.
      } finally {
        setIsFetching(false);
      }
    }, 200);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <div className="mb-12">
        <p className="mb-3 text-[10px] font-semibold uppercase text-accent" style={{ letterSpacing: "0.22em" }}>
          Public Catalog
        </p>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Catalog"
          aria-label="Search the disc catalog by brand or mold"
          className="w-full bg-transparent font-[family-name:var(--font-display)] text-[clamp(44px,8vw,104px)] font-black leading-none tracking-[-0.06em] text-ink outline-none placeholder:text-muted-light"
        />
      </div>

      {discs.length > 0 ? (
        <div
          className={`grid grid-cols-2 gap-x-6 gap-y-12 transition-opacity duration-200 sm:grid-cols-3 lg:grid-cols-5 ${isFetching ? "opacity-50" : "opacity-100"}`}
        >
          {discs.map((disc) => (
            <a key={disc.id} href={`/discs/${disc.brandSlug}/${disc.moldSlug}`} className="group text-center">
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
    </>
  );
}
