import Image from "next/image";
import { DISCVAULT } from "@/lib/constants";
import { Reveal } from "@/components/animations/Reveal";

/**
 * Hero — white, Apple-esque product intro.
 *
 * Two columns on desktop (copy left, phone mockup right), stacked on
 * mobile. The mockup is a static device-frame render of the Vault tab
 * for now — swapped for a cinematic multi-clip product demo once that
 * footage is edited.
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
            <Image
              src="/images/hero-mockup.png"
              alt="The DiscVault app's Vault tab, showing an AI-powered collection insight, disc categories, and recently added discs"
              width={260}
              height={532}
              priority
              className="h-auto w-[260px] drop-shadow-[0_30px_50px_rgba(0,0,0,0.18)] max-[1024px]:w-[140px]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
