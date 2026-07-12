"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { DiscImage } from "./DiscImage";
import type { PublicCatalogDisc } from "@/lib/catalog/types";

interface CatalogSearchPreviewProps {
  initialDiscs: PublicCatalogDisc[];
}

export function CatalogSearchPreview({ initialDiscs }: CatalogSearchPreviewProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(initialDiscs);
  const [focused, setFocused] = useState(false);

  const trimmedQuery = query.trim();
  const catalogHref = useMemo(() => {
    const params = new URLSearchParams();
    if (trimmedQuery) params.set("q", trimmedQuery);
    return `/catalog${params.toString() ? `?${params.toString()}` : ""}`;
  }, [trimmedQuery]);

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      if (trimmedQuery.length < 2) {
        setResults(initialDiscs);
        return;
      }

      const params = new URLSearchParams({ q: trimmedQuery, limit: "6" });
      const response = await fetch(`/api/catalog/search?${params.toString()}`, {
        signal: controller.signal,
      });
      if (!response.ok) return;
      const payload = (await response.json()) as { discs: PublicCatalogDisc[] };
      setResults(payload.discs);
    }, 180);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [initialDiscs, trimmedQuery]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.location.href = catalogHref;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[34px] border border-border bg-paper p-3 shadow-[0_22px_70px_rgba(0,0,0,0.10)]"
    >
      <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-3 focus-within:border-accent/60 focus-within:bg-paper">
        <Search className="h-4 w-4 shrink-0 text-muted-light" strokeWidth={2} aria-hidden="true" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => window.setTimeout(() => setFocused(false), 120)}
          type="search"
          placeholder="Search all discs"
          aria-label="Search all discs"
          className="min-w-0 flex-1 bg-transparent text-[15px] font-medium text-ink outline-none placeholder:text-muted-light"
        />
        <button
          type="submit"
          className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent px-4 py-2 text-[12px] font-semibold text-white transition hover:bg-accent-dark"
        >
          Search
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-3 overflow-hidden rounded-[26px] bg-surface">
        <div className="px-4 pb-1 pt-3 text-[10px] font-semibold uppercase text-muted-light" style={{ letterSpacing: "0.12em" }}>
          {trimmedQuery.length >= 2 ? "Top matches" : "Popular discs"}
        </div>
        <ul className="divide-y divide-border/70">
          {results.length > 0 ? (
            results.slice(0, 6).map((disc) => (
              <li key={disc.id}>
                <a href={`/discs/${disc.brandSlug}/${disc.moldSlug}`} className="flex items-center gap-4 px-4 py-3 transition hover:bg-paper/80">
                  <DiscImage src={disc.imageUrl} color={disc.color} alt={`${disc.brand} ${disc.mold}`} className="h-14 w-14 shrink-0" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-semibold uppercase text-muted-light" style={{ letterSpacing: "0.08em" }}>
                      {disc.brand}
                    </span>
                    <span className="block truncate text-[17px] font-black leading-tight text-ink">{disc.mold}</span>
                    <span className="block text-[13px] text-muted">{disc.category}</span>
                  </span>
                </a>
              </li>
            ))
          ) : (
            <li className="px-4 py-6 text-center text-[14px] text-muted">No discs found. Try another brand or mold.</li>
          )}
        </ul>
        {(focused || trimmedQuery) && (
          <a href={catalogHref} className="flex items-center justify-between border-t border-border px-4 py-3 text-[14px] font-semibold text-accent transition hover:bg-paper/80">
            <span>{trimmedQuery ? `Search all results for “${trimmedQuery}”` : "Open the catalog preview"}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </form>
  );
}
