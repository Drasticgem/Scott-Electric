import { FLIGHT_DOTS, FLIGHT_FILTERS } from "@/lib/data/flightMatrix";
import { Reveal } from "@/components/animations/Reveal";

/**
 * FlightMatrix — spotlight section for the app's disc scatter-plot
 * visualization (speed vs. turn/fade). This is the single most
 * distinctive screen in the app, so it gets its own dedicated section
 * rather than being buried inside the Bags tab panel.
 *
 * The chart below is a placeholder mockup (fixed dot positions, no real
 * disc images) standing in until a real device-mockup export replaces it.
 */
export function FlightMatrix() {
  return (
    <section
      aria-label="Flight matrix"
      className="border-t border-border bg-paper py-24 max-[768px]:py-16"
    >
      <div className="container-1140">
        <Reveal>
          <div className="mx-auto mb-12 max-w-[560px] text-center">
            <p
              className="mb-3 text-[10px] font-semibold uppercase text-accent"
              style={{ letterSpacing: "0.22em" }}
            >
              Flight Matrix
            </p>
            <h2
              className="mb-4 font-[family-name:var(--font-display)] font-black text-ink"
              style={{
                fontSize: "clamp(26px, 3.2vw, 38px)",
                lineHeight: 1.15,
                letterSpacing: "-0.015em",
              }}
            >
              See your whole bag on one flight map.
            </h2>
            <p className="text-[15px] leading-[1.7] text-muted">
              Every disc in your vault, plotted by speed, turn, and fade.
              Filter by category and spot the gaps in your bag at a glance.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mx-auto max-w-[520px] rounded-[28px] border border-border bg-surface p-5 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            {/* Filter pills */}
            <div className="mb-5 flex flex-wrap gap-2">
              {FLIGHT_FILTERS.map((label) => (
                <span
                  key={label}
                  className={[
                    "rounded-full px-4 py-[7px] text-[12px] font-semibold",
                    label === "Putter"
                      ? "bg-ink text-white"
                      : "bg-paper text-ink-soft border border-border",
                  ].join(" ")}
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Chart */}
            <div className="flex gap-2">
              <span
                className="mb-6 flex shrink-0 items-center text-[10px] font-semibold uppercase text-muted-light"
                style={{ writingMode: "vertical-rl", letterSpacing: "0.18em" }}
                aria-hidden="true"
              >
                Speed
              </span>

              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-paper">
                {/* Grid lines */}
                <div className="absolute inset-0" aria-hidden="true">
                  {[20, 40, 60, 80].map((top) => (
                    <div
                      key={top}
                      className="absolute left-0 right-0 border-t border-dashed border-border"
                      style={{ top: `${top}%` }}
                    />
                  ))}
                  <div className="absolute inset-y-0 left-1/2 w-px bg-border" />
                </div>

                {/* Dots */}
                {FLIGHT_DOTS.map((dot, i) => (
                  <span
                    key={i}
                    aria-hidden="true"
                    className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_2px_6px_rgba(0,0,0,0.18)]"
                    style={{
                      left: `${dot.x}%`,
                      top: `${100 - dot.y}%`,
                      backgroundColor: dot.color,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Bottom legend */}
            <div className="mt-3 flex items-center justify-between pl-6 text-[10px] font-semibold uppercase text-muted-light" style={{ letterSpacing: "0.14em" }}>
              <span className="text-accent-dark">Overstable</span>
              <span>Stable</span>
              <span className="text-accent">Understable</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
