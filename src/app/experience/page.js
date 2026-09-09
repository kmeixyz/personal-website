import PageHeader from "@/app/components/PageHeader";
import ExperienceExplorer from "@/app/components/ExperienceExplorer";

export const metadata = {
  title: "Experience",
  description:
    "Kevin Mei's working history across research, security, data science, and public health.",
  alternates: { canonical: "/experience" },
  openGraph: {
    title: "Experience",
    description:
      "Kevin Mei's working history across research, security, data science, and public health.",
  },
};

export default function ExperiencePage() {
  return (
    /* TEST ONLY - same wrapper the home page carries: SF Pro for the titles,
       orgs and prose, JetBrains Mono held back for the date rails, the rail
       index and the section labels. Remove this and the block in globals.css
       to go back. */
    <div className="sf-test">
      <PageHeader
        eyebrow="Experience"
        title="Professional Background"
        titleClassName="page-title-gradient"
      />

      {/* Tighter than the other pages' py-12/md:py-16. This one is a long
          index rather than a page of prose - thirty rows a reader is scanning
          for a name, not reading through - and the air that gives a bio room
          to breathe just adds scrolling here. */}
      <section className="mx-auto max-w-6xl px-6 py-8 md:py-10">
        <ExperienceExplorer />
      </section>
    </div>
  );
}
