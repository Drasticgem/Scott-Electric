import { CLIENTS } from "@/lib/data/clients";
import { Reveal } from "@/components/animations/Reveal";

/**
 * Trusted-by client row. White background, single bordered row of
 * 5 cells on desktop, wraps to 2-column grid on tablet, 1-column on
 * smaller phones via the same border-collapse approach as legacy.
 */
export function Clients() {
  return (
    <section
      aria-label="Trusted by South Texas' largest employers"
      className="bg-white py-16 max-[768px]:py-12"
    >
      <Reveal>
        <div className="container-1140">
          <p
            className="mb-6 text-center text-[10px] font-semibold uppercase text-mid-gray"
            style={{ letterSpacing: "0.18em" }}
          >
            Trusted by South Texas&apos; largest employers
          </p>
          <div
            className={[
              "flex overflow-hidden rounded-xl border border-warm-gray",
              // Wrap into half-width cells on tablet, dropping the outer border
              "max-[768px]:flex-wrap max-[768px]:rounded-none max-[768px]:border-0",
            ].join(" ")}
          >
            {CLIENTS.map((name, i) => (
              <div
                key={name}
                className={[
                  "flex flex-1 items-center justify-center px-3 py-[18px]",
                  "border-r border-warm-gray last:border-r-0",
                  "text-center text-[13px] font-semibold text-mid-gray",
                  "transition-colors duration-200 hover:bg-offwhite hover:text-navy",
                  // Tablet 2-col wrap
                  "max-[768px]:flex-none max-[768px]:basis-1/2",
                  "max-[768px]:border-b max-[768px]:border-warm-gray",
                  "max-[768px]:px-2 max-[768px]:py-[14px]",
                  i % 2 === 1 ? "max-[768px]:!border-r-0" : "",
                ].join(" ")}
                style={{ letterSpacing: "0.02em" }}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
