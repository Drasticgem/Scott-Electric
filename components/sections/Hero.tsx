import { BUSINESS } from "@/lib/constants";
import { CREDENTIALS } from "@/lib/data/credentials";

/**
 * Full-bleed layered hero — looping refinery video as the backdrop,
 * with a vignette overlay on the left side so the headline + CTAs
 * sit on a dark surface while the right side of the video stays clear.
 *
 *   - looping background video (/videos/hero.mp4) over navy fallback
 *   - subtle animated grain over the video
 *   - left-to-right + top-to-bottom dark vignette for text legibility
 *   - glassmorphic location tags (top-left)
 *   - Playfair Display 900 headline with gold <em> emphasis
 *   - Primary gold CTA + secondary gold-outline tel: CTA
 *   - Trust badges as solid pills (no glass — keeps them readable)
 */

const LOCATIONS = [
  { name: "Corpus Christi", isHQ: true },
  { name: "San Antonio" },
  { name: "Alice · Weslaco" },
] as const;

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative min-h-[88vh] w-full overflow-hidden bg-navy"
    >
      {/* ── Background: looping hero video ──
          preload="metadata" (not "auto") so the browser only fetches
          enough bytes to know dimensions/duration during critical render
          — the rest streams in as the video plays. Cuts main-thread
          decode work during first paint, which was the primary cause of
          the mobile load stutter. */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 z-[1] h-full w-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Animated grain — sits above the video, below the legibility overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Gradient overlay for text legibility — left vignette + top/bottom fade.
          Layered: left-to-right dark column + top/bottom navy fade. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[2]"
        style={{
          background: `
            linear-gradient(90deg,
              rgba(10,24,48,0.88) 0%,
              rgba(10,24,48,0.72) 30%,
              rgba(10,24,48,0.35) 55%,
              rgba(10,24,48,0.10) 80%,
              rgba(10,24,48,0.00) 100%),
            linear-gradient(180deg,
              rgba(10,24,48,0.55) 0%,
              rgba(10,24,48,0.20) 30%,
              rgba(10,24,48,0.40) 75%,
              rgba(10,24,48,0.92) 100%)
          `,
        }}
      />

      {/* ── Top-left: location tags ── */}
      <div className="absolute left-7 top-6 z-[5] flex flex-wrap gap-2 max-[768px]:left-[14px] max-[768px]:top-[14px] max-[768px]:gap-[6px] max-[480px]:left-[10px] max-[480px]:top-[10px] max-[480px]:gap-1">
        {LOCATIONS.map((loc) => (
          <LocationTag key={loc.name} name={loc.name} isHQ={"isHQ" in loc && loc.isHQ} />
        ))}
      </div>

      {/* ── Content overlay ── */}
      <div className="container-1140 relative z-10 flex min-h-[88vh] flex-col justify-center py-20 max-[768px]:py-16 max-[480px]:py-12">
        <p
          className="mb-4 text-[11px] font-semibold uppercase text-gold"
          style={{ letterSpacing: "0.22em" }}
        >
          South Texas · Est. {BUSINESS.founded}
        </p>

        <h1
          className="mb-6 font-[family-name:var(--font-display)] font-black text-white max-[480px]:text-[28px]"
          style={{
            fontSize: "clamp(32px, 3.8vw, 48px)",
            lineHeight: 1.08,
            letterSpacing: "-0.01em",
            textShadow: "0 2px 16px rgba(0,0,0,0.55)",
          }}
        >
          Over 100 years
          <br />
          of powering <em className="not-italic text-gold">South Texas</em>
        </h1>

        <p
          className="mb-8 max-w-[520px] text-[15px] leading-[1.8] text-white max-[480px]:text-[13px]"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.55)" }}
        >
          Electrical, A/C, Telecom, and custom woodworking — from Corpus
          Christi to San Antonio. Industrial, commercial, and residential.
        </p>

        {/* Dual CTAs — solid gold primary + gold-outline tel: secondary */}
        <div className="mb-8 flex flex-wrap gap-3 max-[480px]:flex-col">
          <a
            href="#contact"
            className="rounded-lg bg-gold px-7 py-[14px] text-[14px] font-bold text-navy shadow-[0_8px_24px_rgba(212,168,58,0.25)] transition-[background,transform] duration-200 hover:-translate-y-px hover:bg-gold-light max-[480px]:w-full max-[480px]:text-center"
            style={{ letterSpacing: "0.04em" }}
          >
            Get a Free Estimate
          </a>
          <a
            href={BUSINESS.phoneHref}
            className="inline-flex items-center justify-center rounded-lg border-2 border-gold bg-navy/70 px-7 py-[14px] text-[14px] font-bold text-gold transition-[background,color,transform] duration-200 hover:-translate-y-px hover:bg-gold hover:text-navy max-[480px]:w-full"
            style={{ letterSpacing: "0.04em" }}
          >
            Call {BUSINESS.phoneDisplay}
          </a>
        </div>

        {/* Trust row — solid navy pills, no glass */}
        <ul className="flex flex-wrap gap-[10px] max-[480px]:gap-2">
          {CREDENTIALS.map((c) => (
            <li
              key={c.shortLabel}
              className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-navy-deep/85 px-[14px] py-[7px] text-[11px] font-semibold text-white"
              style={{ letterSpacing: "0.02em" }}
            >
              <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-gold" />
              {c.shortLabel}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Glassmorphic location tag (matches legacy .location-tag) ── */
function LocationTag({ name, isHQ }: { name: string; isHQ: boolean }) {
  return (
    <a
      href="#contact"
      className="group flex items-center gap-2 rounded-[6px] border border-white/[0.12] bg-navy/60 px-[14px] py-2 transition-all duration-200 hover:-translate-y-px hover:border-gold/50 hover:bg-navy/85 max-[768px]:px-[10px] max-[768px]:py-[6px] max-[768px]:gap-[6px] max-[480px]:px-2 max-[480px]:py-[5px] max-[480px]:gap-1"
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-gold" />
      <span
        className="text-[12px] font-medium text-white/90 max-[768px]:text-[10px] max-[480px]:text-[9px]"
        style={{ letterSpacing: "0.02em" }}
      >
        {name}
      </span>
      {isHQ && (
        <span
          className="rounded-sm bg-gold/10 px-[7px] py-[2px] text-[9px] font-semibold uppercase text-gold max-[768px]:px-[5px] max-[768px]:text-[8px]"
          style={{ letterSpacing: "0.08em" }}
        >
          HQ
        </span>
      )}
    </a>
  );
}
