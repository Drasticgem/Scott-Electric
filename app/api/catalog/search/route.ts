import { NextResponse } from "next/server";
import { searchCatalogDiscs } from "@/lib/catalog/queries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";
  const limit = Number(searchParams.get("limit") ?? 6);

  const discs = await searchCatalogDiscs({ query, limit: Number.isFinite(limit) ? limit : 6 });
  return NextResponse.json({ discs });
}
