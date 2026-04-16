import { BUSINESS } from "@/lib/constants";
import { Reveal } from "@/components/animations/Reveal";
import { EstimateForm } from "@/components/forms/EstimateForm";

/**
 * Closing CTA — gold band with copy + phone CTA on the left, embedded
 * on-brand estimate form on the right. Anchor target for "#contact" links.
 */
export function CTA() {
  return (
    <section id="contact" className="bg-gold py-20 max-[768px]:py-14">
      <Reveal>
        <div className="container-1140 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
          {/* Copy + phone CTA */}
          <div className="max-[768px]:text-center">
            <p
              className="mb-3 text-[11px] font-semibold uppercase text-navy/70"
              style={{ letterSpacing: "0.2em" }}
            >
              Start your project
            </p>
            <h2
              className="mb-4 font-[family-name:var(--font-display)] font-black text-navy"
              style={{
                fontSize: "clamp(26px, 3.2vw, 40px)",
                lineHeight: 1.1,
              }}
            >
              Ready when you are.
            </h2>
            <p className="mb-6 max-w-[440px] text-[15px] leading-[1.65] text-navy/70 max-[768px]:mx-auto">
              Tell us about the job or give us a call. We&apos;ll get back to
              you within one business day with a free estimate.
            </p>
            <a
              href={BUSINESS.phoneHref}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-navy/30 bg-transparent px-6 py-[13px] text-[14px] font-semibold text-navy transition-[border-color,background] duration-200 hover:border-navy/55 hover:bg-navy/[0.04]"
              style={{ letterSpacing: "0.04em" }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
              </svg>
              Call {BUSINESS.phoneDisplay}
            </a>
          </div>

          {/* Embedded on-brand estimate form */}
          <div>
            <EstimateForm />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
