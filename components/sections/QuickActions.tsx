import { Camera, Search, PersonStanding, SquarePen, Lock, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";

interface QuickAction {
  icon: LucideIcon;
  label: string;
  description: string;
  badge?: string;
  iconBg: string;
  iconColor: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    icon: Camera,
    label: "Vault Disc",
    description: "Identify any disc instantly using your camera.",
    badge: "Most Powerful Tool",
    iconBg: "bg-accent-pale",
    iconColor: "text-accent",
  },
  {
    icon: Search,
    label: "Disc Database",
    description: "Explore discs from every brand.",
    iconBg: "bg-accent-pale",
    iconColor: "text-accent",
  },
  {
    icon: PersonStanding,
    label: "Rangefinder",
    description: "Measure throw distance with GPS.",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    icon: SquarePen,
    label: "Manual Vault",
    description: "Add manually or import a CSV.",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
  },
];

/**
 * QuickActions — a smaller feature spotlight for the app's quick-action
 * sheet, separate from the four main tabs so it reads as a "designed for
 * speed" moment rather than competing with the core tab structure.
 */
export function QuickActions() {
  return (
    <section
      aria-label="Quick actions"
      className="border-t border-border bg-paper py-20 max-[768px]:py-14"
    >
      <div className="container-1140 grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] max-[768px]:gap-10">
        <Reveal>
          <div className="max-[768px]:text-center">
            <p
              className="mb-3 text-[10px] font-semibold uppercase text-accent"
              style={{ letterSpacing: "0.22em" }}
            >
              Quick Actions
            </p>
            <h2
              className="mb-4 font-[family-name:var(--font-display)] font-black text-ink"
              style={{
                fontSize: "clamp(24px, 2.8vw, 32px)",
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
              }}
            >
              Scan, measure, discover, and manage discs.
            </h2>
            <p className="text-[15px] leading-[1.7] text-muted">
              Identify a disc with your camera, search the full database,
              measure a throw, or add discs manually — all from one quick
              action sheet.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mx-auto w-full max-w-[380px] rounded-[28px] border border-border bg-surface p-3 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-border" />
            <ul className="space-y-2 p-1">
              {QUICK_ACTIONS.map((action) => (
                <li
                  key={action.label}
                  className="flex items-start gap-3 rounded-2xl bg-paper px-4 py-3"
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${action.iconBg}`}
                  >
                    <action.icon
                      className={`h-[18px] w-[18px] ${action.iconColor}`}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </span>
                  <span>
                    {action.badge && (
                      <span className="mb-[2px] block text-[10px] font-semibold uppercase text-accent" style={{ letterSpacing: "0.08em" }}>
                        {action.badge}
                      </span>
                    )}
                    <span className="block text-[14px] font-semibold text-ink">
                      {action.label}
                    </span>
                    <span className="block text-[12px] leading-[1.4] text-muted">
                      {action.description}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2 flex items-center justify-center gap-[6px] py-2 text-[11px] text-muted-light">
              <Lock className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
              Your data is private and never shared.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
