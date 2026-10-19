import Link from "next/link";
import Image from "next/image";
import LandingBody from "@/app/components/landing/LandingBody";
import ProjectCards from "@/app/components/landing/ProjectCards";
import TechHighlights from "@/app/components/landing/TechHighlights";
import EmployerLogoGrid from "@/app/components/landing/EmployerLogoGrid";
import ContactPanel from "@/app/components/landing/ContactPanel";
import { ArrowRight } from "@/app/components/landing/icons";
import { Reveal, Stagger, StaggerItem } from "@/app/components/motion";
import { EMAIL, GITHUB, LINKEDIN } from "@/app/lib/site";
import { GROUPS } from "@/app/lib/experience";
import { bySlug, PROJECTS } from "@/app/lib/projects";

export const metadata = {
  alternates: { canonical: "/" },
  icons: { icon: "/home-icon.svg" },
};

const FEATURED = ["phishing-detector", "vulnerability-scanner"].map(bySlug);
const COMMUNITY = GROUPS.find((group) => group.label === "Community").items;
const VOLUNTEER_LOGOS = {
  "Matriculate": "/logos/matriculate.png",
  "iCAN (International Children's Advisory Network)": "/logos/ican.png",
  "Howard & Evanston Community Center": "/logos/howard-evanston.png",
  "Ann & Robert H. Lurie Children's Hospital of Chicago": "/logos/lurie.png",
  "Pui Tak Center": "/logos/pui-tak.png",
  "A Just Harvest": "/logos/a-just-harvest.png",
};
const VOLUNTEERING = [
  "Ann & Robert H. Lurie Children's Hospital of Chicago",
  "Matriculate",
  "iCAN (International Children's Advisory Network)",
  "Howard & Evanston Community Center",
  "A Just Harvest",
  "Pui Tak Center",
].map((org) => ({ ...COMMUNITY.find((item) => item.org === org), logo: VOLUNTEER_LOGOS[org] }));
const TOOLKIT_PROJECTS = PROJECTS.map((project) => ({
  slug: project.slug,
  category: project.category,
  title: project.title,
  copy: project.blurb ?? project.problem,
  stack: project.stack ?? [],
}));
const EMPLOYER_GROUPS = [
  { label: "Software Engineering", employers: [
    { name: "Ann & Robert H. Lurie Children's Hospital of Chicago", desktopLines: ["Ann & Robert H. Lurie", "Children's Hospital", "of Chicago"], mark: "L", logo: "/logos/lurie.png", role: "Software Engineering Intern", date: "Sep 2026 — Present", summary: "ADHD Patient Education" },
    { name: "Discovery Partners Institute", mark: "DPI", logo: "/logos/dpi.png", role: "Software Engineering Intern", date: "Jun 2026 — Aug 2026", summary: "CRT AI Dashboard" },
  ] },
  { label: "Data Science & AI/ML", employers: [
    { name: "Federal Aviation Administration", mark: "FAA", logo: "/logos/faa.png", role: "Data Science Intern", date: "Jun 2026 — Aug 2026", summary: "Safety & Staffing Data" },
    { name: "UChicago Data Science Institute", desktopLines: ["UChicago Data", "Science Institute"], mark: "DSI", logo: "/logos/uchicago-dsi.png", role: "Data Science Intern", date: "Sep 2023 — Nov 2023", summary: "Epidemiological Data Analysis" },
  ] },
  { label: "Cybersecurity", employers: [
    { name: "Rush University Medical Center", desktopLines: ["Rush University", "Medical Center"], mark: "R", logo: "/logos/rush.png", role: "Cybersecurity & Data Science Intern", date: "Jun 2024 — Aug 2024", summary: "Network Security Analysis" },
    { name: "Chicago Psychiatry Associates", mark: "CPA", logo: "/logos/chicago-psychiatry.png", role: "Cybersecurity Auditor", date: "Apr 2025 — Jun 2025", summary: "HIPAA Compliance Audit" },
  ] },
  { label: "Research & Analytics", employers: [
    { name: "Northwestern University", mark: "N", logo: "/logos/northwestern.png", role: "Undergraduate Researcher", date: "Sep 2026 — Present", summary: "Cheapfake Detection Research" },
    { name: "After School Matters", mark: "ASM", logo: "/logos/after-school-matters.png", role: "Digital Marketing & Analytics Intern", date: "Jul 2021 — Aug 2021", summary: "SEO Strategy Development" },
  ] },
];

