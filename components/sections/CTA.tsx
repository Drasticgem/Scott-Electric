import { BUSINESS } from "@/lib/constants";
import { Reveal } from "@/components/animations/Reveal";

/**
 * Closing CTA strip — gold background, navy text, dual buttons.
 * Matches legacy .cta section. Anchor target for "#contact" links
 * elsewhere on the page until a real /contact route is added.
 */
export function CTA() {
  return (
    <section id="contact" className="bg-gold py-16 max-[768px]:py-12">
      <Reveal>
        <div className="container-1140 flex flex-wrap items-center justify-between gap-8 max-[768px]:flex-col max-[768px]:items-center max-[768px]:text-center">
          <div>
            <h2
              className="mb-2 font-[family-name:var(--font-display)] font-black text-navy"
              style={{
                fontSize: "clamp(22px, 2.4vw, 30px)",
                lineHeight: 1.2,
              }}
            >
              Ready to start your project?
            </h2>
            <p className="text-[14px] text-navy/60">
              Call {BUSINESS.phoneDisplay} or request a free estimate online.
              We&apos;ll get back to you within one business day.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3 max-[768px]:justify-center max-[480px]:w-full max-[480px]:flex-col">
            <a
              href="#contact"
              className="rounded-lg bg-navy px-7 py-[14px] text-[14px] font-bold text-white transition-[background,transform] duration-200 hover:-translate-y-px hover:bg-navy-mid max-[480px]:w-full max-[480px]:text-center"
              style={{ letterSpacing: "0.04em" }}
            >
              Get a Free Estimate
            </a>
            <a
              href={BUSINESS.phoneHref}
              className="rounded-lg border-2 border-navy/30 bg-transparent px-7 py-[14px] text-[14px] font-semibold text-navy transition-[border-color,background] duration-200 hover:border-navy/55 hover:bg-navy/[0.04] max-[480px]:w-full max-[480px]:text-center"
              style={{ letterSpacing: "0.04em" }}
            >
              Call Us Now
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
