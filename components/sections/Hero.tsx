import { DISCVAULT } from "@/lib/constants";
import { CREDENTIALS } from "@/lib/data/credentials";
import { Reveal } from "@/components/animations/Reveal";

/**
 * Hero — white, Apple-esque product intro.
 *
 * Two columns on desktop (copy left, phone mockup right), stacked on
 * mobile. The phone mockup is a placeholder frame standing in for the
 * real cinematic product-demo video, which will be dropped in once
 * final app footage is edited (see PhoneMockup below).
 */
export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative w-full overflow-hidden bg-paper"
    >
      <div className="container-1140 grid min-h-[86vh] grid-cols-1 items-center gap-16 py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] max-[768px]:min-h-0 max-[768px]:gap-10 max-[768px]:py-16">
        {/* Copy column */}
        <Reveal className="order-2 lg:order-1">
          <div className="max-[768px]:text-center">
            <p
              className="mb-4 text-[11px] font-semibold uppercase text-accent"
              style={{ letterSpacing: "0.22em" }}
            >
              For Disc Golfers
            </p>

            <h1
              className="mb-6 font-[family-name:var(--font-display)] font-black text-ink"
              style={{
                fontSize: "clamp(34px, 4.4vw, 58px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              Your collection <em className="not-italic text-accent">matters</em>.
            </h1>

            <p className="mb-9 max-w-[480px] text-[17px] leading-[1.7] text-muted max-[768px]:mx-auto">
              Catalog discs, build smarter bags, track rounds, and discover
              what to throw next.
            </p>

            <div className="mb-9 flex flex-wrap gap-3 max-[480px]:flex-col max-[768px]:justify-center">
              <a
                href={DISCVAULT.appStoreUrl}
                className="rounded-full bg-accent px-7 py-[14px] text-[15px] font-semibold text-white shadow-[0_8px_24px_rgba(91,75,218,0.25)] transition-[background,transform] duration-200 hover:-translate-y-px hover:bg-accent-dark max-[480px]:w-full max-[480px]:text-center"
              >
                Download the App
              </a>
              <a
                href="#catalog"
                className="inline-flex items-center justify-center rounded-full border border-border bg-paper px-7 py-[14px] text-[15px] font-semibold text-ink-soft transition-[background,transform] duration-200 hover:-translate-y-px hover:bg-surface max-[480px]:w-full"
              >
                Browse the Catalog
              </a>
            </div>

            {/* Trust row */}
            <ul className="flex flex-wrap gap-[10px] max-[480px]:gap-2 max-[768px]:justify-center">
              {CREDENTIALS.map((c) => (
                <li
                  key={c.shortLabel}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-[14px] py-[7px] text-[12px] font-medium text-ink-soft"
                >
                  <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-accent" />
                  {c.shortLabel}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Phone mockup column — shown first on mobile, right column on desktop */}
        <Reveal className="order-1 lg:order-2">
          <div className="flex justify-center">
            <PhoneMockup />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Placeholder iPhone mockup — stands in for the real cinematic product
 * demo (multiple clipped app-screen shots) until final footage/screenshots
 * are ready. Pure CSS/SVG, tilted for a subtle cinematic angle.
 */
function PhoneMockup() {
  return (
    <div
      className="relative"
      style={{ perspective: "1400px" }}
      aria-hidden="true"
    >
      <div
        className="relative h-[560px] w-[280px] max-[480px]:h-[440px] max-[480px]:w-[220px] rounded-[46px] border-[6px] border-ink bg-ink shadow-[0_40px_80px_rgba(0,0,0,0.18)]"
        style={{ transform: "rotateY(-10deg) rotateX(4deg)" }}
      >
        {/* Notch */}
        <div className="absolute left-1/2 top-0 z-10 h-[24px] w-[110px] -translate-x-1/2 rounded-b-2xl bg-ink" />

        {/* Screen */}
        <div className="absolute inset-[3px] overflow-hidden rounded-[40px] bg-paper">
          <div className="flex h-full flex-col items-center justify-center gap-4 px-6">
            <span className="font-[family-name:var(--font-display)] text-[24px] font-black italic text-ink">
              DiscVault
            </span>
            <span className="text-[11px] font-medium uppercase text-muted-light" style={{ letterSpacing: "0.18em" }}>
              Product Demo
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
