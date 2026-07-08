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
 * white/surface panels, one per tab.
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
          <div className="flex max-w-[640px] flex-col items-start gap-5 max-[768px]:mx-auto max-[768px]:text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-pale max-[768px]:mx-auto">
              <Icon className="h-6 w-6 text-accent" strokeWidth={2} aria-hidden="true" />
            </div>

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
        </Reveal>
      </div>
    </article>
  );
}
