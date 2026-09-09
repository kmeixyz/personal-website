import { GITHUB, LINKEDIN, RESUME } from "@/app/lib/site";
import { Github, Linkedin } from "@/app/components/brand-icons";

/**
 * No "Site" column, no email, no rail: on a four-page site each would restate
 * something the nav, the header or the hero facts table already carries.
 */
export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-[1.35rem] font-medium tracking-[-0.02em]">
              Kevin Mei
            </h2>
            <p className="footer-mono meta mt-2">Computer Science | Northwestern</p>
          </div>

          {/* w-fit so the column is the eyebrow's measure in the stacked
              layout too; .footer-social spans that measure, and space-between
              would otherwise fling the marks to both gutters on mobile. */}
          <div className="w-fit">
            <h3 className="footer-mono eyebrow footer-social-label">Elsewhere</h3>
            <div className="footer-social">
              <SocialLink href={GITHUB} label="GitHub" icon={Github} />
              <SocialLink href={LINKEDIN} label="LinkedIn" icon={Linkedin} />
            </div>
            {RESUME && (
              <a href={RESUME} download className="footer-link">
                Résumé
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl border-t border-line px-6 py-5">
        <span className="footer-mono meta">© {new Date().getFullYear()} Kevin Mei</span>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, icon: Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="footer-icon"
    >
      <Icon className="h-[1.6875rem] w-[1.6875rem]" />
    </a>
  );
}
