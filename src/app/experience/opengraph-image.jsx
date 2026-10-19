import { ogImage } from "@/app/lib/og-card";

export const alt = "Kevin Mei | Experience";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return ogImage({
    eyebrow: "Experience",
    title: "Professional Background",
    subtitle:
      "Internships, research, campus roles and volunteering since 2020.",
  });
}
