import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "@/app/components/icons";
import { Github } from "@/app/components/brand-icons";
import { Reveal, Stagger, StaggerItem } from "@/app/components/motion";
import { GITHUB } from "@/app/lib/site";
import {
  withStudy,
  bySlug,
  hasStudy,
  writtenSections,
} from "@/app/lib/projects";

// The two header links are the same run of underlined mono type.
const LINK_CLASS =
  "tap inline-flex items-center gap-1.5 text-ink underline decoration-line-2 underline-offset-4 transition-colors hover:decoration-accent";

export function generateStaticParams() {
  return withStudy.map((p) => ({ slug: p.slug }));
}

/* Unknown slugs 404 without rendering anything, rather than being rendered on
   demand and then thrown away by the notFound() below. Same reasoning as the
   opengraph-image route beside this file. */
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = bySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.problem,
    // Inherited whole from the root layout otherwise, which would unfurl every
    // case study under the site-wide name and blurb.
    openGraph: { title: project.title, description: project.problem },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = bySlug(slug);
  if (!project || !hasStudy(project)) notFound();

  const sections = writtenSections(project);

  return (
    <>
      <header className="border-b border-line">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-10 px-6 pb-8 pt-12 md:grid-cols-[9rem_1fr] md:pt-16">
          <div className="mb-4 md:mb-0 md:pt-4">
            <Link
              href="/projects"
              className="rail tap block transition-colors hover:text-ink"
            >
              ← All projects
            </Link>
            <p className="rail mt-2 hidden md:block">{project.category}</p>
          </div>

          <div>
            <Reveal
              as="h1"
              className="max-w-[18ch] text-[clamp(2.25rem,5.5vw,3.75rem)] leading-[1.06]"
            >
              {project.title}
            </Reveal>

            <Reveal
              as="p"
              delay={0.04}
              className="mt-4 max-w-[62ch] text-lg leading-relaxed text-ink-2"
            >
              {project.problem}
            </Reveal>

            {/* Links and stack as plain mono runs, matching the index. */}
            <Reveal
              delay={0.08}
              className="meta mt-5 flex flex-wrap items-center gap-x-4 gap-y-2"
            >
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK_CLASS}
                >
                  {project.live.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                </a>
              )}
              <a
                href={project.repo || GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className={LINK_CLASS}
              >
                <Github aria-hidden="true" className="h-3.5 w-3.5" />
                {project.repo ? "Repository" : "GitHub profile"}
              </a>
            </Reveal>

            <Reveal delay={0.12} className="meta mt-3">
              {(project.stack ?? []).map((s, i) => (
                <span key={s}>
                  {i > 0 && (
                    <span aria-hidden="true" className="mx-1.5 text-faint">
                      ·
                    </span>
                  )}
                  {s}
                </span>
              ))}
            </Reveal>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        {project.shot && (
          <Reveal className="mb-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.shot}
              alt={`${project.title} interface`}
              width={1600}
              height={1000}
              className="w-full border border-line bg-paper-2"
            />
          </Reveal>
        )}

        <Stagger gap={0.05}>
          {sections.map(([label, prose]) => (
            <StaggerItem key={label}>
              <div className="grid grid-cols-1 gap-x-10 border-b border-line py-6 first:border-t md:grid-cols-[9rem_1fr]">
                <h2 className="eyebrow mb-2 md:mb-0 md:pt-1">{label}</h2>
                <p className="max-w-[62ch] text-[1.05rem] leading-relaxed">
                  {prose}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </>
  );
}
