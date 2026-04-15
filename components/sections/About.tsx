import { BUSINESS } from "@/lib/constants";
import { Reveal } from "@/components/animations/Reveal";

/**
 * About Scott Group — copy-only section on navy. The credential badges
 * that used to live in the right column have moved into
 * WhyScottElectric. This section is a temporary single-column layout
 * until the next redesign pass.
 */
export function About() {
  return (
    <section id="about" className="bg-navy py-20 max-[768px]:py-12">
      <div className="container-1140">
        <Reveal className="mx-auto max-w-[720px]">
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
            className="inline-block rounded-lg border-[1.5px] border-gold/70 bg-transparent px-6 py-3 text-[13px] font-semibold text-gold transition-colors duration-200 hover:border-gold hover:bg-gold hover:text-navy"
            style={{ letterSpacing: "0.04em" }}
          >
            Read our full story →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
