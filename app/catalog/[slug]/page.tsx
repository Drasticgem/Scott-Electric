import { notFound, redirect } from "next/navigation";
import { getDiscRouteById } from "@/lib/catalog/queries";

interface LegacyDiscRouteProps {
  params: Promise<{ slug: string }>;
}

// The old /catalog/<id> URL shape (a raw row id) — replaced by the
// readable /discs/<brand-slug>/<mold-slug> route. Kept as a redirect
// in case any of the old links already got shared or indexed.
export default async function LegacyDiscRoute({ params }: LegacyDiscRouteProps) {
  const { slug: id } = await params;
  const route = await getDiscRouteById(id);
  if (!route) notFound();

  redirect(`/discs/${route.brandSlug}/${route.moldSlug}`);
}
