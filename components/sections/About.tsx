import { BUSINESS } from "@/lib/constants";
import { CREDENTIALS } from "@/lib/data/credentials";
import { Reveal } from "@/components/animations/Reveal";

/**
 * Two-column About section on navy: copy left, three credential
 * badges right. Matches legacy .about layout exactly.
 */
export function About() {
  return (
    <section id="about" className="bg-navy py-20 max-[768px]:py-12">
      <div className="container-1140">
        <Reveal className="grid grid-cols-2 items-center gap-20 max-[768px]:grid-cols-1 max-[768px]:gap-8">
          {/* Left column — copy */}
          <div>
            <p
              className="mb-3 text-[10px] font-semibold uppercase text-gold"
              style={{ letterSpacing: "0.22em" }}
            >
              About Scott Group
            </p>
            <h2
              className="mb-4 font-[family-name:var(--font-display)] font-black text-white"
              style={{
                fontSize: "clamp(22px, 2.4vw, 30px)",
                lineHeight: 1.2,
              }}
            >
              The longest-established electrical contractor in South Texas
            </h2>
            <p className="mb-6 text-[14px] leading-[1.8] text-white/60">
              Founded by {BUSINESS.founder} in {BUSINESS.founded}, we&apos;ve
              spent over a century powering the Coastal Bend — from
              knob-and-tube wiring to DCS, solar, and fiber optics. With
              offices in Corpus Christi, San Antonio, Alice, and Weslaco, no
              job in South Texas is out of reach.
            </p>
            <a
              href="#"
              className="inline-block rounded-lg border-[1.5px] border-white/25 bg-transparent px-6 py-3 text-[13px] font-medium text-white transition-[border-color,background] duration-200 hover:border-white/45 hover:bg-white/[0.03]"
              style={{ letterSpacing: "0.04em" }}
            >
              Read our full story →
            </a>
          </div>

          {/* Right column — credential badges stack */}
          <div className="flex flex-col gap-3">
            {CREDENTIALS.map((c) => (
              <AboutBadge
                key={c.shortLabel}
                value={c.value}
                smallValue={c.smallValue}
                title={c.title}
                sub={c.sub}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AboutBadge({
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
    <div className="flex items-center gap-4 rounded-xl border border-white/[0.07] bg-white/[0.035] px-5 py-[18px] transition-colors duration-200 hover:bg-white/[0.055]">
      <div
        className={`min-w-[72px] shrink-0 font-[family-name:var(--font-display)] font-bold leading-none text-gold ${
          smallValue ? "text-[16px] leading-[1.2]" : "text-[24px]"
        }`}
      >
        {/* Support multi-line values like "OSHA\nStar" */}
        {value.split("\n").map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
      <div>
        <div className="mb-[2px] text-[14px] font-semibold text-white">
          {title}
        </div>
        <div className="text-[12px] text-white/40">{sub}</div>
      </div>
    </div>
  );
}
