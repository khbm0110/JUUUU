# Cabinet Hassar — Next.js (FR/AR/EN, SEO-first)

## ✅ جاهز فعليًا الآن
- **توجيه حسب اللغة**: `/fr`, `/ar`, `/en` — كل لغة صفحة مستقلة تفهرسها جوجل لحالها (`app/[locale]/`)
- **11 صفحة مجال قانوني منفصلة × 3 لغات = 33 صفحة SEO** (`app/[locale]/services/[slug]/page.tsx`) — كل صفحة عندها title/description/canonical/hreflang خاص بيها، مبنية على نمط "مجال + الدار البيضاء" من بحث السوق
- `/` يعيد التوجيه تلقائيًا لـ `/fr` (لغة افتراضية واحدة، بدون محتوى مكرر)
- `sitemap.ts` يشمل كل الـ 33 + 3 صفحة تلقائيًا
- خطوط عربية (Noto Naskh/Sans Arabic) + لاتينية (Playfair/Inter) محمّلة معًا — كل حرف ياخذ الخط المناسب تلقائيًا
- أنيميشن متنوع بدون تكرار، ومتجه صح مع RTL (الاتجاه ينعكس تلقائيًا بالعربي)
- شعار SVG، Supabase مع fallback آمن، Google Reviews API مع fallback

## ⛔ يحتاج منك
1. **`ADMIN_PASSWORD`** — كلمة سر لوحة التحكم (`/admin`)، الآن سيرفر-فقط، ما تنكشف بالمتصفح إطلاقًا (خلاف المشروع القديم)
2. **Google Places API Key + Place ID** (`app/api/reviews/route.ts`, ولوحة التحكم)
3. **مشروع Supabase** (URL + anon key) — اختياري، الموقع يشتغل بدونه. شغّل `supabase-schema.sql` بمحرر SQL بسوبابيس لإنشاء الجداول
4. **الدومين الحقيقي** بدل `cabinet-hassar.ma`
5. صورة Open Graph حقيقية (1200×630) في `/public/og-image.jpg`

## 🎛️ لوحة التحكم (`/admin`)
- دخول بكلمة سر (`ADMIN_PASSWORD` بمتغيرات البيئة، مو بالكود)
- تعرض تقييمات جوجل ماب الحقيقية (لو ضبطت المفاتيح)
- تعرض رسائل نموذج التواصل (لو ربطت Supabase)
- تشتغل وتوضح بوضوح وش ناقص لو ما ضبطت شي بعد — ما تتعطل

## 🔜 التالي (اختياري)
- توسيع `SERVICE_COPY` بـ `lib/content.ts` لفقرتين-ثلاث بدل فقرة وحدة لكل صفحة مجال (محتوى أطول = ترتيب أفضل عادة)
- ربط `getSiteContent('testimonials', ...)` فعليًا بجدول Supabase حقيقي بدل الرجوع للـ fallback دايمًا

## تشغيل محلي
```bash
npm install
cp .env.example .env.local
npm run dev
# افتح http://localhost:3000 (يحولك تلقائيًا لـ /fr)
```
