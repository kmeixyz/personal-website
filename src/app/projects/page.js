import PageHeader from "@/app/components/PageHeader";
import ProjectsGrid from "@/app/components/ProjectsGrid";

export const metadata = {
  title: "Projects",
  description:
    "Projects Kevin Mei has built: a plain-English Census tool, a lesson-planning dashboard for STEM teachers, and a playroom of games for pediatric clinics.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects",
    description:
      "Projects Kevin Mei has built: a plain-English Census tool, a lesson-planning dashboard for STEM teachers, and a playroom of games for pediatric clinics.",
  },
};

export default function ProjectsPage() {
  return (
    /* TEST ONLY - same wrapper the home and experience pages carry: SF Pro for
       the titles and prose, JetBrains Mono held back for the category rails,
       the rail index and the section labels. Remove this and the block in
       globals.css to go back. */
    <div className="sf-test">
      <PageHeader
        eyebrow="Projects"
        title="Featured Work"
        titleClassName="page-title-gradient"
      />

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <ProjectsGrid />
      </section>
    </div>
  );
}
