/**
 * The working history itself, kept out of the component that draws it: the
 * landing page leads with the four most recent Work roles, and two copies of
 * that list drifted the moment either was edited.
 */

/**
 * Working history as a rail-and-column index: dates left, role and detail
 * right, hairlines instead of cards.
 *
 * A row's span prints `start` over `end` on two lines with no dash, so nothing
 * wraps and no separator strands on a narrow screen.
 *
 * `short` is an abbreviated `org`, set only where the full name is too long
 * for the landing page's summary rows; everything else reads `org` directly.
 *
 * `did` is a role's short label, and is optional. So is `end`, for a one-off
 * like a certificate. `stack` is optional too: the tools a role was actually
 * written in, printed as the same outline tags /projects uses, because a
 * history that never names a language leaves the reader guessing.
 * `linkLabel` overrides the arrow's accessible name when the row opens a
 * credential file rather than the org's homepage. `didLink` turns the `did`
 * label itself into a link, for a row whose arrow already points at the org
 * and whose deliverable lives somewhere else, with `didLinkLabel` naming the
 * target when the label alone doesn't.
 *
 * A row whose `link` is a credential file rather than an organisation's site
 * stretches that link over the whole entry, via `.row-target`. It's the link
 * being the row's own subject that earns it: a reader who wants the
 * certificate shouldn't have to aim at 44px of a 900px row, while a row
 * pointing at an employer's homepage is offering somewhere to go next, not
 * the thing itself, and keeps the arrow as its only target. The overlay
 * covers the entry, not the row - the dates in the rail beside it are a
 * label, not a control, and stay unclickable.
 */
