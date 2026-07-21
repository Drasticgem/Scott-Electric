import type { Metadata } from "next";
import { DISCVAULT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service | DiscVault",
  description:
    "The terms that govern your use of the DiscVault website and iOS app.",
};

const EFFECTIVE_DATE = "July 21, 2026";

export default function TermsOfServicePage() {
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
          Terms of Service
        </h1>
        <p className="mb-12 text-[13px] text-muted">
          Effective {EFFECTIVE_DATE}
        </p>

        <div className="space-y-10 text-[15px] leading-[1.75] text-ink-soft/90">
          <p>
            These Terms of Service (&quot;Terms&quot;) govern your use of the
            DiscVault iOS app and the discvault.site website (together, the
            &quot;Service&quot;), operated by DiscVault (&quot;we,&quot;
            &quot;us&quot;). By using the Service, you agree to these Terms.
          </p>

          <TermsSection title="1. Using the Service">
            <p>
              The public disc catalog on discvault.site is free to browse and
              doesn&apos;t require an account. Creating a DiscVault account to
              build your own collection, bags, and rounds requires signing in
              with Apple, Google, or an email and password.
            </p>
            <p>
              You must be at least 13 years old to create an account. You&apos;re
              responsible for the accuracy of the information you provide and
              for keeping your account credentials secure.
            </p>
          </TermsSection>

          <TermsSection title="2. Your content">
            <p>
              You retain ownership of the content you add to your account
              &mdash; your collection data, notes, and photos (&quot;Your
              Content&quot;). By submitting Your Content, you grant us a
              limited license to store, process, and display it back to you
              as part of operating the Service. We don&apos;t sell Your
              Content or use it to train third-party models.
            </p>
            <p>
              You&apos;re responsible for Your Content and for having the
              right to upload it (for example, photos you take yourself).
            </p>
          </TermsSection>

          <TermsSection title="3. Catalog data">
            <p>
              The public disc catalog includes flight numbers, specs, and
              descriptions gathered from manufacturer and public sources. We
              work to keep it accurate but don&apos;t guarantee it&apos;s
              complete or error-free. If you spot something wrong, tell us
              &mdash; we&apos;d rather fix it than leave it.
            </p>
          </TermsSection>

          <TermsSection title="4. Acceptable use">
            <p>You agree not to:</p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>Use the Service for anything unlawful or to infringe someone else&apos;s rights</li>
              <li>Attempt to access another user&apos;s account or data</li>
              <li>Scrape, bulk-extract, or resell catalog data</li>
              <li>Interfere with or disrupt the Service&apos;s infrastructure</li>
              <li>Upload content that&apos;s abusive, illegal, or violates someone else&apos;s intellectual property</li>
            </ul>
          </TermsSection>

          <TermsSection title="5. Account termination">
            <p>
              You can delete your account at any time from the app&apos;s
              account settings, which removes Your Content as described in
              our{" "}
              <a href="/privacy" className="font-medium text-accent-dark hover:underline">
                Privacy Policy
              </a>
              . We may suspend or terminate accounts that violate these
              Terms.
            </p>
          </TermsSection>

          <TermsSection title="6. Disclaimers">
            <p>
              The Service is provided &quot;as is,&quot; without warranties of
              any kind. Disc golf involves inherent physical risk on the
              course; DiscVault is a collection and tracking tool, not a
              guarantee of course safety, conditions, or accuracy of
              third-party data.
            </p>
          </TermsSection>

          <TermsSection title="7. Limitation of liability">
            <p>
              To the fullest extent permitted by law, DiscVault is not liable
              for any indirect, incidental, or consequential damages arising
              from your use of the Service.
            </p>
          </TermsSection>

          <TermsSection title="8. Changes to the Service or these Terms">
            <p>
              We may update the Service or these Terms as DiscVault evolves.
              We&apos;ll update the effective date above when we do, and post
              material changes in the app or on this page. Continued use of
              the Service after changes means you accept the updated Terms.
            </p>
          </TermsSection>

          <TermsSection title="9. Contact us">
            <p>
              Questions about these Terms? Email us at{" "}
              <a
                href={DISCVAULT.emailHref}
                className="font-medium text-accent-dark hover:underline"
              >
                {DISCVAULT.email}
              </a>
              .
            </p>
          </TermsSection>
        </div>
      </div>
    </section>
  );
}

function TermsSection({
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
