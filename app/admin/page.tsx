import { cookies } from "next/headers";
import { Star, RefreshCw, LogOut, MessageSquare } from "lucide-react";
import AdminLoginForm from "@/components/AdminLoginForm";
import { supabase, isSupabaseConnected } from "@/lib/supabase";

export const metadata = { robots: { index: false, follow: false } };

async function getGoogleReviews() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return { connected: false, reviews: [], rating: null };

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    if (data.status !== "OK") return { connected: false, reviews: [], rating: null };
    return { connected: true, reviews: data.result.reviews || [], rating: data.result.rating };
  } catch {
    return { connected: false, reviews: [], rating: null };
  }
}

async function getContactMessages() {
  if (!supabase) return [];
  const { data } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);
  return data || [];
}

export default async function AdminPage() {
  const authed = cookies().get("admin_session");
  if (!authed) return <AdminLoginForm />;

  const [{ connected, reviews, rating }, messages] = await Promise.all([
    getGoogleReviews(),
    getContactMessages(),
  ]);

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border bg-white">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="font-head font-semibold">لوحة التحكم — Cabinet Hassar</h1>
          <form action="/api/admin/logout" method="POST">
            <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-navy">
              <LogOut size={15} /> خروج
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-12">
        {/* Google Reviews */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold flex items-center gap-2">
              <Star size={16} className="text-gold" /> تقييمات جوجل ماب
              {rating && <span className="text-xs font-normal text-slate-500">({rating}/5)</span>}
            </h2>
            <form action="/admin" method="GET">
              <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-navy">
                <RefreshCw size={13} /> تحديث
              </button>
            </form>
          </div>

          {!connected ? (
            <div className="p-6 rounded-xl border border-dashed border-border text-sm text-slate-500">
              غير مربوط بعد. أضف <code className="bg-muted px-1.5 py-0.5 rounded">GOOGLE_PLACES_API_KEY</code> و
              <code className="bg-muted px-1.5 py-0.5 rounded mx-1">GOOGLE_PLACE_ID</code>
              بمتغيرات البيئة (Vercel → Settings → Environment Variables) لتظهر التقييمات الحقيقية هنا.
              الموقع بالواجهة الأمامية يستخدم الشهادات الثابتة لحد ما يتصل هذا.
            </div>
          ) : reviews.length === 0 ? (
            <p className="text-sm text-slate-500">لا توجد تقييمات بعد.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {reviews.map((r: any, i: number) => (
                <div key={i} className="p-5 rounded-xl border border-border bg-white">
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={13} className={s < r.rating ? "fill-gold text-gold" : "text-border"} />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 mb-3 line-clamp-4">{r.text}</p>
                  <span className="text-xs font-semibold">{r.author_name}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Contact messages */}
        <section>
          <h2 className="font-semibold flex items-center gap-2 mb-5">
            <MessageSquare size={16} className="text-gold" /> رسائل نموذج التواصل
          </h2>
          {!isSupabaseConnected() ? (
            <div className="p-6 rounded-xl border border-dashed border-border text-sm text-slate-500">
              غير مربوط بـ Supabase بعد — رسائل النموذج ما تنحفظ حاليًا. أضف
              <code className="bg-muted px-1.5 py-0.5 rounded mx-1">NEXT_PUBLIC_SUPABASE_URL</code>
              و
              <code className="bg-muted px-1.5 py-0.5 rounded mx-1">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
              وأنشئ جدول <code className="bg-muted px-1.5 py-0.5 rounded">contact_messages</code> (name, email, message, created_at).
            </div>
          ) : messages.length === 0 ? (
            <p className="text-sm text-slate-500">لا توجد رسائل بعد.</p>
          ) : (
            <div className="space-y-3">
              {messages.map((m: any, i: number) => (
                <div key={i} className="p-4 rounded-lg border border-border bg-white text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold">{m.name}</span>
                    <span className="text-xs text-slate-400">{new Date(m.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-1">{m.email}</p>
                  <p className="text-slate-600">{m.message}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
