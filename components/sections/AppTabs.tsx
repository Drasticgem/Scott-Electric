import { Archive, Backpack, Route, Users, type LucideIcon } from "lucide-react";
import { APP_TABS, type AppTab, type AppTabSlug } from "@/lib/data/appTabs";
import { Reveal } from "@/components/animations/Reveal";
import { ArrowRight } from "lucide-react";

const TAB_ICONS: Record<AppTabSlug, LucideIcon> = {
  vault: Archive,
  bags: Backpack,
  rounds: Route,
  explore: Users,
};

// Extra scroll distance the Vault showcase pins for — shorter than the
// Hero's (this is a secondary moment, not the page's opening beat), but
// still enough room for the zoom to read as deliberate, not rushed.
const VAULT_SCROLL_RANGE = "180vh";

/**
 * AppTabs — showcases the four tabs of the DiscVault app. Header
 * ("Everything in your bag. One tap away.") followed by the Vault tab's
 * pinned scroll-zoom showcase, then three alternating white/surface
 * panels for the remaining tabs. Vault has a real screenshot and its
 * own showcase treatment; the rest are still a placeholder frame until
 * exports are ready for them too.
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
        {APP_TABS.map((tab, i) =>
          tab.slug === "vault" ? (
            <VaultShowcase key={tab.slug} tab={tab} />
          ) : (
            <TabPanel key={tab.slug} tab={tab} index={i} />
          ),
        )}
      </div>
    </section>
  );
}

/**
 * Vault showcase — the same scroll-linked (view-timeline-scrubbed) pin
 * + zoom technique as the Hero, but tuned for the opposite framing
 * goal. The Hero deliberately lets its mockup overflow the viewport at
 * full zoom, like a camera moving closer; here the whole phone — bezel
 * included — must stay fully inside the viewport at every point in the
 * scrub, just much larger than its resting size. So the zoomed layout
 * size is capped by BOTH viewport axes (see .vault-mockup-scrub in
 * globals.css), not fixed pixels the way the Hero's is.
 *
 * Copy sits top-left and fades early (same curve as the Hero's copy),
 * clearing the stage so the fully-zoomed, un-cropped phone is the only
 * thing left on screen. "Every disc you own, all in one place" — the
 * tab's tagline — anchors the bottom of the section instead of sitting
 * mid-copy, also fading with the rest so it reads as this section's
 * closing line at rest, not a caption competing with the zoomed phone.
 */
function VaultShowcase({ tab }: { tab: AppTab }) {
  return (
    <article className="relative border-t border-border bg-paper">
      <div
        className="vault-pin-wrapper relative"
        style={{ height: VAULT_SCROLL_RANGE }}
      >
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden py-14 max-[768px]:py-10">
          <div className="container-1140 flex h-full w-full flex-col">
            <Reveal>
              <div className="vault-copy-scrub max-w-[560px] shrink-0 text-left">
                <p
                  className="mb-2 text-[10px] font-semibold uppercase text-muted-light"
                  style={{ letterSpacing: "0.22em" }}
                >
                  Tab 01
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
                  href="#"
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
              <div className="vault-mockup-rest-box flex items-center justify-center max-[1024px]:!w-[216px] max-[1024px]:!h-[442px]">
                <div className="vault-mockup-scrub shrink-0 max-[1024px]:!w-[330px]">
                  {/* Hand-rolled <picture> (not next/image) so the browser
                      picks light/dark by media query and only ever fetches
                      one variant. */}
                  <picture>
                    <source
                      srcSet="/images/vault-tab-dark.webp"
                      media="(prefers-color-scheme: dark)"
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element -- picture/source needs a plain img fallback, next/image can't do media-conditional sources */}
                    <img
                      src="/images/vault-tab-light.webp"
                      alt="The DiscVault app's Vault tab, showing an AI-powered collection insight, disc categories, and recently added discs"
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

            <div className="vault-tagline-scrub shrink-0 text-left">
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

function TabPanel({ tab, index }: { tab: AppTab; index: number }) {
  const Icon = TAB_ICONS[tab.slug];
  const alt = index % 2 === 1;

  return (
    <article
      className={[
        "border-t border-border py-20 max-[768px]:py-14",
        alt ? "bg-surface" : "bg-paper",
      ].join(" ")}
    >
      <div className="container-1140">
        <Reveal>
          <div
            className={[
              "flex flex-col items-center gap-12 lg:flex-row lg:gap-20",
              alt ? "lg:flex-row-reverse" : "",
            ].join(" ")}
          >
            <div className="shrink-0">
              <TabMockup icon={Icon} name={tab.name} />
            </div>

            <div className="flex max-w-[520px] flex-col items-center gap-5 text-center lg:items-start lg:text-left">
              <p
                className="text-[10px] font-semibold uppercase text-muted-light"
                style={{ letterSpacing: "0.22em" }}
              >
                {`Tab 0${index + 1}`}
              </p>

              <h3
                className="font-[family-name:var(--font-display)] font-black text-ink"
                style={{
                  fontSize: "clamp(26px, 3.4vw, 38px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.015em",
                }}
              >
                {tab.name}
              </h3>

              <p className="text-[16px] font-medium text-ink-soft">
                {tab.tagline}
              </p>

              <p className="text-[15px] leading-[1.7] text-muted">
                {tab.description}
              </p>

              <a
                href="#"
                className="group/cta mt-2 inline-flex items-center gap-[6px] text-[14px] font-semibold text-accent transition-[gap] duration-200 hover:gap-[10px]"
              >
                {tab.exploreLabel}
                <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </article>
  );
}

/**
 * Placeholder phone mockup for a single tab screen — stands in for a
 * real cropped screenshot export. Deliberately plain/flat (no cinematic
 * tilt) so it reads as "screenshot goes here" rather than competing
 * with the Hero's product-demo mockup.
 */
function TabMockup({ icon: Icon, name }: { icon: LucideIcon; name: string }) {
  return (
    <div className="relative" aria-hidden="true">
      <div className="relative h-[420px] w-[210px] rounded-[38px] border-[5px] border-ink bg-ink shadow-[0_24px_60px_rgba(0,0,0,0.14)]">
        {/* Notch */}
        <div className="absolute left-1/2 top-0 z-10 h-[18px] w-[86px] -translate-x-1/2 rounded-b-xl bg-ink" />

        {/* Screen */}
        <div className="absolute inset-[3px] overflow-hidden rounded-[32px] bg-surface">
          <div className="flex h-full flex-col items-center justify-center gap-3 px-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-pale">
              <Icon className="h-7 w-7 text-accent" strokeWidth={2} />
            </div>
            <span
              className="text-center text-[10px] font-medium uppercase text-muted-light"
              style={{ letterSpacing: "0.16em" }}
            >
              {name} Screenshot
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
