import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "@/lib/content";

// Root "/" always redirects to the default locale so there's exactly one
// canonical URL per language — good for SEO, avoids duplicate content.
export default function RootPage() {
  redirect(`/${DEFAULT_LOCALE}`);
}
