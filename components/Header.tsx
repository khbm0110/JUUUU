"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { LOCALES, Locale, PAGE } from "@/lib/content";

export default function Header({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = PAGE[locale];

  const NAV = [
    { href: `/${locale}#hero`, label: t.nav.home },
    { href: `/${locale}#about`, label: t.nav.about },
    { href: `/${locale}#services`, label: t.nav.services },
    { href: `/${locale}#testimonials`, label: t.nav.testimonials },
    { href: `/${locale}#contact`, label: t.nav.contact },
  ];

  // swap locale but keep same page (e.g. viewing a service page)
  const localePath = (target: Locale) => pathname.replace(`/${locale}`, `/${target}`);

  return (
    <header className="sticky top-0 z-40 bg-bg/90 backdrop-blur border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <Image src="/icon-mark.svg" alt="Cabinet Hassar" width={40} height={40} priority />
          <span className="font-head font-semibold text-lg">Cabinet Hassar</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-8 text-sm">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="hover:text-gold transition-colors">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center rounded-full p-1 border border-border">
            {LOCALES.map((l) => (
              <Link
                key={l}
                href={localePath(l)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  l === locale ? "bg-navy text-white" : "text-slate-500"
                }`}
              >
                {l === "ar" ? "ع" : l.toUpperCase()}
              </Link>
            ))}
          </div>
          <a
            href={`/${locale}#contact`}
            className="hidden md:inline-flex rounded-full px-5 py-2.5 text-sm font-semibold bg-gold text-white hover:bg-gold-light transition-colors"
          >
            {t.nav.cta}
          </a>
          <button className="lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden px-6 pb-5 flex flex-col gap-4 border-t border-border">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
