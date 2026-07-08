import { Search } from "lucide-react";
import { CATALOG_PREVIEW } from "@/lib/data/catalogPreview";
import { DISCVAULT } from "@/lib/constants";
import { Reveal } from "@/components/animations/Reveal";

/**
 * BrowseCatalog — modeled on the in-app Disc Database search screen.
 * Public, read-only preview of the catalog; not yet wired to real
 * /catalog routes or live search (Phase 2). This is the #catalog anchor
 * target for the nav/footer/hero CTAs.
 */
export function BrowseCatalog() {
  return (
    <section
      id="catalog"
      aria-label="Browse the disc catalog"
      className="border-t border-border bg-surface py-24 max-[768px]:py-16"
    >
      <div className="container-1140">
        <Reveal>
          <div className="mx-auto mb-12 max-w-[560px] text-center">
            <p
              className="mb-3 text-[10px] font-semibold uppercase text-accent"
              style={{ letterSpacing: "0.22em" }}
            >
              Disc Database
            </p>
            <h2
              className="mb-4 font-[family-name:var(--font-display)] font-black text-ink"
              style={{
                fontSize: "clamp(26px, 3.2vw, 38px)",
                lineHeight: 1.15,
                letterSpacing: "-0.015em",
              }}
            >
              Search over 1,000+ discs by brand or mold.
            </h2>
            <p className="text-[15px] leading-[1.7] text-muted">
              The same disc database that powers the app — browse specs
              and flight numbers for every mold, from any brand. No
              account required.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mx-auto max-w-[480px] rounded-[28px] border border-border bg-paper p-3 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <div className="mb-1 flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-3">
              <Search className="h-4 w-4 shrink-0 text-muted-light" strokeWidth={2} aria-hidden="true" />
              <span className="text-[14px] text-muted-light">Search all discs</span>
            </div>

            <ul className="mt-2 divide-y divide-border">
              {CATALOG_PREVIEW.map((disc) => (
                <li key={disc.mold} className="flex items-center gap-3 px-1 py-3">
                  <span
                    className="h-11 w-11 shrink-0 rounded-full border-2 border-white shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
                    style={{ backgroundColor: disc.color }}
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1">
                    <span
                      className="block text-[10px] font-semibold uppercase text-muted-light"
                      style={{ letterSpacing: "0.08em" }}
                    >
                      {disc.brand}
                    </span>
                    <span className="block truncate text-[15px] font-semibold text-ink">
                      {disc.mold}
                    </span>
                    <span className="block text-[12px] text-muted">
                      {disc.category}
                    </span>
                  </span>
                  <span className="flex shrink-0 gap-3 text-[13px] font-semibold text-ink-soft">
                    {disc.flightNumbers.map((n, i) => (
                      <span key={i}>{n}</span>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-10 text-center">
            <a
              href={DISCVAULT.appStoreUrl}
              className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-[14px] text-[15px] font-semibold text-white shadow-[0_8px_24px_rgba(91,75,218,0.25)] transition-[background,transform] duration-200 hover:-translate-y-px hover:bg-accent-dark"
            >
              Download the App to Search
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
