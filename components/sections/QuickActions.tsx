import { Reveal } from "@/components/animations/Reveal";
import { VideoDemoCarousel } from "@/components/sections/VideoDemoCarousel";
import { QUICK_ACTIONS_CLIPS } from "@/lib/data/quickActionsDemo";

/**
 * QuickActions — a smaller feature spotlight for the app's quick-action
 * sheet, separate from the four main tabs so it reads as a "designed for
 * speed" moment rather than competing with the core tab structure.
 *
 * Same treatment as FlightMatrix — full-phone swipeable video demo (see
 * VideoDemoCarousel), one step per quick action, same section sizing.
 */
export function QuickActions() {
  return (
    <section
      aria-label="Quick actions"
      className="border-t border-border bg-paper py-24 max-[768px]:py-16"
    >
      <div className="container-1140 grid grid-cols-1 items-center lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="mb-12 max-w-[560px] text-left lg:mb-0">
            <p
              className="mb-3 text-[10px] font-semibold uppercase text-accent"
              style={{ letterSpacing: "0.22em" }}
            >
              Quick Actions
            </p>
            <h2
              className="mb-4 font-[family-name:var(--font-display)] font-black text-ink"
              style={{
                fontSize: "clamp(26px, 3.2vw, 38px)",
                lineHeight: 1.15,
                letterSpacing: "-0.015em",
              }}
            >
              Scan, measure, discover, and manage discs.
            </h2>
            <p className="text-[15px] leading-[1.7] text-muted">
              Identify a disc with your camera, search the full database,
              measure a throw, or add discs manually — all from one quick
              action sheet.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <VideoDemoCarousel clips={QUICK_ACTIONS_CLIPS} />
        </Reveal>
      </div>
    </section>
  );
}
