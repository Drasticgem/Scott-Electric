import { Reveal } from "@/components/animations/Reveal";
import { VideoDemoCarousel } from "@/components/sections/VideoDemoCarousel";
import { FLIGHT_MATRIX_CLIPS } from "@/lib/data/flightMatrixDemo";

/**
 * FlightMatrix — spotlight section for the app's disc scatter-plot
 * visualization (speed vs. turn/fade). This is the single most
 * distinctive screen in the app, so it gets its own dedicated section
 * rather than being buried inside the Bags tab panel.
 *
 * Demo is a full-phone, swipeable, autoplaying video sequence (see
 * VideoDemoCarousel, shared with the Quick Actions section) instead
 * of the Hero/Vault-style scroll-pinned zoom — a deliberately
 * different, more App-Store-preview-like interaction for this
 * section. Section height isn't fixed to the viewport, so it's free
 * to grow taller than a standard py-24 section to fit the full phone
 * comfortably.
 */
export function FlightMatrix() {
  return (
    <section
      aria-label="Disc matrix"
      className="border-t border-border bg-paper py-24 max-[768px]:py-16"
    >
      <div className="container-1140 grid grid-cols-1 items-center lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="mb-12 max-w-[560px] text-left lg:mb-0">
            <p
              className="mb-3 text-[10px] font-semibold uppercase text-accent"
              style={{ letterSpacing: "0.22em" }}
            >
              Disc Matrix
            </p>
            <h2
              className="mb-4 font-[family-name:var(--font-display)] font-black text-ink"
              style={{
                fontSize: "clamp(26px, 3.2vw, 38px)",
                lineHeight: 1.15,
                letterSpacing: "-0.015em",
              }}
            >
              See your whole bag on one interactive flight map.
            </h2>
            <p className="text-[15px] leading-[1.7] text-muted">
              Every disc in your vault, plotted by speed, turn, and fade.
              Filter by category and spot the gaps in your bag at a glance.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <VideoDemoCarousel clips={FLIGHT_MATRIX_CLIPS} />
        </Reveal>
      </div>
    </section>
  );
}
