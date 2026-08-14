import Image from "next/image";
import Link from "next/link";
import { Scale, Phone, Mail, MapPin, Star, ArrowRight, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import { getTestimonials } from "@/lib/supabase";
import { LOCALES, Locale, DIR, PAGE, SERVICES, TESTIMONIALS as FALLBACK_TESTIMONIALS, CONTACT } from "@/lib/content";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function Home({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = PAGE[locale];
  const isAr = locale === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  // Tries Supabase if connected, falls back to static testimonials —
  // the homepage renders correctly either way.
  const testimonials = await getTestimonials(FALLBACK_TESTIMONIALS);

  return (
    <>
      <Header locale={locale} />

      {/* HERO */}
      <section id="hero" className="max-w-6xl mx-auto px-6 pt-20 pb-24 grid lg:grid-cols-12 gap-14 items-center">
        <Reveal variant={isAr ? "slide-in-end" : "slide-in-start"} className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-7 px-4 py-1.5 rounded-full bg-gold-pale text-gold">
            <MapPin size={12} /> {t.hero.badge}
          </div>
          <h1 className="font-head font-semibold leading-tight mb-6 text-[clamp(2.1rem,4.5vw,3.4rem)]">
            {t.hero.title}
          </h1>
          <p className="text-lg mb-10 max-w-lg text-slate-600 leading-relaxed">{t.hero.subtitle}</p>
          <div className="flex flex-wrap gap-4">
            <a href={`tel:${CONTACT.phone}`} dir="ltr" className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-sm bg-navy text-white">
              <Phone size={16} /> {CONTACT.phoneDisplay}
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-sm border border-navy">
              {t.nav.cta}
            </a>
          </div>
        </Reveal>

        <Reveal variant="scale-in" delay={150} className="lg:col-span-5">
          <div className="relative max-w-sm mx-auto">
            <div className="absolute -inset-3 rounded-3xl border border-gold opacity-30" />
            <div className="rounded-2xl overflow-hidden relative aspect-[3/4] bg-muted">
              <Image src="https://i.postimg.cc/cLHpV0BJ/photo-fatima.webp" alt="Maître Fatima Azzahraa Hassar" fill className="object-cover object-top" priority />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-stretch">
          <Reveal variant={isAr ? "slide-in-end" : "slide-in-start"} className="relative max-w-md lg:h-full">
            <div className="rounded-2xl overflow-hidden relative aspect-[4/5] lg:aspect-auto lg:h-full bg-muted">
              <Image src="https://i.postimg.cc/cLHpV0BJ/photo-fatima.webp" alt="Maître Fatima Azzahraa Hassar" fill className="object-cover object-top" />
            </div>
          </Reveal>
          <Reveal variant="fade-up" delay={100} className="flex flex-col lg:h-full">
            <h2 className="font-head text-3xl md:text-4xl font-semibold mb-6">
              {t.about.titlePrefix} <span className="text-gold">Maître Fatima Azzahraa Hassar</span>
            </h2>
            <p className="mb-4 text-base leading-relaxed text-slate-600">{t.about.p1}</p>
            <p className="mb-10 text-base leading-relaxed text-slate-600">{t.about.p2}</p>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-6 text-gold">{t.about.valuesTitle}</h3>
            <div className="space-y-5 mt-auto">
              {t.values.map((v, i) => (
                <div key={v.t} className={`flex gap-4 ${i < t.values.length - 1 ? "pb-5 border-b border-border" : ""}`}>
                  <span className="font-head flex-shrink-0 text-xl text-gold opacity-50">0{i + 1}</span>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{v.t}</h4>
                    <p className="text-sm text-slate-600">{v.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES — each card links to its own SEO page */}
      <section id="services" className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center scale-110 blur-md" style={{ backgroundImage: "url('https://i.postimg.cc/NM17N2yL/Generated-Image-November-02-2025-9-05PM-1.webp')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/90 to-navy-deep/95" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <Reveal variant="fade-in" className="max-w-xl mb-16">
            <div className="text-xs font-semibold tracking-widest uppercase mb-4 text-gold">{t.servicesTitle.eyebrow}</div>
            <h2 className="font-head text-3xl md:text-4xl font-semibold text-white">{t.servicesTitle.title}</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} variant="fade-up" delay={i * 60} className={i === 0 ? "sm:col-span-2" : ""}>
                <Link
                  href={`/${locale}/services/${s.slug}`}
                  className="group p-6 flex items-center justify-between gap-4 rounded-xl bg-white/[0.06] backdrop-blur border border-white/10 hover:border-gold/60 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-gold/20">
                      <Scale size={17} className="text-gold-light" />
                    </span>
                    <span className="text-white text-[15px] font-medium">{s[locale]}</span>
                  </div>
                  <Arrow size={15} className="text-gold-light opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal variant="fade-up" className="text-center max-w-xl mx-auto mb-16">
            <div className="text-xs font-semibold tracking-widest uppercase mb-4 text-gold">{t.testimonials.eyebrow}</div>
            <h2 className="font-head text-3xl md:text-4xl font-semibold">{t.testimonials.title}</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((item, i) => (
              <Reveal key={item.name} variant="scale-in" delay={i * 100}>
                <div className="p-7 rounded-2xl bg-white border border-border h-full">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={14} className={s < item.rating ? "fill-gold text-gold" : "text-border"} />
                    ))}
                  </div>
                  <p className="text-sm italic mb-6 leading-relaxed text-slate-600">&quot;{item.quote}&quot;</p>
                  <span className="text-sm font-semibold">{item.name}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 md:py-32 bg-muted">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-5 gap-14">
          <Reveal variant={isAr ? "slide-in-end" : "slide-in-start"} className="lg:col-span-2">
            <div className="text-xs font-semibold tracking-widest uppercase mb-4 text-gold">{t.contact.eyebrow}</div>
            <h2 className="font-head text-3xl font-semibold mb-4">
              {t.contact.titlePrefix} <span className="text-gold">Maître Hassar</span>
            </h2>
            <div className="space-y-4 mt-8 text-sm">
              <a href={`tel:${CONTACT.phone}`} dir="ltr" className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full flex items-center justify-center bg-gold-pale"><Phone size={15} className="text-gold" /></span>
                {CONTACT.phoneDisplay}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full flex items-center justify-center bg-gold-pale"><Mail size={15} className="text-gold" /></span>
                {CONTACT.email}
              </a>
            </div>
          </Reveal>
          <Reveal variant={isAr ? "slide-in-start" : "slide-in-end"} delay={100} className="lg:col-span-3">
            <form action="/api/submit-contact" method="POST" className="rounded-2xl p-8 bg-white border border-border">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <input name="name" placeholder={t.contact.form.name} className="px-4 py-3 rounded-lg text-sm border border-border bg-bg" />
                <input name="email" type="email" placeholder={t.contact.form.email} className="px-4 py-3 rounded-lg text-sm border border-border bg-bg" />
              </div>
              <textarea name="message" rows={4} placeholder={t.contact.form.message} className="w-full px-4 py-3 rounded-lg text-sm border border-border bg-bg mb-4 resize-none" />
              <button type="submit" className="rounded-full px-7 py-3 font-semibold text-sm bg-gold text-white">{t.contact.form.submit}</button>
            </form>
          </Reveal>
        </div>
      </section>

      <footer className="py-14 bg-navy-deep text-white/70">
        <div className="max-w-6xl mx-auto px-6 text-sm">© 2026 Cabinet Hassar. {t.footer}</div>
      </footer>
    </>
  );
}
