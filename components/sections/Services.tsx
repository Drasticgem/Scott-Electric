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
      <div className="bg-white pt-20 max-[768px]:pt-12">
        <div className="container-1140">
          <Reveal>
            <div className="mb-10 flex items-end justify-between gap-6 max-[768px]:mb-8 max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-3">
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
        // Height — comfortable on desktop, still cinematic on mobile
        "min-h-[460px] max-[1024px]:min-h-[400px] max-[768px]:min-h-[360px] max-[480px]:min-h-[320px]",
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
          Stacked with a subtle bottom gradient so the CTA row stays legible. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-navy/20 max-[768px]:bg-gradient-to-t max-[768px]:from-navy/90 max-[768px]:via-navy/70 max-[768px]:to-navy/30"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent"
      />

      {/* Content */}
      <div className="relative z-[1] flex min-h-[inherit] items-center">
        <div className="container-1140 w-full py-16 max-[768px]:py-12">
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

              <p
                className="mt-4 max-w-[520px] text-[15px] leading-[1.65] text-white/75 max-[480px]:text-[14px]"
              >
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
