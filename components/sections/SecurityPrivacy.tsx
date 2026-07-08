import { ShieldCheck, EyeOff, Lock, Trash2, FileText, UserX } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";

interface PrivacyPoint {
  icon: LucideIcon;
  title: string;
  description: string;
}

const PRIVACY_POINTS: PrivacyPoint[] = [
  {
    icon: EyeOff,
    title: "Browse without an account",
    description: "The full public catalog is open to everyone — no sign-in required.",
  },
  {
    icon: Lock,
    title: "Private by default",
    description: "Your personal vault stays private unless you choose to share it.",
  },
  {
    icon: UserX,
    title: "No data selling",
    description: "We don't sell your personal collection data to third parties.",
  },
  {
    icon: ShieldCheck,
    title: "Secure authentication",
    description: "Account access is protected with modern, secure authentication.",
  },
  {
    icon: Trash2,
    title: "Easy account deletion",
    description: "Delete your account and data at any time, right from the app.",
  },
  {
    icon: FileText,
    title: "Clear privacy policy",
    description: "Plain-language terms — no fine print designed to confuse you.",
  },
];

/**
 * SecurityPrivacy — positions privacy as a product feature, not legal
 * filler. Sets up the future public-vault-sharing feature without
 * needing to ship it yet.
 */
export function SecurityPrivacy() {
  return (
    <section id="security" aria-label="Security and privacy" className="bg-surface py-24 max-[768px]:py-16">
      <div className="container-1140">
        <Reveal>
          <div className="mx-auto mb-14 max-w-[560px] text-center">
            <p
              className="mb-3 text-[10px] font-semibold uppercase text-accent"
              style={{ letterSpacing: "0.22em" }}
            >
              Security &amp; Privacy
            </p>
            <h2
              className="font-[family-name:var(--font-display)] font-black text-ink"
              style={{
                fontSize: "clamp(26px, 3.2vw, 38px)",
                lineHeight: 1.15,
                letterSpacing: "-0.015em",
              }}
            >
              Your vault stays yours.
            </h2>
          </div>
        </Reveal>

        <Reveal
          stagger
          className="grid grid-cols-3 gap-4 max-[1024px]:grid-cols-2 max-[480px]:grid-cols-1"
        >
          {PRIVACY_POINTS.map((point) => (
            <div
              key={point.title}
              className="rounded-2xl border border-border bg-paper p-6 transition-[transform,box-shadow] duration-200 hover:-translate-y-[2px] hover:shadow-md"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent-pale">
                <point.icon className="h-5 w-5 text-accent" strokeWidth={2} aria-hidden="true" />
              </div>
              <div className="mb-1 text-[15px] font-semibold text-ink">
                {point.title}
              </div>
              <p className="text-[13px] leading-[1.6] text-muted">
                {point.description}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
