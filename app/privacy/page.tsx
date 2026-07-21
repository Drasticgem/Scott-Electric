import type { Metadata } from "next";
import { DISCVAULT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | DiscVault",
  description:
    "How DiscVault collects, uses, and protects your information across the website and iOS app.",
};

const EFFECTIVE_DATE = "July 21, 2026";

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-paper py-20 max-[768px]:py-14">
      <div className="container-1140 max-w-[760px]">
        <p
          className="mb-3 text-[11px] font-semibold uppercase text-accent-dark"
          style={{ letterSpacing: "0.2em" }}
        >
          Legal
        </p>
        <h1
          className="mb-3 font-[family-name:var(--font-display)] font-black text-ink"
          style={{ fontSize: "clamp(28px, 4vw, 42px)", lineHeight: 1.1 }}
        >
          Privacy Policy
        </h1>
        <p className="mb-12 text-[13px] text-muted">
          Effective {EFFECTIVE_DATE}
        </p>

        <div className="space-y-10 text-[15px] leading-[1.75] text-ink-soft/90">
          <p>
            DiscVault (&quot;DiscVault,&quot; &quot;we,&quot; &quot;us&quot;) provides the DiscVault
            iOS app and the discvault.site website. This policy explains what
            information we collect, how we use it, and the choices you have
            &mdash; in plain language, not legal filler.
          </p>

          <PolicySection title="Information we collect">
            <PolicySub title="Account information">
              When you create a DiscVault account, you can sign in with Apple,
              sign in with Google, or with your email address and a password.
              Depending on the method you choose, we receive your name, email
              address, and a unique identifier from that sign-in provider. We
              never see or store your Apple or Google password.
            </PolicySub>
            <PolicySub title="Your content">
              Data you enter in the app to build your collection &mdash;
              discs, bags, rounds, notes, and any photos you upload of your
              discs.
            </PolicySub>
            <PolicySub title="Location data">
              If you use round tracking, we collect the course location for
              that round. Location access is optional and only requested when
              you use that feature; you can deny or revoke it at any time in
              iOS Settings without losing the rest of the app&apos;s
              functionality.
            </PolicySub>
            <PolicySub title="Usage &amp; diagnostic data">
              We use analytics and crash-reporting tools to understand how the
              app is used and to catch bugs. This is aggregated,
              device-level, and diagnostic data &mdash; not the contents of
              your collection.
            </PolicySub>
            <PolicySub title="Website &amp; contact form">
              Browsing the public disc catalog on discvault.site
              doesn&apos;t require an account and isn&apos;t linked to any
              personal data. If you use the contact form, we collect the
              name, email, and message you submit solely to reply to you
              &mdash; it&apos;s emailed directly to our support inbox and
              isn&apos;t stored in a marketing database. The site uses
              privacy-friendly, cookieless analytics (Vercel Web Analytics)
              that reports aggregate traffic patterns, not individual
              visitors.
            </PolicySub>
          </PolicySection>

          <PolicySection title="How we use your information">
            <p>We use the information above to:</p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>Create and secure your account</li>
              <li>Sync your collection, bags, and rounds across your devices</li>
              <li>Respond to support and contact requests</li>
              <li>Diagnose crashes and improve app reliability</li>
              <li>Maintain the security of the app and website</li>
            </ul>
          </PolicySection>

          <PolicySection title="What we don't do">
            <p>
              We don&apos;t sell your personal data. We don&apos;t share your
              collection data with disc brands, retailers, or advertisers.
              Your vault stays private unless you explicitly choose to share
              it (for features that offer sharing).
            </p>
          </PolicySection>

          <PolicySection title="Who we share information with">
            <p>
              We share information only with the service providers that make
              DiscVault work, and only as needed for them to provide that
              service:
            </p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>Apple and Google, when you use their sign-in options</li>
              <li>Our backend and database provider, to store your account and collection data</li>
              <li>Analytics and crash-reporting providers, for diagnostic data described above</li>
              <li>Our email provider, to deliver contact form messages</li>
            </ul>
            <p>
              We may also disclose information if required by law, or to
              protect the rights, safety, and security of DiscVault and its
              users.
            </p>
          </PolicySection>

          <PolicySection title="Data security">
            <p>
              We use industry-standard measures &mdash; including encrypted
              connections and secure authentication &mdash; to protect your
              information. No method of transmission or storage is 100%
              secure, but we work to protect your data appropriately.
            </p>
          </PolicySection>

          <PolicySection title="Your choices">
            <ul className="ml-5 list-disc space-y-1.5">
              <li>Edit or delete individual discs, bags, rounds, or photos at any time in the app</li>
              <li>Delete your account and associated data at any time from the app&apos;s account settings</li>
              <li>Revoke location permission at any time in iOS Settings</li>
              <li>Contact us to ask what data we hold or to request deletion</li>
            </ul>
          </PolicySection>

          <PolicySection title="Children's privacy">
            <p>
              DiscVault is not directed at children under 13, and we don&apos;t
              knowingly collect personal information from children under 13.
              If you believe a child has provided us with personal
              information, contact us and we&apos;ll delete it.
            </p>
          </PolicySection>

          <PolicySection title="Changes to this policy">
            <p>
              We may update this policy as DiscVault evolves. We&apos;ll
              update the effective date above when we do, and post material
              changes in the app or on this page.
            </p>
          </PolicySection>

          <PolicySection title="Contact us">
            <p>
              Questions about this policy or your data? Email us at{" "}
              <a
                href={DISCVAULT.emailHref}
                className="font-medium text-accent-dark hover:underline"
              >
                {DISCVAULT.email}
              </a>
              .
            </p>
          </PolicySection>
        </div>
      </div>
    </section>
  );
}

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-3 text-[19px] font-bold text-ink">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function PolicySub({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-1 text-[15px] font-semibold text-ink">{title}</h3>
      <p>{children}</p>
    </div>
  );
}
