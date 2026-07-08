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

/**
 * AppTabs — showcases the four tabs of the DiscVault app. Header
 * ("Everything in your bag. One tap away.") followed by four alternating
 * white/surface panels, one per tab. Each panel pairs copy with a phone
 * mockup slot — currently a placeholder frame, swapped for a real
 * screenshot per tab once exports are ready.
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
          <TabPanel key={tab.slug} tab={tab} index={i} />
        ))}
      </div>
    </section>
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
