"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { easeInOut, motion, useScroll, useSpring, useTransform } from "framer-motion";
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
 */
const SCROLL_RANGE = "240vh";

// Rest-state (resting, un-zoomed) visual width of the mockup on desktop.
// Mobile keeps a smaller 160px rest width (see the max-[1024px] overrides
// below) — the CTA badge sits beneath the mockup in the single-column
// mobile layout, so its size is capped by available vertical space above
// the fold, not by this constant.
const REST_W = 340;
// The mockup's actual CSS layout width — fixed at the full zoomed-in size
// so the browser always rasterizes at high resolution; scale() shrinks it
// down for the resting state instead of stretching it up for the zoom.
const ZOOM_FACTOR = 2.6;
const MAX_W = REST_W * ZOOM_FACTOR;
const REST_SCALE = 1 / ZOOM_FACTOR;
// Mockup image aspect ratio (2048 x 4191), used to size the reserved-space
// wrapper so it never has to wait on the image to know its own height.
const ASPECT = 4191 / 2048;
const REST_H = Math.round(REST_W * ASPECT);

export function Hero() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  // The phone sits in the right column on desktop (offset from viewport
  // center), so it needs a corrective shift toward center as it grows.
  // On mobile it's already centered (single column), so no shift is
  // needed there — applying the desktop shift on mobile would drag it
  // off-center.
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Smooth the raw scroll progress with a critically-damped spring
  // (bounce: 0 — no overshoot) so the motion settles like it has real
  // inertia instead of tracking the scrollbar 1:1. Duration governs how
  // "thick" the fluid feels; kept short enough to still feel connected
  // to the scroll gesture.
  const smoothProgress = useSpring(scrollYProgress, {
    duration: 0.35,
    bounce: 0,
    restDelta: 0.0005,
  });

  // Copy fades away early to give the mockup room to grow.
  const textOpacity = useTransform(smoothProgress, [0, 0.1, 0.22], [1, 1, 0]);

  // The mockup is laid out at its full ZOOMED size from the start (see
  // MAX_W/MOBILE_MAX_W below) and scaled DOWN to REST_SCALE for the resting
  // state, rather than laid out small and scaled UP. Scaling up a
  // small-layout-box image forces the browser to rasterize a small texture
  // and stretch it, which is what caused the residual blur — scaling down
  // from a large, already-high-res layout box avoids that entirely.
  //
  // Hold → grow + center on the top card → hold → pan down into the
  // list → hold. Scale/x/y all animate together as one continuous move,
  // eased (not linear) at every keyframe so the motion feels organic.
  const easeOpts = { ease: easeInOut };
  const scale = useTransform(
    smoothProgress,
    [0, 0.15, 0.4, 0.6, 0.8, 1],
    [REST_SCALE, REST_SCALE, 1, 1, 1, 1],
    easeOpts,
  );
  const x = useTransform(
    smoothProgress,
    [0, 0.15, 0.4, 1],
    isDesktop ? [0, 0, -96, -96] : [0, 0, 0, 0],
    easeOpts,
  );
  const y = useTransform(
    smoothProgress,
    [0, 0.15, 0.4, 0.6, 0.8, 1],
    ["0%", "0%", "11%", "11%", "-10%", "-10%"],
    easeOpts,
  );

  return (
    <section id="hero" aria-label="Hero" className="relative bg-paper">
      <div ref={scrollRef} className="relative" style={{ height: SCROLL_RANGE }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden py-8 max-[768px]:py-1">
          <div className="container-1140 grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] max-[768px]:gap-1">
            {/* Copy column */}
            <motion.div style={{ opacity: textOpacity }} className="order-2 lg:order-1">
              <Reveal>
                <div className="max-[768px]:text-center">
                  <p
                    className="mb-4 text-[11px] font-semibold uppercase text-accent max-[768px]:mb-2"
                    style={{ letterSpacing: "0.22em" }}
                  >
                    For Disc Golfers
                  </p>

                  <h1
                    className="mb-6 font-[family-name:var(--font-display)] font-black text-ink max-[768px]:mb-2"
                    style={{
                      fontSize: "clamp(34px, 4.4vw, 58px)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Your collection matters.
                  </h1>

                  <p className="mb-9 max-w-[480px] text-[17px] leading-[1.7] text-muted max-[768px]:mx-auto max-[768px]:mb-4 max-[768px]:text-[14px] max-[768px]:leading-[1.5]">
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
            </motion.div>

            {/* Phone mockup column — shown first on mobile, right column on desktop */}
            <Reveal className="order-1 lg:order-2">
              {/* Reserved-space wrapper: fixed at the REST visual size so
                  the larger, always-max-size mockup inside doesn't disturb
                  surrounding layout (overflow is visible, not clipped). */}
              <div
                className="mx-auto flex items-center justify-center max-[1024px]:!w-[160px] max-[1024px]:!h-[327px]"
                style={{ width: REST_W, height: REST_H }}
              >
                <motion.div
                  style={{ scale, x, y, width: MAX_W, willChange: "transform" }}
                  className="shrink-0 max-[1024px]:!w-[416px]"
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
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
