import { APP_TABS, type AppTab } from "@/lib/data/appTabs";
import { Reveal } from "@/components/animations/Reveal";
import { ArrowRight } from "lucide-react";
import { DISCVAULT } from "@/lib/constants";

// Extra scroll distance each tab showcase pins for — shorter than the
// Hero's (these are secondary moments, not the page's opening beat),
// but still enough room for the zoom to read as deliberate, not rushed.
const TAB_SCROLL_RANGE = "180vh";

/**
 * AppTabs — showcases the four tabs of the DiscVault app. Header
 * ("Everything in your bag. One tap away.") followed by all four tabs'
 * pinned scroll-zoom showcases, each with its own real screenshot
 * (light/dark pair) and identical treatment — see TabShowcase.
 */
export function AppTabs() {
  return (
    <section id="features" aria-label="App features">
      <div className="bg-paper pt-20 pb-4 max-[768px]:pt-12">
        <div className="container-1140">
          <Reveal>
            <p
              className="mb-2 text-[10px] font-semibold uppercase text-accent"
              style={{ letterSpacing: "0.22em" }}
            >
              Inside the App
            </p>
            <h2
              className="font-[family-name:var(--font-display)] font-black text-ink"
              style={{
                fontSize: "clamp(28px, 3vw, 40px)",
                lineHeight: 1.15,
                letterSpacing: "-0.015em",
              }}
            >
              Everything in your bag.
              <br />
              One tap away.
            </h2>
          </Reveal>
        </div>
      </div>

      <div>
        {APP_TABS.map((tab, i) => (
          <TabShowcase key={tab.slug} tab={tab} index={i} />
        ))}
      </div>
    </section>
  );
}

/**
 * Tab showcase — the same scroll-linked (view-timeline-scrubbed) pin +
 * zoom technique as the Hero, but tuned for the opposite framing goal.
 * The Hero deliberately lets its mockup overflow the viewport at full
 * zoom, like a camera moving closer; here the whole phone — bezel
 * included — must stay fully inside the viewport at every point in the
 * scrub, just much larger than its resting size. So the zoomed layout
 * size is capped by BOTH viewport axes (see .tab-mockup-scrub in
 * globals.css), not fixed pixels the way the Hero's is.
 *
 * Copy sits top-left and fades early (same curve as the Hero's copy),
 * clearing the stage so the fully-zoomed, un-cropped phone is the only
 * thing left on screen. Each tab's tagline anchors the bottom of the
 * section instead of sitting mid-copy, also fading in as the rest
 * fades out so it reads as this section's closing line at rest, not a
 * caption competing with the zoomed phone. Shared by all four tabs —
 * same treatment, same rest/zoom geometry, just a different screenshot
 * and copy per instance.
 */
function TabShowcase({ tab, index }: { tab: AppTab; index: number }) {
  return (
    <article className="relative border-t border-border bg-paper">
      <div
        className="tab-pin-wrapper relative"
        style={{ height: TAB_SCROLL_RANGE }}
      >
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden py-14 max-[768px]:py-10">
          <div className="container-1140 relative flex h-full w-full flex-col">
            <Reveal>
              {/* Fixed min-height on mobile (219px, the longest of the
                  four descriptions' wrapped height) so a shorter
                  description — Explore's, notably — doesn't reserve
                  less space above the mockup and throw off the
                  otherwise-identical rest/zoom position shared by all
                  four tabs. */}
              <div className="tab-copy-scrub max-w-[560px] shrink-0 text-left max-[1024px]:min-h-[219px]">
                <p
                  className="mb-2 text-[10px] font-semibold uppercase text-muted-light"
                  style={{ letterSpacing: "0.22em" }}
                >
                  {`Tab 0${index + 1}`}
                </p>

                <h3
                  className="mb-4 font-[family-name:var(--font-display)] font-black text-ink"
                  style={{
                    fontSize: "clamp(28px, 3.6vw, 42px)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.015em",
                  }}
                >
                  {tab.name}
                </h3>

                <p className="mb-5 max-w-[460px] text-[15px] leading-[1.7] text-muted">
                  {tab.description}
                </p>

                <a
                  href={DISCVAULT.appStoreUrl}
                  className="group/cta inline-flex items-center gap-[6px] text-[14px] font-semibold text-accent transition-[gap] duration-200 hover:gap-[10px]"
                >
                  {tab.exploreLabel}
                  <ArrowRight
                    className="h-4 w-4"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </a>
              </div>
            </Reveal>

            <Reveal className="flex flex-1 items-center justify-center">
              <div className="tab-mockup-rest-box flex items-center justify-center max-[1024px]:!w-[216px] max-[1024px]:!h-[442px]">
                <div className="tab-mockup-scrub shrink-0 max-[1024px]:!w-[330px]">
                  {/* Hand-rolled <picture> (not next/image) so the browser
                      picks light/dark by media query and only ever fetches
                      one variant. */}
                  <picture>
                    <source
                      srcSet={`/images/${tab.slug}-tab-dark.webp`}
                      media="(prefers-color-scheme: dark)"
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element -- picture/source needs a plain img fallback, next/image can't do media-conditional sources */}
                    <img
                      src={`/images/${tab.slug}-tab-light.webp`}
                      alt={`The DiscVault app's ${tab.name} tab`}
                      width={2818}
                      height={5760}
                      loading="lazy"
                      decoding="async"
                      className="h-auto w-full"
                    />
                  </picture>
                </div>
              </div>
            </Reveal>

            {/* Same technique as the Hero's tagline: absolutely
                positioned (not in flow), fading in as the copy above
                fades out. Mobile: fixed top offset tuned to clear the
                zoomed mockup's bottom edge, hand-tuned like the Hero's
                own top-[Npx] constant. Desktop: overlays the left copy
                column instead, matching the Hero's desktop placement. */}
            <div className="tab-tagline-scrub pointer-events-none absolute inset-x-0 flex items-center justify-center max-[1024px]:top-[764px] max-[1024px]:text-center lg:inset-y-0 lg:left-0 lg:max-w-[560px] lg:justify-start lg:text-left">
              <p className="max-w-[420px] font-[family-name:var(--font-display)] text-[19px] leading-[1.5] italic text-ink-soft max-[768px]:text-[16px]">
                {tab.tagline}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
