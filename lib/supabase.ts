import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * `supabase` is null when the env vars aren't set (e.g. local preview,
 * or before you've connected a project). Every call site MUST check for
 * null and fall back to the static content below — the homepage should
 * never break because Supabase isn't configured yet.
 */
export const supabase: SupabaseClient | null = url && key ? createClient(url, key) : null;

export const isSupabaseConnected = () => supabase !== null;

/**
 * Example of the required pattern: try Supabase, fall back to static data,
 * never throw. Use this shape for every data fetch in the app.
 */
export async function getSiteContent<T>(table: string, fallback: T): Promise<T> {
  if (!supabase) return fallback;
  try {
    const { data, error } = await supabase.from(table).select("*").single();
    if (error || !data) return fallback;
    return data as T;
  } catch {
    return fallback;
  }
}

/**
 * Testimonials are a list of rows, not a single record — separate helper
 * so the shape matches what page.tsx actually renders.
 */
export async function getTestimonials<T>(fallback: T[]): Promise<T[]> {
  if (!supabase) return fallback;
  try {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });
    if (error || !data || data.length === 0) return fallback;
    return data as T[];
  } catch {
    return fallback;
  }
}
