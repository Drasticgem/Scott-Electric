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

export default async function DiscDetailPage({ params }: DiscDetailPageProps) {
  const { slug } = await params;
  const disc = await getCatalogDiscBySlug(slug);
  if (!disc) notFound();

  const [speed, glide, turn, fade] = disc.flightNumbers;
  const flightSummary =
    disc.flightSummary ||
    `${disc.mold} is a ${disc.category.toLowerCase()} with a ${speed}-speed profile, ${glide} glide, ${turn} turn, and ${fade} fade.`;
  const whatToExpect =
    disc.whatToExpect ||
    "Use the flight numbers as a quick read on speed, carry, high-speed turn, and finishing fade before comparing it against other molds in the DiscVault catalog.";
  const brandContext =
    disc.brandContext ||
    `${disc.brand} is represented in the public DiscVault catalog so players can compare molds, flight numbers, and disc classes before deciding what belongs in the bag.`;

  return (
    <section className="min-h-screen bg-surface py-14 max-[768px]:py-8">
      <div className="container-1140">
        <a href="/catalog" className="mb-8 inline-flex text-[14px] font-semibold text-muted transition hover:text-ink">
          ← Back to catalog
        </a>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="rounded-[38px] bg-paper p-8 shadow-[0_22px_70px_rgba(0,0,0,0.08)] max-[480px]:p-6">
            <div className="mb-8 flex min-h-10 items-center">
              {disc.brandLogoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- catalog brand logos are remote Supabase/public URLs with unknown domains.
                <img src={disc.brandLogoUrl} alt={`${disc.brand} logo`} className="max-h-12 max-w-[180px] object-contain" />
              ) : (
                <p className="text-[13px] font-black uppercase text-muted-light" style={{ letterSpacing: "0.14em" }}>
                  {disc.brand}
                </p>
              )}
            </div>

            <div className="grid items-center gap-8 sm:grid-cols-[1fr_0.92fr] lg:grid-cols-1 xl:grid-cols-[1fr_0.92fr]">
              <div>
                <h1 className="font-[family-name:var(--font-display)] text-[clamp(38px,5vw,72px)] font-black leading-[0.98] tracking-[-0.055em] text-ink">
                  {disc.mold}
                </h1>
                <p className="mt-4 text-[22px] text-muted">{disc.category}</p>
              </div>
              <div className="flex justify-center">
                <DiscImage src={disc.imageUrl} color={disc.color} alt={`${disc.brand} ${disc.mold}`} className="h-[220px] w-[220px] max-[480px]:h-[180px] max-[480px]:w-[180px]" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-4 rounded-[28px] bg-paper p-5 text-center shadow-sm">
              {[
                [speed, "Speed"],
                [glide, "Glide"],
                [turn, "Turn"],
                [fade, "Fade"],
              ].map(([value, label], index) => (
                <div key={label} className={index === 0 ? "" : "border-l border-border"}>
                  <div className="text-[32px] font-black leading-none text-ink">{value}</div>
                  <div className="mt-2 text-[13px] text-muted">{label}</div>
                </div>
              ))}
            </div>

            <InfoCard title="Flight Summary" body={flightSummary} />
            <InfoCard title="What to Expect" body={whatToExpect} />
            <InfoCard title="Brand Context" body={brandContext} />
          </div>
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
