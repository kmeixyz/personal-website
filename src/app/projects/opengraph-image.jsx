import { ogImage } from "@/app/lib/og-card";

export const alt = "Kevin Mei | Projects";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return ogImage({
    eyebrow: "Projects",
    title: "Featured Work",
    subtitle: "What each one does, and who it's for.",
  });
}
