import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { packagePath, packages } from "@/data/packages";
import markReverse from "@/assets/labs-mark-reverse.png";
import wordmarkReverse from "@/assets/labs-wordmark-reverse.png";

export const ease = [0.22, 1, 0.36, 1] as const;

// Slides content up as it enters the viewport. Opacity stays at 1, so nothing is hidden at rest.
export function Rise({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { y: 40 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function SectionTitle({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
  return (
    <div className="flex flex-col gap-3">
      <p className={`eyebrow ${light ? "text-turquoise" : "text-teal"}`}>{eyebrow}</p>
      <h2
        className={`max-w-[22ch] text-[34px] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[44px] ${
          light ? "text-white" : "text-teal-dark"
        }`}
      >
        {title}
      </h2>
      <span className={`mt-3 block h-[2px] w-full ${light ? "bg-white/25" : "bg-teal-dark"}`} />
    </div>
  );
}

// The "Packages" menu: opens on click or hover, lists every package with its tagline,
// and closes on Escape, an outside click, or choosing a package.
function PackagesMenu({ activeSlug }: { activeSlug?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close when the route changes (a package was picked).
  useEffect(() => setOpen(false), [activeSlug]);

  return (
    <div
      ref={ref}
      className="relative"
      onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="packages-menu"
        // A mouse has already opened it on hover, so a click keeps it open; touch and keyboard toggle.
        onClick={(e) =>
          (e.nativeEvent as PointerEvent).pointerType === "mouse" ? setOpen(true) : setOpen((o) => !o)
        }
        className={`flex items-center gap-1 py-2 hover:text-turquoise ${activeSlug ? "text-turquoise" : ""}`}
      >
        Packages
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id="packages-menu"
            initial={reduce ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease }}
            className="fixed left-4 right-4 top-[68px] z-50 pt-2 sm:absolute sm:left-auto sm:right-[-12px] sm:top-full sm:w-[380px]"
          >
            <div className="border-t-4 border-yellow bg-white text-charcoal ring-1 ring-teal-dark/15">
              <p className="eyebrow border-b border-light-gray px-5 py-3 !text-[11px] text-teal">On the bench</p>
              <ul>
                {packages.map((pkg) => {
                  const active = pkg.slug === activeSlug;
                  return (
                    <li key={pkg.slug}>
                      <a
                        href={packagePath(pkg)}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setOpen(false)}
                        className={`group flex gap-4 border-b border-light-gray px-5 py-4 last:border-b-0 hover:bg-light-gray ${
                          active ? "bg-light-gray" : ""
                        }`}
                      >
                        <span className="mt-[2px] h-fit shrink-0 whitespace-nowrap bg-teal-dark px-[6px] py-[2px] text-[11px] font-bold tracking-[0.1em] text-turquoise tabular-nums">
                          {pkg.id}
                        </span>
                        <span className="flex min-w-0 flex-col gap-1">
                          <span className="flex items-center gap-2 text-[15px] font-semibold text-teal-dark">
                            {pkg.name}
                            <ArrowRight className="h-4 w-4 shrink-0 -translate-x-1 opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                          </span>
                          <span className="text-[13px] leading-[1.45] text-dark-gray">{pkg.tagline}</span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Nav({ activeSlug }: { activeSlug?: string }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-40 bg-teal-dark">
      <div className="gutter mx-auto flex max-w-page items-center justify-between gap-4 py-3">
        <a href="#top" className="flex items-center gap-3" aria-label="Chargent Labs home">
          <img src={markReverse} alt="" className="h-10 w-auto" />
          <img src={wordmarkReverse} alt="Chargent Labs" className="h-7 w-auto" />
        </a>
        <nav className="flex items-center gap-6 text-[14px] font-medium text-white/85">
          <PackagesMenu activeSlug={activeSlug} />
          <a href="#how-it-works" className="hidden hover:text-turquoise md:inline">How it works</a>
          <a href="#disclaimer" className="hidden hover:text-turquoise md:inline">Disclaimer</a>
        </nav>
      </div>
      <motion.div className="h-[3px] origin-left bg-turquoise" style={{ scaleX: progress }} />
    </header>
  );
}

const checklist = [
  {
    title: "Install in a sandbox first",
    body: "Test every Labs package in a sandbox with your own data and automation before it goes near production.",
  },
  {
    title: "You own the code after install",
    body: "Unmanaged packages don't receive automatic upgrades. New versions are installed fresh, and your changes are yours to maintain.",
  },
  {
    title: "Check your Chargent setup",
    body: "Packages assume a working Chargent install. Confirm your Chargent version and gateway configuration before you begin.",
  },
  {
    title: "Review permissions and code",
    body: "Read through the Apex, Flows and permission sets so you know what the package does in your org.",
  },
];

export function BeforeYouInstall() {
  return (
    <section className="bg-light-gray">
      <div className="gutter mx-auto grid max-w-page gap-12 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:py-28">
        <Rise>
          <SectionTitle eyebrow="Before you install" title="Four things to know about unmanaged packages." />
        </Rise>
        <div className="grid gap-px bg-teal-dark/15 sm:grid-cols-2">
          {checklist.map((c, i) => (
            <Rise key={c.title} delay={i * 0.08} className="flex flex-col gap-3 bg-light-gray p-6">
              <span className="flex h-6 w-6 items-center justify-center bg-teal-dark text-turquoise">
                <ArrowRight className="h-4 w-4" />
              </span>
              <h3 className="text-[18px] font-semibold text-teal-dark">{c.title}</h3>
              <p className="text-[15px] leading-[1.6] text-charcoal">{c.body}</p>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-teal-deeper text-white/75">
      <div className="gutter mx-auto flex max-w-page flex-col gap-10 py-12 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img src={markReverse} alt="" className="h-12 w-auto" />
            <img src={wordmarkReverse} alt="Chargent Labs" className="h-8 w-auto" />
          </div>
          <p className="max-w-[48ch] text-[14px] leading-[1.6]">
            Community-built packages for Chargent, Salesforce-native payment processing by AppFrontier.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 text-[13px] sm:gap-16">
          <div className="flex flex-col gap-3">
            <p className="eyebrow !text-[11px] text-turquoise">Packages</p>
            {packages.map((pkg) => (
              <a key={pkg.slug} href={packagePath(pkg)} className="font-medium text-white hover:text-turquoise">
                {pkg.name}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <p className="eyebrow !text-[11px] text-turquoise">Labs</p>
            <a href="#top" className="font-medium text-white hover:text-turquoise">Home</a>
            <a href="#how-it-works" className="font-medium text-white hover:text-turquoise">How it works</a>
            <a href="#disclaimer" className="font-medium text-white hover:text-turquoise">Disclaimer</a>
          </div>
        </div>
      </div>
      <div className="gutter mx-auto max-w-page border-t border-white/10 py-5 text-[13px]">
        <p>© {new Date().getFullYear()} AppFrontier. Chargent Labs packages are not official Chargent products.</p>
      </div>
    </footer>
  );
}
