import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DiscImage } from "@/components/catalog/DiscImage";
import { getCatalogDiscBySlug } from "@/lib/catalog/queries";

interface DiscDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: DiscDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const disc = await getCatalogDiscBySlug(slug);
  if (!disc) return { title: "Disc Not Found — DiscVault" };

  return {
    title: `${disc.mold} by ${disc.brand} — DiscVault Catalog`,
    description: `${disc.mold} flight numbers: ${disc.flightNumbers.join(" / ")}. View public DiscVault catalog details.`,
  };
}

// Long mold names (e.g. "Time-Lapse (Retooled)") need to shrink to stay
// legible on one or two lines instead of overflowing the card at full size.
function moldTitleSizeClass(mold: string) {
  if (mold.length > 22) return "text-[clamp(22px,4vw,40px)]";
  if (mold.length > 14) return "text-[clamp(28px,4.5vw,52px)]";
  return "text-[clamp(38px,5vw,72px)]";
}

export default async function DiscDetailPage({ params }: DiscDetailPageProps) {
  const { slug } = await params;
  const disc = await getCatalogDiscBySlug(slug);
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

        <div className={hasRightColumn ? "grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start" : ""}>
          <div className="space-y-6">
            <div className="rounded-[38px] bg-paper p-10 shadow-[0_22px_70px_rgba(0,0,0,0.08)] max-[480px]:p-6">
              <div className="mb-6 flex min-h-10 items-center justify-center">
                {disc.brandLogoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element -- catalog brand logos are remote Supabase/public URLs with unknown domains.
                  <img src={disc.brandLogoUrl} alt={`${disc.brand} logo`} className="max-h-12 max-w-[180px] object-contain" />
                ) : (
                  <p className="text-[13px] font-black uppercase text-muted-light" style={{ letterSpacing: "0.14em" }}>
                    {disc.brand}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-center gap-6 py-4 text-center">
                <DiscImage
                  src={disc.imageUrl}
                  color={disc.color}
                  alt={`${disc.brand} ${disc.mold}`}
                  className="h-[240px] w-[240px] max-[480px]:h-[190px] max-[480px]:w-[190px]"
                />
                <div>
                  <h1
                    className={`font-[family-name:var(--font-display)] font-black leading-[0.98] tracking-[-0.05em] text-ink ${moldTitleSizeClass(disc.mold)}`}
                  >
                    {disc.mold}
                  </h1>
                  <p className="mt-3 text-[20px] text-muted">{disc.category}</p>
                </div>
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
  return (
    <article className="rounded-[30px] bg-paper p-7 shadow-sm max-[480px]:p-6">
      <h2 className="mb-4 text-[20px] font-black text-ink">{title}</h2>
      <p className="text-[20px] font-semibold leading-[1.45] tracking-[-0.015em] text-ink-soft max-[768px]:text-[18px]">
        {body}
      </p>
    </article>
  );
}

function FlightNumbersCard({ flightNumbers }: { flightNumbers: [number, number, number, number] }) {
  const labels = ["Speed", "Glide", "Turn", "Fade"] as const;

  return (
    <div className="grid grid-cols-4 rounded-[28px] bg-paper p-5 text-center shadow-sm">
      {flightNumbers.map((value, index) => (
        <div key={labels[index]} className={index === 0 ? "" : "border-l border-border"}>
          <div className="text-[32px] font-black leading-none text-ink">{value}</div>
          <div className="mt-2 text-[13px] text-muted">{labels[index]}</div>
        </div>
      ))}
    </div>
  );
}
