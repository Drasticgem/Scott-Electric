"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { DISCVAULT } from "@/lib/constants";
import { Reveal } from "@/components/animations/Reveal";

/**
 * Hero — white, Apple-esque product intro.
 *
 * Two columns on desktop (copy left, phone mockup right), stacked on
 * mobile. The section pins for an extra scroll range while the copy
 * fades away and the whole mockup — bezel and all, no internal crop —
 * grows and pans: first centering on the top "Vault Insight" card,
 * then panning down into the "Recently Vaulted" list. It's one
 * continuous transform on a single static image, not a swap between
 * crops, and the phone is never clipped by an inner frame — only the
 * viewport's own edges limit what's visible, same as a camera moving
 * closer to a real object.
 *
 * Stage-triggered, not scroll-scrubbed: a scroll listener below only
 * tracks which third of the pin range you're in (0/1/2) and flips a
 * `data-stage` attribute — the actual motion is a plain CSS `transition`
 * (globals.css), so it always plays over the same fixed duration/easing
 * no matter how fast the scroll gesture was. That's deliberate — an
 * earlier scroll-scrubbed version (first a view-timeline, before that a
 * Framer Motion transform) hard-coupled visual speed to scroll speed,
 * which read as rushed/jarring on a fast flick.
 */
// Extra scroll distance the section pins for, on top of the 100vh it
// already occupies just being on screen. Kept short (well under one
// viewport) so a single natural scroll gesture carries all the way
// through the animation — a long pin range feels "stuck" once a
// gesture's momentum decays before the effect has finished.
const SCROLL_RANGE = "160vh";

// Rest-state (resting, un-zoomed) visual width of the mockup on desktop.
// Mobile uses a 180px rest width (see the max-[1024px] overrides below).
const REST_W = 340;
// The mockup's actual CSS layout width — fixed at the full zoomed-in size
// so the browser always rasterizes at high resolution; scale() shrinks it
// down for the resting state instead of stretching it up for the zoom.
const ZOOM_FACTOR = 2.6;
const MAX_W = REST_W * ZOOM_FACTOR;
// Mockup image aspect ratio (2048 x 4191), used to size the reserved-space
// wrapper so it never has to wait on the image to know its own height.
const ASPECT = 4191 / 2048;
const REST_H = Math.round(REST_W * ASPECT);

// Boundaries (as a fraction of the pin's own extra scroll range) between
// the three stages: 0 = rest, 1 = zoomed + centered on the top card,
// 2 = panned down into the list.
const STAGE_1_AT = 0.33;
const STAGE_2_AT = 0.66;

export function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const stageRef = { current: 0 };
    let ticking = false;

    function computeStage() {
      ticking = false;
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      const next = progress < STAGE_1_AT ? 0 : progress < STAGE_2_AT ? 1 : 2;
      if (next !== stageRef.current) {
        stageRef.current = next;
        setStage(next);
      }
    }

    function onScrollOrResize() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(computeStage);
    }

    computeStage();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <section id="hero" aria-label="Hero" className="relative bg-paper">
      <div ref={wrapperRef} className="relative" style={{ height: SCROLL_RANGE }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden py-8 max-[768px]:py-0">
          <div className="container-1140 grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] max-[768px]:gap-0">
            {/* Copy column */}
            <div className="hero-copy-stage order-2 lg:order-1" data-stage={stage}>
              <Reveal>
                <div className="max-[768px]:text-center">
                  <p
                    className="mb-4 text-[11px] font-semibold uppercase text-accent max-[768px]:mb-0"
                    style={{ letterSpacing: "0.22em" }}
                  >
                    For Disc Golfers
                  </p>

                  <h1
                    className="mb-6 font-[family-name:var(--font-display)] font-black text-ink max-[768px]:mb-1"
                    style={{
                      fontSize: "clamp(34px, 4.4vw, 58px)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Your collection matters.
                  </h1>

                  <p className="mb-9 max-w-[480px] text-[17px] leading-[1.7] text-muted max-[768px]:mx-auto max-[768px]:mb-1 max-[768px]:text-[13px] max-[768px]:leading-[1.4]">
                    Catalog discs, build smarter bags, track rounds, and
                    discover what to throw next.
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
            </div>

            {/* Phone mockup column — shown first on mobile, right column on desktop */}
            <Reveal className="order-1 lg:order-2">
              {/* Reserved-space wrapper: fixed at the REST visual size so
                  the larger, always-max-size mockup inside doesn't disturb
                  surrounding layout (overflow is visible, not clipped). */}
              <div
                className="mx-auto flex items-center justify-center max-[1024px]:!w-[180px] max-[1024px]:!h-[368px]"
                style={{ width: REST_W, height: REST_H }}
              >
                <div
                  className="hero-mockup-stage shrink-0 max-[1024px]:!w-[468px]"
                  data-stage={stage}
                  style={{ width: MAX_W }}
                >
                  <Image
                    src="/images/hero-mockup.png"
                    alt="The DiscVault app's Vault tab, showing an AI-powered collection insight, disc categories, and recently added discs"
                    width={2048}
                    height={4191}
                    quality={90}
                    priority
                    className="h-auto w-full"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