export default function HomePage() {
  return (
    <div className="lp home-redesign">
      <LandingBody />
      <Reveal as="section" className="home-hero lp-wrap lp-wrap--featured" aria-labelledby="home-title">
        <div className="home-intro">
          <p className="home-hello">Hey, I&apos;m Kevin!</p>
          <h1 id="home-title">I build things<br />That help others</h1>
          <p className="home-intro-copy">I&apos;m a junior at Northwestern studying Computer Science and Journalism. I&apos;m always curious and love learning new things, especially when I can use what I learn to help someone else.</p>
          <div className="home-actions">
            <a href="#selected-work" className="lp-btn lp-btn--primary">Explore my work <ArrowRight /></a>
            <a href="#contact" className="home-text-link">Get in touch <ArrowRight /></a>
          </div>
        </div>
        <aside className="home-facts" aria-labelledby="home-facts-title">
          <p id="home-facts-title" className="home-facts-title">A few things about me</p>
          <dl className="home-fact-list">
            <div className="home-fact">
              <dt>Currently curious about</dt>
              <dd>Cybersecurity</dd>
            </div>
            <div className="home-fact">
              <dt>I study both</dt>
              <dd>Computer Science & Journalism</dd>
            </div>
            <div className="home-fact">
              <dt>In my free time</dt>
              <dd><a href="#community">I volunteer <ArrowRight /></a></dd>
            </div>
            <div className="home-fact">
              <dt>My favorite question</dt>
              <dd>Why?</dd>
            </div>
          </dl>
        </aside>
      </Reveal>

      <section id="selected-work" className="home-section home-work" aria-labelledby="work-title">
        <Reveal className="lp-wrap lp-wrap--featured">
          <div className="home-section-heading">
            <h2 id="work-title">A closer look at what I build</h2>
            <Link href="/projects" className="home-text-link">All projects <ArrowRight /></Link>
          </div>
          <ProjectCards projects={FEATURED} />
        </Reveal>
        <Reveal
          className="lp-wrap lp-wrap--featured"
          duration={900}
          rootMargin="0px 0px -28% 0px"
        >
          <TechHighlights items={TOOLKIT_PROJECTS} />
        </Reveal>
      </section>

      <section id="experience" className="home-section lp-wrap" aria-labelledby="experience-title">
        <Reveal duration={900} rootMargin="0px 0px -28% 0px">
          <div className="home-section-heading">
            <h2 id="experience-title">Where I’ve put my skills to work</h2>
            <Link href="/experience#work" className="home-text-link">Explore my experience <ArrowRight /></Link>
          </div>
          <EmployerLogoGrid groups={EMPLOYER_GROUPS} />
        </Reveal>
      </section>

      <section id="community" className="home-section lp-wrap" aria-labelledby="community-title">
        <Reveal duration={900} rootMargin="0px 0px -28% 0px">
          <div className="home-section-heading">
            <div>
              <h2 id="community-title">Showing up where I can help</h2>
              <p className="home-community-intro"><strong>Volunteering is a big part of my life.</strong> I help students navigate college admissions, support children&apos;s health initiatives, and have volunteered in community food programs.</p>
            </div>
            <Link href="/experience#community" className="home-text-link">More of my community work <ArrowRight /></Link>
          </div>
            <Stagger className="home-community-roles" delay={0.18} gap={0.07} duration={720}>
              {VOLUNTEERING.map((item) => (
                <StaggerItem key={item.org} className="home-service-grid-item">
                  <article className="home-glass home-service">
                    <h3>{item.org === "iCAN (International Children's Advisory Network)" ? "International Children's Advisory Network" : item.org === "Ann & Robert H. Lurie Children's Hospital of Chicago" ? "Lurie Children's" : item.org}</h3>
                    <div className="home-service-logo" aria-hidden="true"><Image src={item.logo} alt="" fill sizes="150px" /></div>
                    <p className={item.org === "iCAN (International Children's Advisory Network)" ? "home-service-role--two-lines" : undefined}>
                      {item.org === "iCAN (International Children's Advisory Network)" ? <><span>Programs &amp;</span><span>Outreach Coordinator</span></> : item.role.replaceAll(" and ", " & ")}
                    </p>
                    <span className="home-service-date">{item.start} &mdash; {item.end}</span>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
        </Reveal>
      </section>
      <ContactPanel email={EMAIL} linkedin={LINKEDIN} github={GITHUB} />
    </div>
  );
}
