import { DISCVAULT } from "@/lib/constants";
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
      <div className="container-1140 grid min-h-[86vh] grid-cols-1 items-center gap-16 py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] max-[768px]:min-h-0 max-[768px]:gap-4 max-[768px]:py-8">
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
              className="mb-6 font-[family-name:var(--font-display)] font-black text-ink max-[768px]:mb-3"
              style={{
                fontSize: "clamp(34px, 4.4vw, 58px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              Your collection matters.
            </h1>

            <p className="mb-9 max-w-[480px] text-[17px] leading-[1.7] text-muted max-[768px]:mx-auto max-[768px]:mb-6">
              Catalog discs, build smarter bags, track rounds, and discover
              what to throw next.
            </p>

            <div className="mb-9 flex flex-wrap items-center gap-4 max-[768px]:justify-center max-[768px]:mb-0">
              <a
                href={DISCVAULT.appStoreUrl}
                className="inline-flex shrink-0 transition-transform duration-200 hover:-translate-y-px"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- official Apple badge asset, used unmodified per brand guidelines */}
                <img
                  src="/badges/app-store-badge.svg"
                  alt="Download on the App Store"
                  width={161}
                  height={54}
                />
              </a>
            </div>
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
        className="relative h-[560px] w-[280px] max-[1024px]:h-[280px] max-[1024px]:w-[140px] rounded-[46px] border-[6px] border-ink bg-ink shadow-[0_40px_80px_rgba(0,0,0,0.18)] max-[1024px]:rounded-[26px] max-[1024px]:border-[4px]"
        style={{ transform: "rotateY(-10deg) rotateX(4deg)" }}
      >
        {/* Notch */}
        <div className="absolute left-1/2 top-0 z-10 h-[24px] w-[110px] -translate-x-1/2 rounded-b-2xl bg-ink max-[1024px]:h-[13px] max-[1024px]:w-[60px]" />

        {/* Screen */}
        <div className="absolute inset-[3px] overflow-hidden rounded-[40px] bg-paper max-[1024px]:rounded-[28px]">
          <div className="flex h-full flex-col items-center justify-center gap-4 px-6 max-[1024px]:gap-1">
            <span className="font-[family-name:var(--font-display)] text-[24px] font-black italic text-ink max-[1024px]:text-[13px]">
              DiscVault
            </span>
            <span className="text-[11px] font-medium uppercase text-muted-light max-[1024px]:text-[7px]" style={{ letterSpacing: "0.18em" }}>
              Product Demo
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
