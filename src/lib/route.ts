import { useEffect, useState } from "react";

// Hash routing keeps the site a single static page, so it works on GitHub Pages
// and in the single-file preview without server rewrites.
//   #/packages/<slug>  -> that package's page
//   anything else      -> home; a plain hash like #disclaimer scrolls to that section
export type Route = { page: "home"; section?: string } | { page: "package"; slug: string };

function parse(hash: string): Route {
  const m = hash.match(/^#\/packages\/([\w-]+)\/?$/);
  if (m) return { page: "package", slug: m[1] };
  const section = hash.replace(/^#\/?/, "");
  return { page: "home", section: section || undefined };
}

export function useRoute(): Route {
  const [route, setRoute] = useState(() => parse(window.location.hash));

  useEffect(() => {
    const onChange = () => setRoute(parse(window.location.hash));
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  // After a route change, jump to the top of a new page or to the named home section.
  useEffect(() => {
    const target = route.page === "home" && route.section ? document.getElementById(route.section) : null;
    requestAnimationFrame(() => {
      if (target) target.scrollIntoView();
      else window.scrollTo({ top: 0, behavior: "instant" });
    });
  }, [route]);

  return route;
}
