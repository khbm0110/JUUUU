import { MetadataRoute } from "next";
import { LOCALES, SERVICES } from "@/lib/content";

const SITE_URL = "https://cabinet-hassar.ma"; // TODO: replace with real domain

export default function sitemap(): MetadataRoute.Sitemap {
  const homePages = LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1,
  }));

  const servicePages = LOCALES.flatMap((locale) =>
    SERVICES.map((s) => ({
      url: `${SITE_URL}/${locale}/services/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
  );

  return [...homePages, ...servicePages];
}
