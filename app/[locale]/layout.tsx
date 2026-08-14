import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES, DIR, Locale } from "@/lib/content";
import { CONTACT } from "@/lib/content";

const SITE_URL = "https://cabinet-hassar.ma"; // TODO: replace with real domain

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

const TITLES: Record<Locale, string> = {
  fr: "Cabinet Hassar — Avocate à Casablanca | Maître Fatima Azzahraa Hassar",
  ar: "مكتب حصار للمحاماة — محامية بالدار البيضاء",
  en: "Cabinet Hassar — Lawyer in Casablanca | Fatima Azzahraa Hassar",
};
const DESCRIPTIONS: Record<Locale, string> = {
  fr: "Avocate au Barreau de Casablanca. Conseil et contentieux en droit de la famille, droit des affaires, droit immobilier et droit du travail. Consultation sous 48h.",
  ar: "محامية بهيئة المحامين بالدار البيضاء. استشارة وترافع في قانون الأسرة، الأعمال، العقار والشغل. استشارة أولى خلال 48 ساعة.",
  en: "Attorney admitted to the Casablanca Bar. Advisory and litigation in family law, business law, real estate, and labor law. First consultation within 48h.",
};

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  if (!LOCALES.includes(locale)) return {};
  return {
    metadataBase: new URL(SITE_URL),
    title: TITLES[locale],
    description: DESCRIPTIONS[locale],
    alternates: {
      canonical: `/${locale}`,
      languages: { fr: "/fr", ar: "/ar", en: "/en" },
    },
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_MA" : locale === "ar" ? "ar_MA" : "en_US",
      url: `${SITE_URL}/${locale}`,
      siteName: "Cabinet Hassar",
      title: TITLES[locale],
      description: DESCRIPTIONS[locale],
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  if (!LOCALES.includes(locale)) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "Cabinet Hassar",
    image: `${SITE_URL}/logo.svg`,
    "@id": SITE_URL,
    url: `${SITE_URL}/${locale}`,
    telephone: CONTACT.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.address,
      addressLocality: "Casablanca",
      addressCountry: "MA",
    },
    founder: { "@type": "Person", name: "Fatima Azzahraa Hassar" },
    areaServed: "Casablanca",
    priceRange: "$$",
    inLanguage: locale,
  };

  return (
    <div lang={locale} dir={DIR[locale]}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </div>
  );
}
