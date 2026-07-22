import type { Metadata } from "next";
import { Logo } from "@/components/layout/Logo";
import { PartnerForm } from "@/components/forms/PartnerForm";
import { DISCVAULT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Support | DiscVault",
  description:
    "Need help with DiscVault? Reach the team directly and we'll get back to you.",
};

export default function SupportPage() {
  return (
    <section className="flex min-h-screen items-center bg-surface py-20 max-[768px]:py-14">
      <div className="mx-auto w-full max-w-[520px] px-6 text-center">
        <Logo size="md" className="inline-block" />

        <p
          className="mt-6 mb-2 text-[11px] font-semibold uppercase text-accent-dark"
          style={{ letterSpacing: "0.2em" }}
        >
          Support
        </p>
        <h1
          className="mb-4 font-[family-name:var(--font-display)] font-black text-ink"
          style={{ fontSize: "clamp(26px, 3.2vw, 34px)", lineHeight: 1.15 }}
        >
          Stuck on something?
        </h1>
        <p className="mb-10 text-[14px] leading-[1.7] text-ink-soft/80">
          Tell us what&apos;s going on and we&apos;ll get back to you within
          24 hours &mdash; or email us directly at{" "}
          <a
            href={DISCVAULT.supportEmailHref}
            className="font-medium text-accent-dark hover:underline"
          >
            {DISCVAULT.supportEmail}
          </a>
          .
        </p>

        <div className="text-left">
          <PartnerForm
            eyebrow="Support"
            heading="What can we help with?"
            defaultReason="I need support"
          />
        </div>
      </div>
    </section>
  );
}
