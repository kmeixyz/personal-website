import { ArrowUpRight } from "@/app/components/icons";
import { Reveal } from "@/app/components/motion";
import SectionDock from "@/app/components/SectionDock";
import SplitRows from "@/app/components/SplitRows";
import {
  CertificationIcon,
  CommunityIcon,
  EducationIcon,
  WorkIcon,
} from "@/app/components/section-icons";
import { cn } from "@/app/lib/cn";
import { GROUPS } from "@/app/lib/experience";

/**
 * Working history as a rail-and-column index: dates left, role and detail
 * right, hairlines instead of cards. The entries, and what each field on one
 * means, live in lib/experience.js.
 */

const slug = (label) => label.toLowerCase();

/**
 * True when a row's arrow points at a credential this site serves itself - a
 * certificate PDF in /public - rather than out to an organisation. Those rows
 * hand the whole entry to the link; see the note at the top of the file.
 */
const isCredential = (item) => /^\/[^\s]+\.pdf$/.test(item.link ?? "");

/**
 * Stable anchor for one role, so a single entry can be linked in an email.
 *
 * The start date is in here because org and title are not enough to tell two
 * rows apart: there are two Undergraduate Researcher posts at Knight Lab, and
 * without the date they would collide into one duplicated DOM id and one
 * duplicated React key. Adding it to every row rather than only to the clashing
 * pair keeps the rule readable - "the role you held there, starting then" -
 * instead of an id that silently means something different on two rows.
 */
const roleId = (item) =>
  `${item.org} ${item.role} ${item.start}`
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/* Keyed by section id rather than listed in order, so a group added to GROUPS
   without a glyph shows up here as a hole rather than silently taking someone
   else's. */
const ICONS = {
  work: <WorkIcon />,
  education: <EducationIcon />,
  community: <CommunityIcon />,
  certification: <CertificationIcon />,
};

export default function ExperienceExplorer() {
  const sections = GROUPS.map(({ label }) => {
    const id = slug(label);
    return { id, label, icon: ICONS[id] };
  });

  return (
    /* The section index floats now, so the 9rem rail column it used to sit in
       is gone and the rows run the full measure. Each row keeps its own inner
       date rail, which is what still leads the eye down the page. */
    <div>
      <SectionDock sections={sections} />

      <div>
        {GROUPS.map((group) => {
          const id = slug(group.label);
          return (
            <section
              key={group.label}
              id={id}
              aria-labelledby={`${id}-heading`}
              /* mt-14, the same gap /projects leaves before each of its
                 category headings. It had been pulled in to mt-10 when this page
                 was tightened; the row padding and the section padding kept that
                 trim, but the space before a heading is what separates one
                 section from the last, and the two index pages have to break at
                 the same interval or they stop reading as one object. */
              className="mt-14 scroll-mt-24 first:mt-0"
            >
              {/* Visible at every width and in print. The rail index is
                  navigation; this is the section's actual heading, so a deep link
                  or a printed page still says what it landed in. */}
              <Reveal
                as="h2"
                id={`${id}-heading`}
                className="eyebrow mb-2 border-b border-line pb-3"
              >
                {group.label}
              </Reveal>

              {/* Down the first column and on down the second - newspaper order,
                  so a split run stays in the order the items are written in.
                  See SplitRows for the layout itself; it is shared with
                  /projects. */}
              <SplitRows
                items={group.items}
                split={group.split}
                keyOf={roleId}
                row={(item) => <Entry item={item} />}
              />
            </section>
          );
        })}
      </div>
    </div>
  );
}

/** One role: dates in the rail, everything else in the column beside them. */
function Entry({ item }) {
  return (
    <article className="grid grid-cols-1 gap-x-8 border-b border-line py-4 md:grid-cols-[4.5rem_1fr] lg:gap-x-6">
      {/* Rail: start over end, no dash. Tabular figures plus the flush-right
          edge line the two dates up as a column. A one-off like a certificate
          has no `end`, so the second line simply doesn't print. */}
      <p className="rail mb-1 md:mb-0 md:pt-[0.3rem]">
        <span className="block text-ink">{item.start}</span>
        {item.end && <span className="block text-faint">{item.end}</span>}
      </p>

      <div id={roleId(item)} className="row-link scroll-mt-28">
        {/* Only the role shares a row with the arrow; the org and detail below
            run the full column width. */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="exp-role min-w-0 font-serif text-[1.2rem] font-medium leading-snug">
            {item.role}
          </h3>

          {/* The arrow is the hit target. Row hover still tints it; hovering
              the control itself goes darker. In a row whose link is the
              credential itself it also stretches over the entry, so anywhere
              in the text column opens it — the dates in the rail stay
              outside. */}
          {item.link && (
            <a
              href={item.link}
              aria-label={item.linkLabel ?? `${item.org} website`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "row-icon -m-2 inline-flex h-11 w-11 shrink-0 items-center justify-center p-2 md:h-9 md:w-9",
                isCredential(item) && "row-target",
              )}
            >
              <ArrowUpRight className="h-[1.1rem] w-[1.1rem]" />
            </a>
          )}
        </div>

        {/* Dates live in the rail now, so this is just the org. */}
        <p className="meta exp-org mt-1">{item.org}</p>

        {item.did && (
          <p className="exp-copy mt-1.5 max-w-[62ch] text-[0.975rem] leading-relaxed text-ink-2">
            {item.didLink ? (
              /* Padding with no matching negative margin, unlike `.tap`: the
                 anchor is inline, so the extra hit area overflows the line
                 instead of moving it, and the label stays flush with the org
                 above. */
              <a
                href={item.didLink}
                /* Undefined leaves the attribute off, so the accessible name
                   stays the visible label. Only a row whose label doesn't say
                   where it goes, like one opening a PDF, needs to override
                   it. */
                aria-label={item.didLinkLabel}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 py-3.5 text-link underline decoration-line-2 underline-offset-4 transition-colors hover:decoration-link"
              >
                {item.did}
              </a>
            ) : (
              item.did
            )}
          </p>
        )}

        {/* The gap lives on the wrapper, not the link: `.tap` cancels its own
            hit-area padding with a matching negative margin, and an `mt-*` on
            the link itself would override that and push the text down. */}
        {item.stack?.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-2">
            {item.stack.map((s) => (
              <li key={s} className="tech">
                {s}
              </li>
            ))}
          </ul>
        )}

        {item.href && (
          <div className="mt-1.5 flex items-start">
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="exp-copy tap relative z-10 inline-block text-[0.975rem] leading-relaxed text-link underline decoration-line-2 underline-offset-4 transition-colors hover:decoration-link"
            >
              {item.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
