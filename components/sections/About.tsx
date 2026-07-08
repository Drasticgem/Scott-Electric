import { Disc3 } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";

/**
 * About DiscVault — two-column layout on desktop (text left, placeholder
 * app-preview panel right). The placeholder panel stands in for real
 * product photography until final app screenshots are ready.
 */
export function About() {
  return (
    <section id="about" className="bg-paper py-20 max-[768px]:py-12">
      <div className="container-1140">
        <div className="md:flex md:items-start md:gap-12">
          {/* Text column */}
          <Reveal className="max-w-[520px] max-[768px]:max-w-none">
            <p
              className="mb-3 text-[10px] font-semibold uppercase text-accent"
              style={{ letterSpacing: "0.22em" }}
            >
              About DiscVault
            </p>
            <h2
              className="mb-4 font-[family-name:var(--font-display)] font-black text-ink"
              style={{
                fontSize: "clamp(22px, 2.4vw, 30px)",
                lineHeight: 1.2,
              }}
            >
              Built for disc golfers, not spreadsheets
            </h2>

            {/* Placeholder preview — mobile only */}
            <div className="my-6 md:hidden">
              <AppPreviewPlaceholder />
            </div>

            <p className="mb-6 text-[14px] leading-[1.8] text-muted">
              DiscVault is built for players who care about their discs —
              from first putter to tournament bag. It combines a growing
              disc catalog, personal vault tools, bag organization, round
              context, and intelligent recommendations into one clean app.
            </p>
            <a
              href="#why"
              className="inline-block rounded-full border-[1.5px] border-accent/60 bg-transparent px-6 py-3 text-[13px] font-semibold text-accent transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-white"
            >
              Read our story →
            </a>
          </Reveal>

          {/* Placeholder preview — desktop only */}
          <Reveal className="hidden shrink-0 md:block md:w-[380px]">
            <AppPreviewPlaceholder />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function AppPreviewPlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl border border-border bg-surface"
    >
      <Disc3 className="h-14 w-14 text-accent/50" strokeWidth={1.5} />
    </div>
  );
}
