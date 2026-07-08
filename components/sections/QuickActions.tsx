import { PlusCircle, Search, ScanLine, Sparkles, Play, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";

interface QuickAction {
  icon: LucideIcon;
  label: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  { icon: PlusCircle, label: "Add to Vault" },
  { icon: Search, label: "Search the catalog" },
  { icon: ScanLine, label: "Scan a disc" },
  { icon: Sparkles, label: "Ask DiscVault" },
  { icon: Play, label: "Start a round" },
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
              Add a disc before you forget.
            </h2>
            <p className="text-[15px] leading-[1.7] text-muted">
              Search the catalog, scan a disc, open your bag, or ask
              DiscVault what to throw — from one quick action sheet.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mx-auto w-full max-w-[360px] rounded-[28px] border border-border bg-surface p-3 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-border" />
            <ul className="space-y-1">
              {QUICK_ACTIONS.map((action) => (
                <li
                  key={action.label}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors hover:bg-paper"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-pale">
                    <action.icon
                      className="h-[18px] w-[18px] text-accent"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="text-[14px] font-medium text-ink-soft">
                    {action.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
