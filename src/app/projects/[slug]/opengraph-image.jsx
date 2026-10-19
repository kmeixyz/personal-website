import { notFound } from "next/navigation";
import { withStudy, bySlug } from "@/app/lib/projects";
import { ogImage } from "@/app/lib/og-card";

export const alt = "Kevin Mei | Project";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return withStudy.map((p) => ({ slug: p.slug }));
}

/**
 * Only the slugs above exist. Without this, Next renders this route on demand
 * for any slug at all, so /projects/<anything>/opengraph-image returns 200 and
 * a generic card — every unique URL a cache miss and a fresh image render.
 * That is an unbounded amount of work an anonymous caller can ask for. Set to
 * false, unknown slugs 404 before any rendering happens.
 */
export const dynamicParams = false;

export default async function Image({ params }) {
  const { slug } = await params;
  const project = bySlug(slug);
  if (!project) notFound();

  return ogImage({
    eyebrow: project.category,
    title: project.title,
    subtitle: project.problem,
  });
}
