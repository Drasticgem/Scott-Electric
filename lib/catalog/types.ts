export type FlightNumbers = [number, number, number, number];

export interface PublicCatalogDisc {
  id: string;
  slug: string;
  brand: string;
  brandSlug: string;
  mold: string;
  category: string;
  flightNumbers: FlightNumbers;
  imageUrl?: string | null;
  brandLogoUrl?: string | null;
  flightChartImage?: string | null;
  color: string;
}

export interface CatalogSearchParams {
  query?: string;
  limit?: number;
}
