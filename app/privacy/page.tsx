import type { Metadata } from "next";
import { DISCVAULT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | DiscVault",
  description:
    "How DiscVault collects, uses, and protects your information across the website and iOS app.",
};

const EFFECTIVE_DATE = "July 21, 2026";

const SERVICE_PROVIDERS = [
  { provider: "Supabase", purpose: "Database, authentication, and file storage (our backend)" },
  { provider: "Anthropic", purpose: "AI features (processing only, as described above)" },
  {
    provider: "Apple",
    purpose: "Sign in with Apple, Apple Weather (WeatherKit), Apple Music, on-device speech recognition",
  },
  { provider: "Google", purpose: "Sign in with Google" },
  { provider: "DiscIt API", purpose: "Public disc specifications for the catalog — no personal data is sent" },
];

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
            DiscVault (&quot;the App&quot;) is operated by{" "}
            <strong className="text-ink">{DISCVAULT.legalOperator}</strong>, a
            sole proprietor based in the United States (&quot;we,&quot;
            &quot;us&quot;). This policy explains what information DiscVault
            collects, how it is used, and the choices you have. Questions or
            requests:{" "}
            <a
              href={DISCVAULT.emailHref}
              className="font-medium text-accent-dark hover:underline"
            >
              {DISCVAULT.email}
            </a>
            .
          </p>

          <p>
            The short version: DiscVault collects what it needs to run your
            disc golf vault and nothing more. There are{" "}
            <strong className="text-ink">
              no ads, no analytics or tracking SDKs, and we never sell your
              data
            </strong>
            .
          </p>

          <PolicySection title="1. Information You Provide">
            <ul className="ml-5 list-disc space-y-2">
              <li>
                <strong className="text-ink">Account information.</strong>{" "}
                When you create an account we receive your email address and,
                if you use Sign in with Apple or Google, the name and email
                those services share. Authentication is handled by our
                backend provider, Supabase.
              </li>
              <li>
                <strong className="text-ink">Profile.</strong> Display name,
                username, and an optional profile photo.
              </li>
              <li>
                <strong className="text-ink">
                  Your vault and gameplay content.
                </strong>{" "}
                Discs you catalog (including photos you take or upload),
                bags, rounds and scorecards (including names you enter for
                guest players), notes, and personal flight-number tuning.
              </li>
              <li>
                <strong className="text-ink">Measured throws.</strong> If you
                use the Rangefinder, we store the start/end GPS coordinates
                and distance of throws you choose to save.
              </li>
              <li>
                <strong className="text-ink">AI conversations.</strong>{" "}
                Messages you send to DiscVault AI are stored so you can
                revisit your chat history.
              </li>
              <li>
                <strong className="text-ink">
                  Feature requests and support messages.
                </strong>{" "}
                Anything you submit through the in-app forms.
              </li>
            </ul>
          </PolicySection>

          <PolicySection title="2. Device Permissions and How They're Used">
            <p>
              DiscVault requests permissions only when a feature needs them:
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                <strong className="text-ink">Camera</strong> — to photograph
                discs for scanning and your vault.
              </li>
              <li>
                <strong className="text-ink">
                  Location (while using the app)
                </strong>{" "}
                — to show local weather, find nearby courses, and measure
                throw distances. Your location for weather is used at request
                time and is not stored on our servers; only throws you
                explicitly save keep their coordinates.
              </li>
              <li>
                <strong className="text-ink">Motion</strong> — to keep short
                Rangefinder measurements accurate when GPS is limited. Motion
                data stays on your device.
              </li>
              <li>
                <strong className="text-ink">
                  Microphone and speech recognition
                </strong>{" "}
                — to let you dictate questions to DiscVault AI. Speech is
                transcribed using Apple&apos;s speech services; we receive
                only the resulting text if you send it.
              </li>
              <li>
                <strong className="text-ink">Apple Music</strong> — to play
                your playlists inside the app. We never see your Apple Music
                account details.
              </li>
            </ul>
            <p>Denying any permission only disables the related feature.</p>
          </PolicySection>

          <PolicySection title="3. AI Features">
            <p>
              Disc scanning, disc summaries, vault insights, weather advice,
              and DiscVault AI chat are powered by{" "}
              <strong className="text-ink">Anthropic&apos;s Claude models</strong>,
              called securely from our servers. When you use these features,
              the relevant content (for example, a disc photo you scan, or
              the message you type) is sent to Anthropic for processing. Per
              Anthropic&apos;s API terms, this data is not used to train
              their models. AI usage is metered per account to enforce plan
              limits; we store counters, not extra copies of your content.
            </p>
          </PolicySection>

          <PolicySection title="4. Service Providers">
            <p>
              We share data only with the providers required to run
              DiscVault:
            </p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full border-collapse text-left text-[14px]">
                <thead>
                  <tr className="bg-surface">
                    <th className="border-b border-border px-4 py-3 font-semibold text-ink">
                      Provider
                    </th>
                    <th className="border-b border-border px-4 py-3 font-semibold text-ink">
                      Purpose
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SERVICE_PROVIDERS.map((row, i) => (
                    <tr key={row.provider} className={i > 0 ? "border-t border-border" : ""}>
                      <td className="px-4 py-3 font-medium text-ink align-top whitespace-nowrap">
                        {row.provider}
                      </td>
                      <td className="px-4 py-3 text-ink-soft/90 align-top">
                        {row.purpose}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              We do not sell or rent your personal information to anyone, and
              we don&apos;t share it for cross-app advertising or tracking.
            </p>
          </PolicySection>

          <PolicySection title="5. What Other Users Can See">
            <ul className="ml-5 list-disc space-y-2">
              <li>
                Your <strong className="text-ink">username, display name, and profile photo</strong>{" "}
                are discoverable by other users through friend search.
              </li>
              <li>
                Rounds you play with friends are visible to the participants
                of that round.
              </li>
              <li>
                If you{" "}
                <strong className="text-ink">
                  submit a disc, disc photo, or course edit to the shared
                  catalog
                </strong>{" "}
                and it&apos;s approved, that contribution becomes part of the
                public catalog visible to all users (your personal vault
                stays private).
              </li>
            </ul>
            <p>
              Your vault, bags, photos, measured throws, and AI conversations
              are private to your account.
            </p>
          </PolicySection>

          <PolicySection title="6. Storage and Security">
            <p>
              Your data is stored with Supabase in the United States. Vault
              photos live in private storage accessible only through
              short-lived signed links. Database access is enforced
              per-account with row-level security. AI calls are made
              server-side so API credentials never live on your device.
            </p>
          </PolicySection>

          <PolicySection title="7. Retention and Deletion">
            <p>
              Your data is kept for as long as your account exists. You can{" "}
              <strong className="text-ink">
                delete your account from inside the app
              </strong>{" "}
              (Profile → account actions); this permanently removes your
              account and personal data from our servers and clears cached
              data on your device. You may also email{" "}
              <a
                href={DISCVAULT.emailHref}
                className="font-medium text-accent-dark hover:underline"
              >
                {DISCVAULT.email}
              </a>{" "}
              to request deletion or a copy of your data, and we&apos;ll
              respond within 30 days.
            </p>
          </PolicySection>

          <PolicySection title="8. Children">
            <p>
              DiscVault is not intended for children under 13, and we do not
              knowingly collect personal information from them. If you
              believe a child under 13 has created an account, contact us and
              we will delete it.
            </p>
          </PolicySection>

          <PolicySection title="9. Your Rights">
            <p>
              Depending on where you live (for example, California or the
              EU/UK), you may have rights to access, correct, delete, or
              receive a copy of your personal data, and to object to certain
              processing. DiscVault gives you most of these directly in the
              app; for anything else, email{" "}
              <a
                href={DISCVAULT.emailHref}
                className="font-medium text-accent-dark hover:underline"
              >
                {DISCVAULT.email}
              </a>
              . We don&apos;t discriminate against you for exercising these
              rights, and we have no &quot;sale&quot; or &quot;sharing&quot;
              of personal information to opt out of.
            </p>
          </PolicySection>

          <PolicySection title="10. Changes">
            <p>
              We&apos;ll update this policy as DiscVault evolves. Material
              changes will be flagged in the app, and the effective date
              above always reflects the current version.
            </p>
          </PolicySection>

          <PolicySection title="Contact">
            <p>
              <strong className="text-ink">{DISCVAULT.legalOperator}</strong>
              <br />
              Operator, DiscVault
              <br />
              <a
                href={DISCVAULT.emailHref}
                className="font-medium text-accent-dark hover:underline"
              >
                {DISCVAULT.email}
              </a>
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