export const GROUPS = [
  {
    label: "Work",
    /* Eleven roles is nearly as many as the other four sections put together,
       and at full width each row was spending about 1000px of column on 350px
       of type. Split, the section reads down one column and continues down the
       next - newspaper order, so the run stays reverse-chronological - and
       loses roughly half its height. It is a flag rather than a rule about
       length because it is a judgement per section - Education's three rows
       take it for a different reason, to put a certificate beside the degree
       it belongs to rather than below it. */
    split: true,
    items: [
      {
        start: "Sep 2026",
        end: "Present",
        role: "Software Engineering Intern",
        org: "Ann & Robert H. Lurie Children's Hospital of Chicago",
        short: "Lurie Children's Hospital",
        did: "ADHD Patient Education",
        link: "https://www.luriechildrens.org",
      },
      {
        start: "Sep 2026",
        end: "Present",
        role: "Undergraduate Researcher",
        org: "Northwestern University Knight Lab",
        short: "Northwestern Knight Lab",
        did: "Cheapfake Detection Research",
        link: "https://knightlab.northwestern.edu",
      },
      {
        start: "Jun 2026",
        end: "Aug 2026",
        role: "Data Science Intern",
        org: "Federal Aviation Administration",
        did: "Safety & Staffing Data",
        link: "https://www.faa.gov",
      },
      {
        start: "Jun 2026",
        end: "Aug 2026",
        role: "Software Engineering Intern",
        org: "Discovery Partners Institute",
        href: "https://crt-ai-dashboard.vercel.app",
        link: "https://dpi.illinois.edu",
      },
      {
        start: "Apr 2026",
        end: "Jun 2026",
        role: "Undergraduate Researcher",
        org: "Northwestern University Knight Lab",
        href: "https://census-bot.tech/",
        link: "https://knightlab.northwestern.edu",
      },
      {
        start: "Jan 2026",
        end: "Mar 2026",
        role: "Undergraduate Teaching Assistant",
        org: "Northwestern University Computer Science",
        did: "CS 349: Machine Learning",
        didLink:
          "https://www.mccormick.northwestern.edu/computer-science/academics/courses/descriptions/349.html",
        link: "https://www.mccormick.northwestern.edu/computer-science/",
      },
      {
        start: "Apr 2025",
        end: "Jun 2025",
        role: "Cybersecurity Auditor",
        org: "Chicago Psychiatry Associates",
        did: "HIPAA Compliance Audit",
        didLink: "/cybersecurity-audit-report.pdf",
        didLinkLabel: "HIPAA Compliance Audit report (PDF)",
        link: "https://www.chicagopsychiatryassociates.org",
      },
      {
        start: "Jun 2024",
        end: "Aug 2024",
        role: "Cybersecurity and Data Science Intern",
        org: "Rush University Medical Center",
        did: "Network Security Analysis",
        link: "https://www.rush.edu",
      },
      {
        start: "Oct 2023",
        end: "Apr 2024",
        role: "Community Health Research Intern",
        org: "Ann & Robert H. Lurie Children's Hospital of Chicago",
        did: "Health Equity Research",
        link: "https://www.luriechildrens.org",
      },
      {
        start: "Sep 2023",
        end: "Nov 2023",
        role: "Data Science Intern",
        org: "UChicago Data Science Institute",
        did: "Epidemiological Data Analysis",
        link: "https://datascience.uchicago.edu",
      },
      {
        start: "Jun 2022",
        end: "Aug 2022",
        role: "Community Health Research Intern",
        org: "Rush University Medical Center",
        did: "Public Health Innovation",
        link: "https://www.rush.edu",
      },
      {
        start: "Jul 2021",
        end: "Aug 2021",
        role: "Digital Marketing and Analytics Intern",
        org: "After School Matters",
        did: "SEO Strategy Development",
        link: "https://afterschoolmatters.org",
      },
    ],
  },
  {
    label: "Education",
    /* Ordered for the split rather than by date: the two schools run down the
       left, and the certificate sits in the right-hand column beside the
       degree it was earned alongside. Both are Northwestern, a year apart, and
       reading them side by side is the point - stacked in date order the
       certificate landed between the two diplomas and read like a third
       school. */
    split: true,
    items: [
      {
        start: "Sep 2024",
        end: "Jun 2028",
        role: "Bachelor of Science, Computer Science and Journalism",
        org: "Northwestern University",
        did: "Minor in Machine Learning & Data Science",
        link: "https://www.northwestern.edu",
      },
      {
        start: "Sep 2020",
        end: "Jun 2024",
        role: "High School Diploma",
        org: "Walter Payton College Preparatory High School",
        did: "#4 U.S. High School (U.S. News)",
        link: "https://www.wpcp.org",
      },
      {
        start: "Sep 2025",
        end: "Jun 2026",
        role: "Certificate, Enlightened Disagreement",
        org: "Northwestern University – Kellogg School of Management",
        did: "Member of Inaugural Cohort",
        link: "/kellogg-enlightened-disagreement.pdf",
        linkLabel: "Certificate in Enlightened Disagreement (PDF)",
      },
    ],
  },
  {
    label: "Community",
    /* Campus and Volunteer, merged. They were two sections drawing one
       distinction - paid nothing, done outside a job - and splitting it left
       "ASB Volunteer" filed under Campus while "Soup Kitchen Volunteer" sat in
       Volunteer, which is a line no reader was going to find. Together they
       are eleven rows, the same size as Work, and they take the same two
       columns.

       "Community" rather than "Campus & Service" because the dock names
       whichever section is in play, and a two-word label makes that row scroll
       on a phone. It is also what the glyph beside it already says.

       Ordered by what is still running, then by when it started: the five
       ongoing roles first, the finished ones after, each run newest-first.
       Sorting on start date alone buried "Programs and Outreach Coordinator"
       - a role held today - four rows below a food pantry shift that ended,
       because it began earlier. What a reader wants off the top of a section
       like this is what I am doing now. */
    split: true,
    items: [
      // Ongoing.
      {
        start: "Jun 2026",
        end: "Present",
        role: "Game Designer & Developer",
        org: "Ann & Robert H. Lurie Children's Hospital of Chicago",
        link: "https://www.luriechildrens.org",
      },
      {
        start: "Mar 2026",
        end: "Present",
        role: "Media Chair",
        org: "Engage Rogers Park",
        link: "https://www.instagram.com/engagerp_nu/",
      },
      {
        start: "Nov 2025",
        end: "Present",
        role: "College Access and Admissions Advisor",
        org: "Matriculate",
        link: "https://matriculate.org",
      },
      {
        start: "Oct 2025",
        end: "Present",
        role: "Marketing Chair",
        org: "Emerging Coders",
        link: "https://emergingcoders.org",
      },
      {
        start: "Jul 2025",
        end: "Present",
        role: "Programs and Outreach Coordinator",
        org: "iCAN (International Children's Advisory Network)",
        link: "https://www.icanresearch.org",
      },
      // Finished.
      {
        start: "Jan 2026",
        end: "Jun 2026",
        role: "Food Pantry Volunteer",
        org: "Howard & Evanston Community Center",
        link: "https://howardevanston.org",
      },
      {
        start: "Oct 2025",
        end: "Jun 2026",
        role: "DeBerry Scholar",
        org: "DeBerry Civic Scholars",
        link: "https://www.northwestern.edu/lead-engage/community-engagement/public-service-scholars-program/",
      },
      {
        start: "Sep 2025",
        end: "Dec 2025",
        role: "SLI Scholar",
        org: "SESP Leadership Institute",
        link: "https://sesp.northwestern.edu/undergraduate/options-concentrations/sesp-leadership-institute/",
      },
      {
        start: "Mar 2025",
        end: "Apr 2025",
        role: "ASB Volunteer",
        org: "Alternative Spring Break",
        link: "https://www.northwestern.edu/lead-engage/community-engagement/alternative-spring-break.html",
      },
      {
        start: "Mar 2025",
        end: "Apr 2025",
        role: "Soup Kitchen Volunteer",
        org: "A Just Harvest",
        link: "https://ajustharvest.org",
      },
      {
        start: "Oct 2022",
        end: "Dec 2022",
        role: "English Second Language Tutor",
        org: "Pui Tak Center",
        link: "https://www.puitak.org",
      },
    ],
  },
  {
    label: "Certification",
    /* Five rows and the shortest content on the page - a name, an issuer, a
       date - so at full width these were the emptiest lines here. Split three
       and two. */
    split: true,
    items: [
      {
        // Earned on a single date rather than over a span, so no `end`: the
        // rail's second line simply doesn't render. Credential `link`s are
        // same-origin files and still open in a new tab, so the row lands on
        // just the PDF.
        start: "May 2026",
        role: "Career Fast Track",
        org: "Raymond James",
        link: "/raymond-james-career-fast-track.pdf",
        linkLabel: "Career Fast Track certificate (PDF)",
      },
      {
        start: "May 2026",
        role: "Intermediate Cybersecurity",
        org: "CodePath",
        link: "/codepath-intermediate-cybersecurity.pdf",
        linkLabel: "Intermediate Cybersecurity certificate (PDF)",
      },
      {
        start: "Dec 2025",
        role: "Intro to Cybersecurity",
        org: "CodePath",
        link: "/codepath-intro-to-cybersecurity.pdf",
        linkLabel: "Intro to Cybersecurity certificate (PDF)",
      },
      {
        start: "Nov 2025",
        role: "Career.edYOU Academy",
        org: "JPMorganChase",
        link: "/jpmorgan-career-edyou-academy.pdf",
        linkLabel: "Career.edYOU Academy certificate (PDF)",
      },
      {
        start: "Mar 2025",
        role: "Google Cybersecurity Certificate",
        org: "Coursera",
        link: "/google-cybersecurity-certificate.pdf",
        linkLabel: "Google Cybersecurity Certificate (PDF)",
      },
    ],
  },

];
