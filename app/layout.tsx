import { Playfair_Display, Inter, Noto_Naskh_Arabic, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const notoNaskh = Noto_Naskh_Arabic({ subsets: ["arabic"], variable: "--font-noto-naskh", display: "swap" });
const notoSans = Noto_Sans_Arabic({ subsets: ["arabic"], variable: "--font-noto-sans-ar", display: "swap" });

// All four fonts are loaded once here; tailwind.config.ts puts Latin +
// Arabic fonts in the same stack so the browser picks the right glyph
// per character automatically — no per-locale class switching needed.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${playfair.variable} ${inter.variable} ${notoNaskh.variable} ${notoSans.variable}`} suppressHydrationWarning>
      <body className="font-body bg-bg text-ink antialiased">{children}</body>
    </html>
  );
}
