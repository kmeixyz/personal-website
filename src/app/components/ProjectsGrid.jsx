import Link from "next/link";
import { ArrowUpRight } from "@/app/components/icons";
import { Github } from "@/app/components/brand-icons";
import { GITHUB } from "@/app/lib/site";
import { Reveal } from "@/app/components/motion";
import SectionDock from "@/app/components/SectionDock";
import SplitRows from "@/app/components/SplitRows";
import { AIIcon, GameIcon, SecurityIcon } from "@/app/components/section-icons";
import { PROJECT_GROUPS, hasStudy } from "@/app/lib/projects";

/* Keyed by section id rather than listed in order, so a category added to
   PROJECT_CATEGORIES without a glyph shows up here as a hole rather than
   silently taking someone else's. */
const ICONS = {
  cybersecurity: <SecurityIcon />,
  "game-dev": <GameIcon />,
  ai: <AIIcon />,
};

export default function ProjectsGrid() {
  /* Same index /experience carries: the floating glass dock, a glyph per
     category that spells its own name out when the pointer is on it. The
     9rem rail column it replaced is gone, so the rows run the full measure,
     and each group keeps its heading so a deep link or a phone still says
     which section it landed in. */
  const sections = PROJECT_GROUPS.map(({ id, label }) => ({
    id,
    label,
    icon: ICONS[id],
  }));

  return (
    <div>
      <SectionDock sections={sections} />

      <div>
        {PROJECT_GROUPS.map((group) => (
          <section
            key={group.id}
            id={group.id}
            aria-labelledby={`${group.id}-heading`}
            className="mt-14 scroll-mt-24 first:mt-0"
          >
            <Reveal
              as="h2"
              id={`${group.id}-heading`}
              className="eyebrow mb-2 border-b border-line pb-3"
            >
              {group.label}
            </Reveal>
            {/* Two columns, the same ones /experience runs, from the same
                component. These rows are taller than that page's - a blurb, an
                achievements list and a row of tags rather than three lines -
                so the reclaimed width matters more here, not less: at full
                measure every one of them was setting 62 characters of prose
                across a 1100px row and leaving the rest empty.

                Every group splits, including the two-row ones, where the split
                is simply one row beside another. A section that stayed in one
                column while the ones above and below it were in two would read
                as a mistake rather than as a decision about that section. */}
            <SplitRows
              items={group.items}
              split
              gap={0.06}
              keyOf={(p) => p.slug}
              row={(p) => <ProjectRow p={p} />}
            />
          </section>
        ))}
      </div>
    </div>
  );
}

function ProjectRow({ p }) {
  return (
    <article
      id={p.slug}
      className="row-link scroll-mt-24 border-b border-line py-7"
    >
      {p.status && (
        <p className="mb-2">
          <span className="tech">{p.status}</span>
        </p>
      )}

      {/* Only the title shares a row with the icons; the prose runs
          full width, worth ~2 lines of wrapping on a phone. */}
      <div className="flex items-start justify-between gap-4">
        <h3 className="min-w-0 font-serif text-[1.35rem] font-[550] leading-snug">
          {hasStudy(p) ? (
            <Link
              href={`/projects/${p.slug}`}
              className="relative z-10 rounded-[1px]"
            >
              {p.title}
            </Link>
          ) : (
            p.title
          )}
        </h3>
        {/* gap-2 on a phone, where the boxes are 44px and each
            one's -m-1 pulls it 4px wider: at gap-1 the two hit
            areas overlapped by exactly that 4px, and a tap on the
            seam opened whichever came second. gap-2 makes them
            meet instead. The 36px desktop boxes keep gap-1. */}
        <div className="flex shrink-0 items-center gap-2 md:gap-1">
          {p.live && (
            <IconLink href={p.live} label={`${p.title} live site`}>
              <ArrowUpRight className="h-[1.15rem] w-[1.15rem]" />
            </IconLink>
          )}
          {/* A finished row with no repo of its own still points at
              the profile. One that's in progress doesn't: an icon
              promising code, on a project that has none to show
              yet, sends the reader somewhere they didn't ask to
              go. */}
          {(p.repo || !p.status) && (
            <IconLink
              href={p.repo || GITHUB}
              label={
                p.repo ? `${p.title} on GitHub` : "Kevin Mei's GitHub profile"
              }
            >
              {/* Halfway between the original 1.05rem box and the
                  0.65rem optical match: the octocat still fills more
                  of its viewBox than the arrow, so this reads as
                  slightly larger than the arrow without dwarfing it. */}
              <Github className="h-[0.85rem] w-[0.85rem]" />
            </IconLink>
          )}
        </div>
      </div>
      {/* Same slot the org line occupies on /experience: who did
          it and when, in mono, between the title and the prose. A
          row without either field simply doesn't print one. */}
      {(p.year || p.role) && (
        <p className="meta mt-1">
          {[p.year, p.role].filter(Boolean).join(" \u00b7 ")}
        </p>
      )}

      {p.problem && (
        <p className="mt-2 max-w-[62ch] text-[0.975rem] leading-relaxed text-ink-2">
          {p.problem}
        </p>
      )}

      {p.achievements?.length > 0 && (
        <div className="mt-5">
          <h4 className="eyebrow">achievements</h4>
          <ul className="mt-2 max-w-[62ch] list-disc space-y-1.5 pl-[1.15rem] text-[0.975rem] leading-relaxed text-ink-2 marker:text-faint">
            {p.achievements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {p.stack?.length > 0 && (
        <div className="mt-5">
          <h4 className="eyebrow">technologies</h4>
          <ul className="mt-2 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <li key={s} className="tech">
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* The only break in the rail-and-rows rhythm. */}
      {p.shot && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={p.shot}
          alt={`${p.title} interface`}
          width={1280}
          height={800}
          loading="lazy"
          className="mt-5 w-full border border-line bg-paper-2"
        />
      )}
    </article>
  );
}

function IconLink({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="row-icon relative z-10 -m-1 inline-flex h-11 w-11 items-center justify-center p-1 md:h-9 md:w-9"
    >
      {children}
    </a>
  );
}
