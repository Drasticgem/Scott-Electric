import { BUSINESS } from "@/lib/constants";
import { CREDENTIALS } from "@/lib/data/credentials";
import { IndustrialSilhouette } from "@/components/icons/DivisionIcons";
import { Phone } from "lucide-react";

/**
 * Full-bleed layered hero — redesigned from the legacy two-block
 * (video-area then content) hero for better above-the-fold conversion.
 *
 * Visual language is identical to the legacy site:
 *   - looping background video (Hero.mp4) over navy fallback
 *   - SVG industrial silhouette at 8% opacity
 *   - animated grain texture
 *   - glassmorphic location tags (top-left)
 *   - pulsing "Video — Looping" indicator (bottom-right)
 *   - Playfair Display 900 headline with gold <em> emphasis
 *
 * What changed vs legacy:
 *   - Content overlays the background instead of stacking below it,
 *     so H1 + primary CTA always sit above the fold.
 *   - Phone number added as a second hero CTA (tel: link).
 *   - Trust badges upgraded from a dotted inline row to small glass pills.
 *   - Division cards moved out of the hero into their own Divisions section.
 */

const LOCATIONS = [
  { name: "Corpus Christi", isHQ: true },
  { name: "San Antonio" },
  { name: "Alice · Weslaco" },
] as const;

export function Hero() {
  return (
    <section
      aria-label="Hero"
      className="relative min-h-[88vh] w-full overflow-hidden bg-navy"
    >
      {/* ── Background: looping hero video ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 z-[1] h-full w-full object-cover"
      >
        <source src="/videos/Hero.mp4" type="video/mp4" />
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

      {/* Industrial skyline silhouette — bottom 40% at 8% opacity */}
      <IndustrialSilhouette className="pointer-events-none absolute bottom-0 left-0 right-0 z-[1] h-[40%] opacity-[0.08]" />

      {/* Gradient overlay for text legibility — stronger at bottom */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[2]"
        style={{
          background: `linear-gradient(180deg,
            rgba(15,32,64,0.25) 0%,
            rgba(15,32,64,0.15) 25%,
            rgba(15,32,64,0.55) 75%,
            rgba(15,32,64,0.92) 100%)`,
        }}
      />

      {/* ── Top-left: location tags ── */}
      <div className="absolute left-7 top-6 z-[5] flex flex-wrap gap-2 max-[768px]:left-[14px] max-[768px]:top-[14px] max-[768px]:gap-[6px] max-[480px]:left-[10px] max-[480px]:top-[10px] max-[480px]:gap-1">
        {LOCATIONS.map((loc) => (
          <LocationTag key={loc.name} name={loc.name} isHQ={"isHQ" in loc && loc.isHQ} />
        ))}
      </div>

      {/* ── Bottom-right: "Video — Looping" indicator ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-5 right-7 z-[5] flex items-center gap-2 rounded-[20px] border border-white/[0.12] bg-navy/55 px-[14px] py-[6px] pl-[10px] text-[10px] font-medium uppercase text-white/45 max-[768px]:bottom-[14px] max-[768px]:right-[14px] max-[768px]:px-[10px] max-[768px]:py-[5px] max-[768px]:text-[9px]"
        style={{
          letterSpacing: "0.1em",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <span className="animate-hero-pulse h-[6px] w-[6px] rounded-full bg-[#e74c3c]" />
        Video — Looping
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
          }}
        >
          Over 100 years
          <br />
          of powering <em className="not-italic text-gold">South Texas</em>
        </h1>

        <p className="mb-8 max-w-[520px] text-[15px] leading-[1.8] text-white/60 max-[480px]:text-[13px]">
          Electrical, A/C, Telecom, and custom woodworking — from Corpus
          Christi to San Antonio. Industrial, commercial, and residential.
        </p>

        {/* Dual CTAs — gold + outline phone */}
        <div className="mb-8 flex flex-wrap gap-3 max-[480px]:flex-col">
          <a
            href="#contact"
            className="rounded-lg bg-gold px-7 py-[14px] text-[14px] font-bold text-navy transition-[background,transform] duration-200 hover:-translate-y-px hover:bg-gold-light max-[480px]:w-full max-[480px]:text-center"
            style={{ letterSpacing: "0.04em" }}
          >
            Get a Free Estimate
          </a>
          <a
            href={BUSINESS.phoneHref}
            className="inline-flex items-center gap-2 rounded-lg border-[1.5px] border-white/60 bg-white/10 px-7 py-[14px] text-[14px] font-semibold text-white backdrop-blur-md transition-colors duration-200 hover:border-gold hover:bg-white/15 hover:text-gold-light max-[480px]:w-full max-[480px]:justify-center"
            style={{ letterSpacing: "0.04em" }}
          >
            <Phone className="h-4 w-4 text-gold" aria-hidden="true" />
            Call {BUSINESS.phoneDisplay}
          </a>
        </div>

        {/* Trust row — upgraded to glass pills */}
        <ul className="flex flex-wrap gap-[10px] max-[480px]:gap-2">
          {CREDENTIALS.map((c) => (
            <li
              key={c.shortLabel}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-[14px] py-[7px] text-[11px] font-medium text-white/75"
              style={{
                letterSpacing: "0.02em",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
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
