import Image from "next/image";
import { DIVISIONS, type Division } from "@/lib/data/divisions";
import { Reveal } from "@/components/animations/Reveal";
import { ArrowRight } from "lucide-react";

/**
 * Services section — header ("Four divisions. One standard.") followed by
 * four full-bleed photo sections (one per division). The header blends
 * directly into the first photo panel (no gap), so the whole block reads
 * as one continuous statement.
 *
 * Each photo section:
 *   - full-bleed next/image background (object-cover)
 *   - dark gradient overlay (stronger on the left, fades right)
 *   - eyebrow, display-font name, short subline, accent-colored CTA
 *   - identical content structure on mobile (stacked, left-aligned)
 */
export function Services() {
  return (
    <section id="services" aria-label="Our services">
      {/* ── Header ── */}
      <div className="bg-white pt-20 pb-14 max-[768px]:pt-12 max-[768px]:pb-10">
        <div className="container-1140">
          <Reveal>
            <div className="flex items-end justify-between gap-6 max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-3">
              <div>
                <p
                  className="mb-2 text-[10px] font-semibold uppercase text-gold-dark"
                  style={{ letterSpacing: "0.22em" }}
                >
                  Our Services
                </p>
                <h2
                  className="font-[family-name:var(--font-display)] font-black text-navy"
                  style={{
                    fontSize: "clamp(26px, 2.8vw, 34px)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Four divisions.
                  <br />
                  One standard.
                </h2>
              </div>
              <a
                href="#"
                className="group inline-flex shrink-0 items-center gap-[6px] whitespace-nowrap text-[13px] font-semibold text-gold-dark transition-colors duration-200 hover:text-gold"
                style={{ letterSpacing: "0.03em" }}
              >
                View all services
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-[3px]"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Four stacked photo panels ── */}
      <div className="bg-navy">
        {DIVISIONS.map((division, i) => (
          <ServicePanel
            key={division.slug}
            division={division}
            index={i}
            priority={i === 0}
          />
        ))}
      </div>
    </section>
  );
}

/* ── A single full-bleed photo panel ── */
function ServicePanel({
  division,
  index,
  priority,
}: {
  division: Division;
  index: number;
  priority: boolean;
}) {
  const accentHex = accentColorHex(division.accent);

  return (
    <article
      className={[
        "group relative isolate overflow-hidden",
        // Height — comfortable on desktop, taller on mobile so the photo breathes
        "min-h-[460px] max-[1024px]:min-h-[440px] max-[768px]:min-h-[620px] max-[480px]:min-h-[580px]",
        // Seam between stacked panels
        index > 0 ? "border-t border-white/5" : "",
      ].join(" ")}
    >
      {/* Background photo */}
      <Image
        src={division.heroImage}
        alt={`${division.name} — ${division.tagline}`}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover object-center transition-transform duration-[700ms] ease-out group-hover:scale-[1.03]"
      />

      {/* Shadow overlay — dark on the left where text sits, fades to the right.
          On mobile we use a vertical sandwich gradient: dark at top and bottom
          where the text groups live, transparent through the middle so the
          background photo reads cleanly. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-navy/20 max-[768px]:bg-[linear-gradient(to_bottom,rgba(15,32,64,0.9)_0%,rgba(15,32,64,0.55)_22%,rgba(15,32,64,0.15)_50%,rgba(15,32,64,0.55)_78%,rgba(15,32,64,0.9)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent"
      />

      {/* Per-panel overlay boost — Coastal Kitchens photo is high-key, so we
          darken it a touch more to keep the white headline readable. */}
      {division.slug === "coastal-kitchens" && (
        <div aria-hidden="true" className="absolute inset-0 bg-navy/20" />
      )}

      {/* Content — desktop: vertically centered single block.
          Mobile: column stretches full panel height, eyebrow+title pinned
          near the top, description+CTA pinned near the bottom, with a
          flex spacer in between so the photo breathes through the middle. */}
      <div className="relative z-[1] flex min-h-[inherit] items-center max-[768px]:items-stretch">
        <div className="container-1140 flex w-full flex-col py-16 max-[768px]:py-14 max-[480px]:py-12">
          <Reveal>
            <div className="max-w-[560px]">
              <p
                className="mb-3 text-[10px] font-semibold uppercase"
                style={{
                  letterSpacing: "0.22em",
                  color: accentHex,
                }}
              >
                {`Division 0${index + 1}`}
              </p>

              <h3
                className="font-[family-name:var(--font-display)] font-black text-white"
                style={{
                  fontSize: "clamp(30px, 4.2vw, 52px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.015em",
                }}
              >
                {division.name}
              </h3>
            </div>
          </Reveal>

          {/* Spacer — only grows on mobile so the photo is visible through
              the middle of the panel. Collapses on desktop so the two text
              groups read as one block. */}
          <div
            aria-hidden="true"
            className="hidden max-[768px]:block max-[768px]:flex-1 max-[768px]:min-h-[80px]"
          />

          <Reveal>
            <div className="max-w-[520px] mt-4 max-[768px]:mt-0">
              <p className="text-[15px] leading-[1.65] text-white/75 max-[480px]:text-[14px]">
                {division.description}
              </p>

              <a
                href="#"
                className="group/cta mt-7 inline-flex items-center gap-[6px] text-[13px] font-semibold transition-[gap] duration-200 hover:gap-[10px] max-[768px]:mt-6"
                style={{
                  letterSpacing: "0.03em",
                  color: accentHex,
                  transitionTimingFunction:
                    "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              >
                {division.exploreLabel}
                <ArrowRight
                  className="h-4 w-4"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </article>
  );
}

/* ── Accent token → hex (matches theme variables in globals.css) ── */
function accentColorHex(accent: Division["accent"]) {
  switch (accent) {
    case "gold":
      return "#D4A83A";
    case "ac-blue":
      return "#4AA8C8";
    case "tele-green":
      return "#4AAF78";
    case "ck-terra":
      return "#C87A4A";
  }
}
