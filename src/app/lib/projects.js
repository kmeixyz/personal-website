/**
 * Single source for the home list, the /projects index and each case-study page.
 *
 * /projects renders in `PROJECT_CATEGORIES` order — one section per category,
 * the same way /experience splits Work, Education, Campus. The home page
 * picks its own three out of this list.
 *
 * Optional fields degrade rather than break: `shot` (screenshot), `repo`
 * (else the icon falls back to the profile),
 * `achievements` (bullets on /projects), `year` and `role` (the credit line
 * under the title - "2026 - solo", "2026 - team of 4"), `status` (a tag for
 * work that isn't finished), `study` (an ordered list of [label, prose] pairs
 * that gives the project a /projects/[slug] page; see the README for what
 * each section is asking for).
 */
// Section order on /projects. Not exported: callers want PROJECT_GROUPS.
const PROJECT_CATEGORIES = ["Cybersecurity", "Game Dev", "AI"];

export const PROJECTS = [
  /* Unfinished, and said so rather than shown as an empty row: `status` prints
     a tag, and the fields that have nothing to say are left off entirely
     instead of carrying filler. Fill them in and delete the `status` line
     when a project is ready to sit with the rest of its section. */
  {
    slug: "phishing-detector",
    category: "Cybersecurity",
    title: "Phishing Detector",
    blurb:
      "Paste a URL and get a phishing verdict with the evidence behind it. Collectors fetch hostile pages in a container so the host never runs them.",
    problem:
      "Public web app that checks a pasted link for phishing and explains the evidence in plain English.",
    stack: ["Python", "FastAPI", "scikit-learn", "Jinja"],
    achievements: [
      "Nine parallel checks under one 45 s budget, so a hang stalls nothing",
      "Explains each verdict with exact TreeSHAP attributions",
      "Zero false scam calls on the 1,000 most-visited websites",
      "Abstains when the model and the rules disagree",
    ],
    live: "https://www.phishy.help",
    repo: "https://github.com/kmeixyz/phishing-detector",
  },
  {
    slug: "vulnerability-scanner",
    category: "Cybersecurity",
    title: "Security Scanner",
    status: "In progress",
    blurb:
      "Point it at a site. A crawler maps forms and parameters, then OWASP ZAP attacks them. Alerts that fail a retest are left out of the count.",
    problem:
      "Public web app that crawls a site and counts only the OWASP ZAP findings it could re-prove.",
    stack: ["Python", "OWASP ZAP", "Flask", "BeautifulSoup", "Vite"],
    achievements: [
      "Only one issue, plain HTTP, on a control shop written correctly",
      "Keeps 9 unreproduced ZAP alerts out of the practice app\u2019s 34 issues",
      "Says nothing was tested when a crawl finds no forms or parameters",
    ],
  },
  {
    slug: "waiting-at-lurie",
    category: "Game Dev",
    title: "Waiting at Lurie Children’s",
    blurb:
      "Twelve short solo games for children waiting at Lurie Children’s Hospital: mix colors, sort pebbles, steer a robot, or take a 3D sky ride. No accounts, and nothing saved about them.",
    problem:
      "Mobile-first set of twelve low-pressure games for children in the waiting rooms at Lurie Children’s Hospital.",
    stack: ["React", "TypeScript", "Three.js", "Vite"],
    achievements: [
      "Twelve games, easiest first so non-readers can start on one tap",
      "Optional timer; paused or hidden time never ends a round",
      "Each finished game earns a sticker for an on-device sticker book",
      "No patient data; on-device usage counters only",
      "Calmer motion, bigger text, solid backgrounds",
    ],
    live: "https://www.waitingatlurie.org",
    repo: "https://github.com/kmeixyz/waiting-at-lurie",
  },
  {
    slug: "mobile-console",
    category: "Game Dev",
    title: "Mobile Console",
    blurb:
      "Kart racing, air hockey, table tennis, archery, fruit slice and seven more on a shared screen, with each player\u2019s phone as the controller. Nothing to install.",
    problem:
      "Browser party console: scan a QR code, then point your phone at the big screen to play twelve games.",
    stack: ["React", "TypeScript", "Three.js", "WebRTC", "Supabase"],
    achievements: [
      "Twelve games played by pointing a paired phone at the screen",
      "Direct WebRTC pairing, with a Supabase relay when networks block it",
      "Up to four phones, with bots in empty seats, plus Game night",
      "No accounts; phones send controls, not raw sensor data",
    ],
    live: "https://mconsole.fun",
    repo: "https://github.com/kmeixyz/mobile-console",
  },
  {
    slug: "census-bot",
    category: "AI",
    title: "CensusBot",
    blurb:
      "Reporters on deadline can ask for Census figures in plain English and get them back without writing a query. Covers 37 metrics from the American Community Survey.",
    problem:
      "Plain-English U.S. Census lookup tool built at Northwestern Knight Lab.",
    stack: ["Python", "NLP", "Census API", "React"],
    achievements: [
      "Supports 37 ACS metrics",
      "Resolves tables and returns figures automatically",
      "Enables plain-English Census queries",
    ],
    live: "https://census-bot.tech",
    repo: "https://github.com/kmeixyz/census-bot",
    study: [
      ["The problem", ""],
      ["What I built", ""],
      ["Decisions", ""],
      ["What I'd change", ""],
    ],
  },
  {
    slug: "crt-ai-dashboard",
    category: "AI",
    title: "CRT AI Dashboard",
    blurb:
      "Drafts lesson plans, activities and assessments for high school STEM teachers, then reviews its own output for bias before a teacher sees it.",
    problem:
      "Generates culturally responsive teaching materials with built-in bias and accessibility checks.",
    stack: ["React", "Vite", "Gemini API", "Framer Motion"],
    achievements: [
      "Generates STEM lesson plans, activities, and assessments",
      "Checks drafts for bias, accessibility, and stereotype risk",
      "Flags deficit language",
    ],
    live: "https://crt-ai-dashboard.vercel.app",
    repo: "https://github.com/kmeixyz/crt-ai-dashboard",
    study: [
      ["The problem", ""],
      ["What I built", ""],
      ["Decisions", ""],
      ["What I'd change", ""],
    ],
  },
  {
    slug: "paralytica",
    category: "AI",
    title: "Paralytica",
    blurb:
      "Built over a weekend at WildHacks 2026. Two versions of your future, side by side, branching apart as the decisions change.",
    problem:
      "WildHacks 2026 app that visualizes two possible futures from a short questionnaire.",
    stack: ["React", "Vite", "Express", "Gemini API"],
    achievements: [
      "Built over a weekend",
      "Generates side-by-side future scenarios",
      "Caches Gemini responses for API downtime",
    ],
    live: "https://paralytica.tech",
    repo: "https://github.com/VinnyT456/Wildhacks-2026",
    study: [
      ["The problem", ""],
      ["What I built", ""],
      ["Decisions", ""],
      ["What I'd change", ""],
    ],
  },
];

const slugify = (label) =>
  label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** One group per category, in `PROJECT_CATEGORIES` order. */
export const PROJECT_GROUPS = PROJECT_CATEGORIES.map((label) => ({
  id: slugify(label),
  label,
  items: PROJECTS.filter((p) => p.category === label),
}));

/** Only the sections that actually have prose in them. */
export const writtenSections = (p) =>
  (p.study ?? []).filter(([, prose]) => prose.trim());

/**
 * A project earns a page once one `study` section is written. Before that the
 * page would only repeat the index, so none is generated and the row links to
 * the live site instead.
 */
export const hasStudy = (p) => writtenSections(p).length > 0;

export const withStudy = PROJECTS.filter(hasStudy);

export const bySlug = (slug) => PROJECTS.find((p) => p.slug === slug);
