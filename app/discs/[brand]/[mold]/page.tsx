import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DiscImage } from "@/components/catalog/DiscImage";
import { getDiscByBrandAndMold } from "@/lib/catalog/queries";

interface DiscDetailPageProps {
  params: Promise<{ brand: string; mold: string }>;
}

export async function generateMetadata({ params }: DiscDetailPageProps): Promise<Metadata> {
  const { brand, mold } = await params;
  const disc = await getDiscByBrandAndMold(brand, mold);
  if (!disc) return { title: "Disc Not Found — DiscVault" };

  return {
    title: `${disc.mold} by ${disc.brand} — DiscVault Catalog`,
    description: `${disc.mold} flight numbers: ${disc.flightNumbers.join(" / ")}. View public DiscVault catalog details.`,
    alternates: { canonical: `/discs/${disc.brandSlug}/${disc.moldSlug}` },
  };
}

// Long mold names (e.g. "Time-Lapse (Retooled)") should wrap onto a second
// line at a large size — same as the app — rather than shrink to fit one
// line. Sized generously enough that multi-word names reliably wrap
// instead of stretching edge-to-edge on one line.
function moldTitleSizeClass(mold: string) {
  if (mold.length > 28) return "text-[clamp(28px,6.5vw,48px)]";
  return "text-[clamp(40px,8vw,72px)]";
}

// Bolds the opening fragment up to (and including) the first "." or ","
// — the app's editorial treatment for these write-ups: a bold lede, then
// lighter continuation text.
function splitLede(text: string): [string, string] {
  const match = text.match(/^[^.,]*[.,]/);
  if (!match) return [text, ""];
  const lede = match[0];
  return [lede, text.slice(lede.length).trimStart()];
}

export default async function DiscDetailPage({ params }: DiscDetailPageProps) {
  const { brand, mold } = await params;
  const disc = await getDiscByBrandAndMold(brand, mold);
  if (!disc) notFound();

  const [speed, glide, turn, fade] = disc.flightNumbers;
  const hasRightColumn = Boolean(
    disc.flightChartImage || disc.flightSummary || disc.whatToExpect || disc.brandContext,
  );

  return (
    <section className="min-h-screen bg-surface py-14 max-[768px]:py-8">
      <div className="container-1140">
        <a href="/catalog" className="mb-8 inline-flex text-[14px] font-semibold text-muted transition hover:text-ink">
          ← Back to catalog
        </a>

        <div className={hasRightColumn ? "grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start" : ""}>
          <div className="space-y-6">
            <div className="rounded-[38px] bg-paper p-6 shadow-[0_22px_70px_rgba(0,0,0,0.08)] max-[480px]:p-5 lg:p-6">
              <div className="flex items-start justify-between gap-4 max-[480px]:gap-3">
                {disc.brandLogoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element -- catalog brand logos are remote Supabase/public URLs with unknown domains.
                  <img src={disc.brandLogoUrl} alt={`${disc.brand} logo`} className="max-h-14 max-w-[170px] object-contain object-left" />
                ) : (
                  <p className="pt-1 text-[13px] font-black uppercase text-muted-light" style={{ letterSpacing: "0.14em" }}>
                    {disc.brand}
                  </p>
                )}
                <DiscImage
                  src={disc.imageUrl}
                  color={disc.color}
                  alt={`${disc.brand} ${disc.mold}`}
                  className="h-[112px] w-[112px] shrink-0 max-[480px]:h-[105px] max-[480px]:w-[105px] lg:h-[142px] lg:w-[142px]"
                />
              </div>

              <div className="mt-3 max-[480px]:mt-1">
                <h1
                  className={`font-[family-name:var(--font-display)] font-black leading-[0.98] tracking-[-0.05em] text-ink ${moldTitleSizeClass(disc.mold)}`}
                >
                  {disc.mold}
                </h1>
                <p className="mt-1 text-[18px] text-muted">{disc.category}</p>
              </div>
            </div>

            <FlightNumbersCard flightNumbers={[speed, glide, turn, fade]} />
          </div>

          {hasRightColumn && (
            <div className="space-y-6">
              {disc.flightSummary && <InfoCard title="Flight Summary" body={disc.flightSummary} />}
              {disc.whatToExpect && <InfoCard title="What to Expect" body={disc.whatToExpect} />}
              {disc.brandContext && <InfoCard title="Brand Context" body={disc.brandContext} />}

              {disc.flightChartImage && (
                <div className="flex flex-col rounded-[30px] bg-paper p-8 shadow-sm max-[480px]:p-6">
                  <h2 className="mb-4 text-[20px] font-black text-ink">Flight Chart</h2>
                  {/* eslint-disable-next-line @next/next/no-img-element -- catalog flight chart images are remote Supabase/public URLs with unknown domains. */}
                  <img
                    src={disc.flightChartImage}
                    alt={`${disc.mold} flight chart`}
                    className="mx-auto h-auto w-full max-w-[360px] rounded-[22px] object-contain"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function InfoCard({ title, body }: { title: string; body: string }) {
  const [lede, rest] = splitLede(body);

  return (
    <article className="rounded-[30px] bg-paper p-7 shadow-sm max-[480px]:p-6">
      <h2 className="mb-4 font-[family-name:var(--font-display)] text-[20px] font-black text-ink">{title}</h2>
      <p className="font-[family-name:var(--font-editorial)] text-[19px] leading-[1.55] text-ink-soft max-[768px]:text-[17px]">
        <span className="font-bold text-ink">{lede}</span>
        {rest && ` ${rest}`}
      </p>
    </article>
  );
}

function FlightNumbersCard({ flightNumbers }: { flightNumbers: [number, number, number, number] }) {
  const labels = ["Speed", "Glide", "Turn", "Fade"] as const;

  return (
    <div className="flex items-center justify-between rounded-[28px] bg-paper px-6 py-5 shadow-sm">
      {flightNumbers.map((value, index) => (
        <div key={labels[index]} className="flex items-center gap-4 sm:gap-6">
          {index > 0 && <span className="h-1 w-1 shrink-0 rounded-full bg-border" aria-hidden="true" />}
          <div className="text-center">
            <div className="text-[28px] font-black leading-none text-ink">{value}</div>
            <div className="mt-2 text-[13px] text-muted">{labels[index]}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
