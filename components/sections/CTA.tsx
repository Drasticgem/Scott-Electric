import { DISCVAULT } from "@/lib/constants";
import { Reveal } from "@/components/animations/Reveal";
import { PartnerForm } from "@/components/forms/PartnerForm";

/**
 * Closing CTA — soft accent-tinted band with copy on the left and the
 * partner/support form on the right. Anchor target for "#contact" links.
 */
export function CTA() {
  return (
    <section id="contact" className="bg-accent-pale py-20 max-[768px]:py-14">
      <Reveal>
        <div className="container-1140 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
          {/* Copy */}
          <div className="max-[768px]:text-center">
            <p
              className="mb-3 text-[11px] font-semibold uppercase text-accent-dark"
              style={{ letterSpacing: "0.2em" }}
            >
              Get in touch
            </p>
            <h2
              className="mb-4 font-[family-name:var(--font-display)] font-black text-ink"
              style={{
                fontSize: "clamp(26px, 3.2vw, 40px)",
                lineHeight: 1.1,
              }}
            >
              Want to work with DiscVault?
            </h2>
            <p className="mb-6 max-w-[440px] text-[15px] leading-[1.65] text-ink-soft/80 max-[768px]:mx-auto">
              Whether you&apos;re a player, a retailer, a disc brand, or you
              spotted incorrect catalog data — we&apos;d love to hear from
              you.
            </p>
            <a
              href={DISCVAULT.supportEmailHref}
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink/15 bg-transparent px-6 py-[13px] text-[14px] font-semibold text-ink transition-[border-color,background] duration-200 hover:border-ink/30 hover:bg-white/40"
            >
              {DISCVAULT.supportEmail}
            </a>
          </div>

          {/* Embedded partner/support form */}
          <div>
            <PartnerForm />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
