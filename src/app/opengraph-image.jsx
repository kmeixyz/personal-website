import { ogImage } from "@/app/lib/og-card";

export const alt = "Kevin Mei — I build things that help others";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return ogImage({
    // A name, so it is set in the UI face rather than the label mono.
    eyebrow: "Kevin Mei",
    eyebrowFace: "sans",
    // The hero's own line, broken where the hero breaks it.
    title: "I build things\nThat help others",
    subtitle: "Computer Science & Journalism | Northwestern University",
  });
}
