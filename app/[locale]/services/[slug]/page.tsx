import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, ArrowLeft, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import { LOCALES, Locale, PAGE, SERVICES, SERVICE_COPY, CONTACT } from "@/lib/content";

const SITE_URL = "https://cabinet-hassar.ma"; // TODO: replace with real domain

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => SERVICES.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const locale = params.locale as Locale;
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service || !LOCALES.includes(locale)) return {};

  const title =
    locale === "fr"
      ? `Avocate ${service.fr} à Casablanca — Cabinet Hassar`
      : locale === "ar"
      ? `محامية ${service.ar} بالدار البيضاء — مكتب حصار`
      : `${service.en} Attorney in Casablanca — Cabinet Hassar`;

  const description = SERVICE_COPY[`${service.slug}-${locale}`];

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: `/${locale}/services/${service.slug}`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}/services/${service.slug}`])),
    },
  };
}

export default function ServicePage({ params }: { params: { locale: string; slug: string } }) {
  const locale = params.locale as Locale;
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service || !LOCALES.includes(locale)) notFound();

  const t = PAGE[locale];
  const isAr = locale === "ar";
  const Back = isAr ? ArrowRight : ArrowLeft;
  const copy = SERVICE_COPY[`${service.slug}-${locale}`];
  const otherServices = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 4);

  return (
    <>
      <Header locale={locale} />

      <section className="max-w-4xl mx-auto px-6 pt-16 pb-20">
        <Reveal variant={isAr ? "slide-in-end" : "slide-in-start"}>
          <Link href={`/${locale}#services`} className="inline-flex items-center gap-2 text-sm text-gold font-semibold mb-8">
            <Back size={15} /> {t.backToServices}
          </Link>
          <h1 className="font-head text-3xl md:text-4xl font-semibold mb-6">{service[locale]}</h1>
          <p className="text-lg leading-relaxed text-slate-600 mb-10">{copy}</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-sm bg-gold text-white"
          >
            {t.contactCta}
          </a>
        </Reveal>

        <Reveal variant="fade-up" delay={150} className="mt-20">
          <h2 className="font-head text-xl font-semibold mb-6">{t.servicesTitle.title}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/${locale}/services/${s.slug}`}
                className="p-4 rounded-lg border border-border hover:border-gold transition-colors text-sm font-medium"
              >
                {s[locale]}
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="contact" className="py-20 bg-muted">
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <Reveal variant={isAr ? "slide-in-end" : "slide-in-start"}>
            <h2 className="font-head text-2xl font-semibold mb-6">{t.contact.titlePrefix} Maître Hassar</h2>
            <div className="space-y-4 text-sm">
              <a href={`tel:${CONTACT.phone}`} dir="ltr" className="flex items-center gap-3">
                <Phone size={16} className="text-gold" /> {CONTACT.phoneDisplay}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3">
                <Mail size={16} className="text-gold" /> {CONTACT.email}
              </a>
            </div>
          </Reveal>
          <Reveal variant="scale-in" delay={100} className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image src="https://i.postimg.cc/cLHpV0BJ/photo-fatima.webp" alt="Maître Fatima Azzahraa Hassar" fill className="object-cover object-top" />
          </Reveal>
        </div>
      </section>

      <footer className="py-14 bg-navy-deep text-white/70">
        <div className="max-w-6xl mx-auto px-6 text-sm">© 2026 Cabinet Hassar. {t.footer}</div>
      </footer>
    </>
  );
}
