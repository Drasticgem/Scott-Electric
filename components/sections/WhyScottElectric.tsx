import Image from "next/image";
import { CREDENTIALS } from "@/lib/data/credentials";
import { STATS } from "@/lib/data/stats";
import { Reveal } from "@/components/animations/Reveal";

/**
 * Why Scott Electric — full-bleed photo panel that bleeds directly under the
 * Coastal Kitchens division panel. Structured like a division card
 * (see `ServicePanel` in components/sections/Services.tsx) but two-column on
 * desktop: copy left, three credential cards right. Stats bar (year founded,
 * work orders, charitable giving, new customers) is pinned to the bottom of
 * the section so the whole "Why" moment reads as one continuous navy story.
 */
export function WhyScottElectric() {
  return (
    <section
      id="why-scott"
      aria-label="Why Scott Electric"
      className="bg-navy"
    >
      {/* ── Full-bleed photo panel ── */}
      <article
        className={[
          "group relative isolate overflow-hidden",
          // Taller than a division panel so the copy + 3 credential cards
          // never feel cramped. Mobile gets extra height so the stacked
          // copy and cards both breathe.
          "min-h-[620px] max-[1024px]:min-h-[580px] max-[768px]:min-h-[980px] max-[480px]:min-h-[940px]",
          // Seam under the last division panel
          "border-t border-white/5",
        ].join(" ")}
      >
        {/* Background photo */}
        <Image
          src="/images/safety.jpg"
          alt="Scott Electric safety and craftsmanship"
          fill
          sizes="100vw"
          className="object-cover object-center transition-transform duration-[700ms] ease-out group-hover:scale-[1.03]"
        />

        {/* Shadow overlay — dark on the left where text sits, fades to the
            right. On mobile we use a vertical sandwich gradient so both the
            copy block at the top and the credential cards at the bottom
            stay legible. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-navy/20 max-[768px]:bg-[linear-gradient(to_bottom,rgba(15,32,64,0.92)_0%,rgba(15,32,64,0.65)_28%,rgba(15,32,64,0.55)_55%,rgba(15,32,64,0.8)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent"
        />

        {/* Content — desktop: two columns centered vertically.
            Mobile: stacks to single column, copy first then cards. */}
        <div className="relative z-[1] flex min-h-[inherit] items-center">
          <div className="container-1140 grid w-full grid-cols-2 items-center gap-16 py-20 max-[1024px]:gap-12 max-[768px]:grid-cols-1 max-[768px]:gap-12 max-[768px]:py-24 max-[480px]:py-20">
            {/* Left column — copy */}
            <Reveal>
              <div className="max-w-[560px]">
                <p
                  className="mb-3 text-[10px] font-semibold uppercase text-gold"
                  style={{ letterSpacing: "0.22em" }}
                >
                  Why Scott Electric
                </p>
                <h2
                  className="mb-5 font-[family-name:var(--font-display)] font-black text-white"
                  style={{
                    fontSize: "clamp(28px, 3.6vw, 44px)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.015em",
                  }}
                >
                  Five generations of safety, trust, and craftsmanship.
                </h2>
                <p className="text-[15px] leading-[1.75] text-white/75 max-[480px]:text-[14px]">
                  Family-owned and operated since 1920, Scott Electric has
                  powered South Texas for over a century without ever cutting
                  a corner. Our industry-leading safety record, OSHA VPP Star
                  certification, and crews of licensed journeymen mean every
                  job — from a kitchen remodel to a refinery shutdown — is
                  built to last.
                </p>
              </div>
            </Reveal>

            {/* Right column — credential cards */}
            <Reveal
              stagger
              className="flex flex-col gap-3 max-[768px]:gap-3"
            >
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
      </article>

      {/* ── Stats bar pinned at the bottom of the section ── */}
      <Reveal>
        <div className="container-1140">
          <div
            className={[
              "grid grid-cols-4 max-[768px]:grid-cols-2",
              // Cell dividers (last cell in each row skips its right border)
              "[&>*]:border-r [&>*]:border-white/5",
              "[&>*:last-child]:border-r-0",
              "max-[768px]:[&>*:nth-child(2)]:border-r-0",
              // Subtle top divider separating the photo panel from the stats
              "border-t border-white/5",
            ].join(" ")}
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="px-6 py-8 text-center transition-colors duration-200 hover:bg-white/[0.015] max-[480px]:px-3 max-[480px]:py-5"
              >
                <div className="font-[family-name:var(--font-display)] text-[32px] font-bold leading-none text-gold max-[480px]:text-[24px]">
                  {stat.number}
                </div>
                <div
                  className="mt-[6px] text-[10px] font-medium uppercase text-white/40 max-[480px]:text-[9px]"
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

/* ── Credential card — visually identical to AboutBadge in About.tsx ── */
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
    <div className="flex items-center gap-4 rounded-xl border border-white/[0.08] bg-navy/75 px-5 py-[18px] transition-colors duration-200 hover:bg-navy/85">
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
