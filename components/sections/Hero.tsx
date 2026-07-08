import { DISCVAULT } from "@/lib/constants";
import { Reveal } from "@/components/animations/Reveal";

/**
 * Hero — white, Apple-esque product intro.
 *
 * Two columns on desktop (copy left, phone mockup right), stacked on
 * mobile. The section pins for an extra scroll range while the copy
 * fades away and the mockup — bezel and all, no internal crop — grows
 * and pans in one continuous motion, centering on the top "Vault
 * Insight" card. It's a single transform on a static image, not a
 * swap between crops, and the phone is never clipped by an inner
 * frame — only the viewport's own edges limit what's visible, same as
 * a camera moving closer to a real object.
 *
 * Scroll-linked (scrubbed), not stage-triggered: motion is tied
 * directly to scroll position via a CSS view-timeline (globals.css),
 * not a JS scroll listener — that's what keeps it calm under fast
 * scrolling instead of stuttering, since the compositor evaluates it
 * every frame regardless of main-thread load. A JS-driven version
 * (Framer Motion) visibly stuttered on iOS Safari for exactly that
 * reason.
 */
// Extra scroll distance the section pins for, on top of the 100vh it
// already occupies just being on screen. Since the zoom is one
// continuous scrub with no hold/dead zones, a longer range just
// stretches the same motion over more scrolling — it can't feel
// "stuck" the way an earlier hold-based version did at 240vh.
const SCROLL_RANGE = "220vh";

// Rest-state (resting, un-zoomed) visual width of the mockup on desktop.
// Mobile uses a 216px rest width (see the max-[1024px] overrides below).
const REST_W = 340;
// The mockup's actual CSS layout width — fixed at the full zoomed-in size
// so the browser always rasterizes at high resolution; scale() shrinks it
// down for the resting state instead of stretching it up for the zoom.
// Desktop-only: mobile's fully-zoomed width is capped much smaller (330px,
// via the max-[1024px] override below + the hero-zoom-mobile keyframe in
// globals.css) so the bezel doesn't get clipped by a narrow viewport —
// desktop viewports are wide enough that 2.6x doesn't have that problem.
const ZOOM_FACTOR = 2.6;
const MAX_W = REST_W * ZOOM_FACTOR;
// Mockup image aspect ratio (2048 x 4191), used to size the reserved-space
// wrapper so it never has to wait on the image to know its own height.
const ASPECT = 4191 / 2048;
const REST_H = Math.round(REST_W * ASPECT);

