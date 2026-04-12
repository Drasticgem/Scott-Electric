import { STATS } from "@/lib/data/stats";

/**
 * 4-column stats bar on navy. <768px collapses to 2×2.
 * Matches legacy .stats-bar exactly.
 */
export function Stats() {
  return (
    <section
      aria-label="Company statistics"
      className="border-t border-white/5 bg-navy"
    >
      <div className="container-1140">
        <div
          className={[
            "grid grid-cols-4 max-[768px]:grid-cols-2",
            // Gold cell dividers (last cell in each row skips its right border)
            "[&>*]:border-r [&>*]:border-white/5",
            "[&>*:last-child]:border-r-0",
            "max-[768px]:[&>*:nth-child(2)]:border-r-0",
          ].join(" ")}
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="px-6 py-8 text-center transition-colors duration-200 hover:bg-white/[0.015] max-[480px]:px-3 max-[480px]:py-5"
            >
              <div className="font-[family-name:var(--font-display)] text-[32px] font-bold leading-none text-gold max-[480px]:text-[24px]">
                {stat.number}
              </div>
              <div
                className="mt-[6px] text-[10px] font-medium uppercase text-white/40 max-[480px]:text-[9px]"
                style={{ letterSpacing: "0.12em" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
