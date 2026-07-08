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

  // Smooth the raw scroll progress with a spring so the animation has
  // inertia and settles fluidly, instead of snapping 1:1 to every
  // mouse-wheel tick or trackpad judder.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    mass: 0.4,
    restDelta: 0.0005,
  });

  // Copy fades away early to give the mockup room to grow.
  const textOpacity = useTransform(smoothProgress, [0, 0.1, 0.22], [1, 1, 0]);

  // Hold → grow + center on the top card → hold → pan down into the
  // list → hold. Scale/x/y all animate together as one continuous move,
  // eased (not linear) at every keyframe so the motion feels organic.
  const easeOpts = { ease: easeInOut };
  const scale = useTransform(
    smoothProgress,
    [0, 0.15, 0.4, 0.6, 0.8, 1],
    [1, 1, 2.6, 2.6, 2.6, 2.6],
    easeOpts,
  );
  const x = useTransform(
    smoothProgress,
    [0, 0.15, 0.4, 1],
    isDesktop ? ["0%", "0%", "-32%", "-32%"] : ["0%", "0%", "0%", "0%"],
    easeOpts,
  );
  const y = useTransform(
    smoothProgress,
    [0, 0.15, 0.4, 0.6, 0.8, 1],
    ["0%", "0%", "34%", "34%", "-30%", "-30%"],
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
              <div className="flex justify-center">
                <motion.div style={{ scale, x, y, willChange: "transform" }}>
                  <Image
                    src="/images/hero-mockup.png"
                    alt="The DiscVault app's Vault tab, showing an AI-powered collection insight, disc categories, and recently added discs"
                    width={2048}
                    height={4191}
                    quality={90}
                    priority
                    className="h-auto w-[300px] max-[1024px]:w-[160px]"
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