export function Hero() {
  return (
    <section id="hero" aria-label="Hero" className="relative bg-paper">
      <div className="hero-pin-wrapper relative" style={{ height: SCROLL_RANGE }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden py-8 max-[768px]:items-start max-[768px]:py-0 max-[768px]:pt-10">
          <div className="hero-grid container-1140 w-full">
            {/* Wraps hook+pitch: on mobile this is unwrapped (display:
                contents) so the mockup can sit between them; on desktop
                it becomes a real flex column so they regroup into one
                left-hand block instead of CSS Grid unevenly spacing two
                rows spanned by the (much taller) mockup. */}
            <div className="hero-copy-wrapper">
              {/* Eyebrow + headline — above the mockup on mobile, top of
                  the left column on desktop. */}
              <div className="hero-grid-hook hero-copy-scrub">
                <Reveal>
                  <div className="max-[768px]:text-center">
                    <p
                      className="mb-4 text-[11px] font-semibold uppercase text-accent max-[768px]:mb-3"
                      style={{ letterSpacing: "0.22em" }}
                    >
                      For Disc Golfers
                    </p>

                    <h1
                      className="font-[family-name:var(--font-display)] font-black text-ink"
                      style={{
                        fontSize: "clamp(34px, 4.4vw, 58px)",
                        lineHeight: 1.05,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Your collection matters.
                    </h1>
                  </div>
                </Reveal>
              </div>

              {/* Subheadline + CTA — below the mockup on mobile, bottom of
                  the left column on desktop. `relative` so the tagline
                  below can overlay this exact spot once this fades out.
                  The fade itself lives on the INNER wrapper, not this
                  outer one — an ancestor's opacity:0 blanks its whole
                  subtree, which would take the tagline down with it if
                  the fade were on this shared parent instead. */}
              <div className="hero-grid-pitch relative">
                <div className="hero-copy-scrub">
                  <Reveal>
                    <div className="max-[768px]:text-center">
                      <p className="mb-9 max-w-[480px] text-[17px] leading-[1.7] text-muted max-[768px]:mx-auto max-[768px]:mb-4 max-[768px]:text-[14px] max-[768px]:leading-[1.6]">
                        Catalog discs, build smarter bags, track rounds, and
                        discover what to throw next.
                      </p>

                      <div className="flex flex-wrap items-center gap-4 max-[768px]:justify-center">
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

                {/* Crossfades in as the subheadline/CTA above fades out —
                    fills the space that'd otherwise sit empty once the
                    zoom finishes. On desktop this overlays the pitch
                    box exactly (the mockup zooms in place, off to the
                    side). On mobile the mockup's zoomed size visually
                    balloons well past its reserved layout footprint
                    (that's the point of the reserved-space technique —
                    transforms don't affect layout), so an inset-0 overlay
                    here would sit UNDER the zoomed mockup and get covered.
                    The fixed top offset instead pushes it below the
                    mockup's actual zoomed bottom edge — pure CSS, no
                    scroll-linked measurement, so it's a hand-tuned
                    constant like the other mobile sizing values here. */}
                <div className="hero-tagline-scrub pointer-events-none absolute inset-x-0 flex items-center justify-center max-[1024px]:top-[162px] max-[1024px]:text-center lg:inset-y-0 lg:justify-start">
                  {/* Full line on desktop, where there's room below the
                      pitch box; a shorter one on mobile, where the
                      zoomed mockup leaves only ~40px of clearance above
                      the viewport's own edge. */}
                  <p className="hidden max-w-[270px] font-[family-name:var(--font-display)] text-[19px] leading-[1.5] italic text-ink-soft lg:block">
                    Tastefully designed for a native, iOS-first experience.
                  </p>
                  <p className="max-w-[280px] font-[family-name:var(--font-display)] text-[15px] leading-[1.3] italic text-ink-soft lg:hidden">
                    Tastefully designed, iOS-first.
                  </p>
                </div>
              </div>
            </div>

            {/* Phone mockup — between the headline and the rest of the
                copy on mobile, right column on desktop. */}
            <Reveal className="hero-grid-phone">
              {/* Reserved-space wrapper: fixed at the REST visual size so
                  the larger, always-max-size mockup inside doesn't disturb
                  surrounding layout (overflow is visible, not clipped). */}
              <div
                className="mx-auto flex items-center justify-center max-[1024px]:!w-[216px] max-[1024px]:!h-[442px]"
                style={{ width: REST_W, height: REST_H }}
              >
                <div
                  className="hero-mockup-scrub shrink-0 max-[1024px]:!w-[330px]"
                  style={{ width: MAX_W }}
                >
                  {/* Hand-rolled <picture> (not next/image) so the browser
                      picks light/dark by media query and only ever fetches
                      one variant — a next/image <Image> can't swap sources
                      that way. Both are pre-optimized WebP. */}
                  <picture>
                    <source
                      srcSet="/images/hero-mockup-dark.webp"
                      media="(prefers-color-scheme: dark)"
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element -- picture/source needs a plain img fallback, next/image can't do media-conditional sources */}
                    <img
                      src="/images/hero-mockup-light.webp"
                      alt="The DiscVault app's Vault tab, showing an AI-powered collection insight, disc categories, and recently added discs"
                      width={2818}
                      height={5760}
                      fetchPriority="high"
                      decoding="async"
                      className="h-auto w-full"
                    />
                  </picture>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
