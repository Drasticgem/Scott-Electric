import { COMMUNITY } from "@/lib/data/community";
import { Reveal } from "@/components/animations/Reveal";

/**
 * Community & giving back. Light offwhite section with a 3-card grid.
 * Matches legacy .community section.
 */
export function Community() {
  return (
    <section id="community" className="bg-offwhite py-20 max-[768px]:py-12">
      <div className="container-1140">
        <Reveal>
          <p
            className="mb-2 text-[10px] font-semibold uppercase text-gold-dark"
            style={{ letterSpacing: "0.22em" }}
          >
            Community & Giving Back
          </p>
          <h2
            className="mb-4 font-[family-name:var(--font-display)] font-black text-navy"
            style={{
              fontSize: "clamp(26px, 2.8vw, 34px)",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
            }}
          >
            We&apos;ve always been part
            <br />
            of this community.
          </h2>
          <p className="mb-8 max-w-[560px] text-[15px] leading-[1.75] text-muted">
            Since 1920, Scott Group has been deeply rooted in the Coastal Bend
            — giving back to the organizations that make South Texas strong.
          </p>
        </Reveal>

        <Reveal
          stagger
          className="grid grid-cols-3 gap-4 max-[768px]:grid-cols-1 max-[768px]:gap-3"
        >
          {COMMUNITY.map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-warm-gray bg-white p-6 transition-[transform,box-shadow] duration-200 hover:-translate-y-[2px] hover:shadow-md"
            >
              <div className="mb-2 font-[family-name:var(--font-display)] text-[28px] font-bold leading-none text-gold">
                {card.number}
              </div>
              <div className="mb-[6px] text-[14px] font-semibold text-navy">
                {card.title}
              </div>
              <p className="text-[12px] leading-[1.65] text-muted">
                {card.description}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
