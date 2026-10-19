import { withStudy } from "@/app/lib/projects";
import { SITE_URL } from "@/app/lib/site";

export default function sitemap() {
  const now = new Date();
  // "" is Home; /about remains a legacy redirect, and a sitemap that lists a
  // redirect would ask a crawler to index a hop.
  const routes = ["", "/experience", "/projects"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const projects = withStudy.map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...routes, ...projects];
}
