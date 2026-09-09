import { SITE_URL } from "@/app/lib/site";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
