import { NextResponse } from "next/server";

/**
 * Pulls real reviews from Google Maps via the Places API (Place Details,
 * "reviews" field — Google caps this at the 5 most relevant reviews per
 * call; there is no way to get the full review list through this API).
 *
 * Requires two things from the project owner, set as env vars:
 *   GOOGLE_PLACES_API_KEY   — from Google Cloud Console (Places API enabled)
 *   GOOGLE_PLACE_ID         — the Cabinet's Place ID (findable via
 *                             https://developers.google.com/maps/documentation/places/web-service/place-id)
 *
 * Until both are set, this returns null and the homepage keeps using the
 * static fallback testimonials — it never breaks the page.
 */
export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json({ connected: false, reviews: null });
  }

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`,
      { next: { revalidate: 86400 } } // cache 24h — stay within API quota
    );
    const data = await res.json();
    if (data.status !== "OK") {
      return NextResponse.json({ connected: false, reviews: null, error: data.status });
    }
    return NextResponse.json({ connected: true, reviews: data.result.reviews, rating: data.result.rating });
  } catch {
    return NextResponse.json({ connected: false, reviews: null });
  }
}
