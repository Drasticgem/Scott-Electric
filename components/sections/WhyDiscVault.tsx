import { CREDENTIALS } from "@/lib/data/credentials";
import { STATS } from "@/lib/data/stats";
import { Reveal } from "@/components/animations/Reveal";

/**
 * WhyDiscVault — two-column copy + credential badges on a plain surface
 * background (no photography needed), with a stats bar pinned to the
 * bottom of the section.
 */
export function WhyDiscVault() {
  return (
    <section id="why" aria-label="Why DiscVault" className="bg-surface">
      <div className="container-1140 py-24 max-[768px]:py-16">
        <div className="grid grid-cols-2 items-center gap-16 max-[1024px]:gap-12 max-[768px]:grid-cols-1 max-[768px]:gap-10">
          <Reveal>
            <div className="max-w-[560px]">
              <p
                className="mb-3 text-[10px] font-semibold uppercase text-accent"
                style={{ letterSpacing: "0.22em" }}
              >
                Why DiscVault
              </p>
              <h2
                className="mb-5 font-[family-name:var(--font-display)] font-black text-ink"
                style={{
                  fontSize: "clamp(26px, 3.4vw, 40px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.015em",
                }}
              >
                Disc golf bags get complicated fast.
              </h2>
              <p className="text-[15px] leading-[1.75] text-muted">
                Every disc has a purpose, a flight, a feel, a memory, and a
                place in your game. DiscVault exists because players deserve
                a better way to understand what they own, what they throw,
                and what they should reach for next.
              </p>
            </div>
          </Reveal>

          <Reveal stagger className="flex flex-col gap-3">
            {CREDENTIALS.map((c) => (
              <WhyBadge
                key={c.shortLabel}
                value={c.value}
                smallValue={c.smallValue}
                title={c.title}
                sub={c.sub}
              />
            ))}
          </Reveal>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <Reveal>
        <div className="container-1140">
          <div
            className={[
              "grid grid-cols-4 max-[768px]:grid-cols-2",
              "[&>*]:border-r [&>*]:border-border",
              "[&>*:last-child]:border-r-0",
              "max-[768px]:[&>*:nth-child(2)]:border-r-0",
              "border-t border-border",
            ].join(" ")}
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="px-6 py-8 text-center transition-colors duration-200 hover:bg-paper/60 max-[480px]:px-3 max-[480px]:py-5"
              >
                <div className="font-[family-name:var(--font-display)] text-[30px] font-bold leading-none text-accent max-[480px]:text-[22px]">
                  {stat.number}
                </div>
                <div
                  className="mt-[6px] text-[10px] font-medium uppercase text-muted-light max-[480px]:text-[9px]"
                  style={{ letterSpacing: "0.12em" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function WhyBadge({
  value,
  smallValue = false,
  title,
  sub,
}: {
  value: string;
  smallValue?: boolean;
  title: string;
  sub: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-paper px-5 py-[18px] transition-colors duration-200 hover:bg-white">
      <div
        className={`min-w-[64px] shrink-0 font-[family-name:var(--font-display)] font-bold leading-none text-accent ${
          smallValue ? "text-[16px] leading-[1.2]" : "text-[22px]"
        }`}
      >
        {value.split("\n").map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
      <div>
        <div className="mb-[2px] text-[14px] font-semibold text-ink">
          {title}
        </div>
        <div className="text-[12px] text-muted">{sub}</div>
      </div>
    </div>
  );
}
