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
            These Terms of Service (&quot;Terms&quot;) are an agreement
            between you and{" "}
            <strong className="text-ink">{DISCVAULT.legalOperator}</strong>,
            operated as a sole proprietorship (&quot;we,&quot; &quot;us&quot;).
            By creating an account or using the DiscVault app, you agree to
            these Terms. If you don&apos;t agree, don&apos;t use DiscVault.
            Contact:{" "}
            <a
              href={DISCVAULT.emailHref}
              className="font-medium text-accent-dark hover:underline"
            >
              {DISCVAULT.email}
            </a>
            .
          </p>

          <TermsSection title="1. Eligibility">
            <p>
              You must be at least{" "}
              <strong className="text-ink">13 years old</strong> to use
              DiscVault. By using the App you confirm you meet this
              requirement.
            </p>
          </TermsSection>

          <TermsSection title="2. Your Account">
            <p>
              You&apos;re responsible for your account and for keeping access
              to it secure. Provide accurate information, and don&apos;t
              share your account or impersonate anyone else. You can delete
              your account at any time from inside the app.
            </p>
          </TermsSection>

          <TermsSection title="3. The Service">
            <p>
              DiscVault helps you catalog discs, build bags, track rounds,
              measure throws, and get AI-powered insights. A{" "}
              <strong className="text-ink">free tier</strong> includes core
              features with usage limits on AI features (for example,
              monthly limits on AI chat and weather analysis). A{" "}
              <strong className="text-ink">paid tier</strong> raises or
              removes those limits. We may adjust features and limits over
              time; if you&apos;re on a paid plan, material reductions will
              be communicated before your next billing period. Purchases
              made through the App Store are billed and managed by Apple
              under their terms.
            </p>
          </TermsSection>

          <TermsSection title="4. Your Content">
            <p>
              You own the content you put into DiscVault — your photos,
              notes, rounds, and vault data. You grant us the limited
              license needed to host, process, and display that content back
              to you and, where you choose (like rounds with friends), to
              other users you&apos;ve shared it with.
            </p>
            <p>
              <strong className="text-ink">Catalog contributions.</strong> If
              you submit discs, disc photos, specs, or course information to
              the shared catalog and it&apos;s approved, you grant us a
              perpetual, royalty-free license to display that contribution
              to all DiscVault users as part of the catalog. Submit only
              content you have the right to share.
            </p>
          </TermsSection>

          <TermsSection title="5. Acceptable Use">
            <p>
              Don&apos;t misuse DiscVault. That includes: attempting to
              access other users&apos; private data; circumventing usage
              limits or security controls; uploading unlawful, infringing, or
              abusive content; harassing other users; reverse-engineering
              the service; or using automated tools to scrape or overload
              it. We may suspend or terminate accounts that violate these
              Terms.
            </p>
          </TermsSection>

          <TermsSection title="6. AI Content Disclaimer">
            <p>
              DiscVault&apos;s AI features (disc recognition, summaries,
              insights, chat, and weather advice) generate content
              automatically and{" "}
              <strong className="text-ink">can be wrong</strong>. Disc
              identifications, flight characterizations, and recommendations
              are informational only — verify anything that matters. AI
              output is not professional advice of any kind.
            </p>
          </TermsSection>

          <TermsSection title="7. Rangefinder and GPS Accuracy">
            <p>
              Distance measurements depend on your device&apos;s GPS and
              motion sensors and are{" "}
              <strong className="text-ink">estimates</strong>, typically
              accurate to within several feet under open sky and less
              accurate under tree cover. Don&apos;t rely on DiscVault
              measurements where officially measured distances are required
              (for example, sanctioned competition records).
            </p>
          </TermsSection>

          <TermsSection title="8. Third-Party Services">
            <p>
              DiscVault integrates Apple services (Sign in with Apple, Apple
              Music, and weather data provided by{" "}
              <strong className="text-ink">Apple Weather</strong>), Google
              Sign-In, and other providers described in our{" "}
              <a
                href="/privacy"
                className="font-medium text-accent-dark hover:underline"
              >
                Privacy Policy
              </a>
              . Their services are governed by their own terms. Weather data
              is provided as-is; conditions on the course can differ.
            </p>
          </TermsSection>

          <TermsSection title="9. Termination">
            <p>
              You can stop using DiscVault and delete your account at any
              time. We may suspend or terminate accounts that violate these
              Terms or where required to protect the service or other users.
              Upon termination, your right to use the App ends and your data
              is deleted per our{" "}
              <a
                href="/privacy"
                className="font-medium text-accent-dark hover:underline"
              >
                Privacy Policy
              </a>
              .
            </p>
          </TermsSection>

          <TermsSection title="10. Disclaimers">
            <p>
              DiscVault is provided{" "}
              <strong className="text-ink">
                &quot;as is&quot; and &quot;as available.&quot;
              </strong>{" "}
              To the fullest extent permitted by law, we disclaim all
              warranties, express or implied, including merchantability,
              fitness for a particular purpose, and non-interruption of
              service. Disc golf is an outdoor activity — you&apos;re
              responsible for your own safety, awareness of conditions, and
              compliance with course rules.
            </p>
          </TermsSection>

          <TermsSection title="11. Limitation of Liability">
            <p>
              To the fullest extent permitted by law, we will not be liable
              for indirect, incidental, special, consequential, or punitive
              damages, or for lost data, profits, or goodwill, arising from
              your use of DiscVault. Our total liability for any claim is
              limited to the greater of{" "}
              <strong className="text-ink">$50</strong> or the amount you
              paid us in the twelve months before the claim. Some
              jurisdictions don&apos;t allow certain limitations, so parts of
              this section may not apply to you.
            </p>
          </TermsSection>

          <TermsSection title="12. Apple App Store">
            <p>
              These Terms are between you and us, not Apple. Apple has no
              obligation to provide support or maintenance for DiscVault and
              is not responsible for addressing any claims relating to the
              App. Apple is a third-party beneficiary of these Terms and may
              enforce them against you.
            </p>
          </TermsSection>

          <TermsSection title="13. Governing Law">
            <p>
              These Terms are governed by the laws of the{" "}
              <strong className="text-ink">State of Texas</strong>, USA,
              without regard to conflict-of-law rules. Disputes will be
              resolved in the state or federal courts located in Texas, and
              you consent to their jurisdiction.
            </p>
          </TermsSection>

          <TermsSection title="14. Changes to These Terms">
            <p>
              We may update these Terms as DiscVault evolves. Material
              changes will be flagged in the app, and continued use after
              changes take effect means you accept them. The effective date
              above always reflects the current version.
            </p>
          </TermsSection>

          <TermsSection title="Contact">
            <p>
              <strong className="text-ink">{DISCVAULT.legalOperator}</strong>
              <br />
              <a
                href={DISCVAULT.emailHref}
                className="font-medium text-accent-dark hover:underline"
              >
                {DISCVAULT.email}
              </a>
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
