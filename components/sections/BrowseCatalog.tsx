import { ArrowRight } from "lucide-react";
import { CatalogSearchPreview } from "@/components/catalog/CatalogSearchPreview";
import { Reveal } from "@/components/animations/Reveal";
import { searchCatalogDiscs } from "@/lib/catalog/queries";

/**
 * BrowseCatalog — public, read-only catalog entry point. The section keeps
 * the landing-page copy left aligned and pairs it with an app-style search
 * card backed by the catalog query layer.
 */
export async function BrowseCatalog() {
  // Empty query -> a shuffled sample across the whole hydrated set, not
  // just one brand.
  const previewDiscs = await searchCatalogDiscs({ limit: 6 });

  return (
    <section
      id="catalog"
      aria-label="Browse the disc catalog"
      className="border-t border-border bg-surface py-24 max-[768px]:py-16"
    >
      <div className="container-1140">
        <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
          <Reveal>
            <div className="max-w-[540px]">
              <p
                className="mb-3 text-[10px] font-semibold uppercase text-accent"
                style={{ letterSpacing: "0.22em" }}
              >
                Disc Database
              </p>
              <h2
                className="mb-5 font-[family-name:var(--font-display)] font-black text-ink"
                style={{
                  fontSize: "clamp(30px, 4vw, 54px)",
                  lineHeight: 1.04,
                  letterSpacing: "-0.035em",
                }}
              >
                Search the catalog before you bag it.
              </h2>
              <p className="mb-7 text-[17px] leading-[1.75] text-muted">
                Browse the public DiscVault database by brand or mold, preview
                app-style disc rows, and open a clean read-only web catalog — no
                sign-in required.
              </p>
              <a
                href="/catalog"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[14px] font-semibold text-paper transition hover:-translate-y-px hover:bg-ink-soft"
              >
                Browse Full Catalog
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          <Reveal>
            <CatalogSearchPreview initialDiscs={previewDiscs} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
