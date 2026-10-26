import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowDown, ArrowRight, BookOpen, Download, ShieldAlert } from "lucide-react";
import { LabInstrument } from "@/components/LabInstrument";
import { PackageIllustration } from "@/components/Illustrations";
import { packages, type LabPackage } from "@/data/packages";
import markReverse from "@/assets/labs-mark-reverse.png";
import wordmarkReverse from "@/assets/labs-wordmark-reverse.png";

const ease = [0.22, 1, 0.36, 1] as const;

// Slides content up as it enters the viewport. Opacity stays at 1, so nothing is hidden at rest.
function Rise({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
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

function SectionTitle({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
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

function Nav() {
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
          <a href="#packages" className="hidden hover:text-turquoise md:inline">Packages</a>
          <a href="#how-it-works" className="hidden hover:text-turquoise md:inline">How it works</a>
          <a href="#disclaimer" className="hidden hover:text-turquoise md:inline">Disclaimer</a>
          <a href="#packages" className="btn-primary !px-4 !py-2 !text-[14px]">Browse packages</a>
        </nav>
      </div>
      <motion.div className="h-[3px] origin-left bg-turquoise" style={{ scaleX: progress }} />
    </header>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  const item = (i: number) => ({
    initial: reduce ? false : { y: 28, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, delay: 0.15 + i * 0.12, ease },
  });
  return (
    <section id="top" className="relative overflow-hidden bg-teal-dark text-white">
      <div className="gutter mx-auto grid max-w-page items-center gap-10 pb-16 pt-14 lg:grid-cols-[1.05fr_1fr] lg:pb-24 lg:pt-20">
        <div className="flex min-w-0 flex-col gap-6">
          <motion.span className="accent-bar" {...item(0)} />
          <motion.p className="eyebrow text-turquoise" {...item(1)}>
            Built by the people who build Chargent
          </motion.p>
          <motion.h1
            className="text-[44px] font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-[60px] lg:text-[72px]"
            {...item(2)}
          >
            Salesforce packages for the payment problems <span className="text-turquoise">nobody else solved.</span>
          </motion.h1>
          <motion.p className="max-w-[54ch] text-[18px] leading-[1.6] text-white/85" {...item(3)}>
            Chargent Labs is where our engineers, consultants and support team share the tools they built while
            helping customers with unusual use cases. Each one is a free, unmanaged package you can install,
            read and adapt.
          </motion.p>
          <motion.div className="flex flex-wrap gap-3" {...item(4)}>
            <a href="#packages" className="btn-primary">
              See the packages <ArrowDown className="h-4 w-4" />
            </a>
            <a href="#disclaimer" className="btn-ghost">Read the disclaimer</a>
          </motion.div>
          <motion.p className="flex max-w-[56ch] items-start gap-2 text-[13px] leading-[1.5] text-white/70" {...item(5)}>
            <ShieldAlert className="mt-[2px] h-4 w-4 shrink-0 text-yellow" />
            Community projects. Free to use, not official Chargent products, and not covered by Chargent Support.
          </motion.p>
        </div>
        <div className="flex min-w-0 justify-center lg:justify-end">
          <LabInstrument />
        </div>
      </div>
      <FactStrip />
    </section>
  );
}

const facts = [
  { value: "3", label: "packages on the bench" },
  { value: "$0", label: "to install, always" },
  { value: "100%", label: "of the source is yours to read" },
  { value: "Unmanaged", label: "so you can change anything" },
];

function FactStrip() {
  return (
    <div className="bg-turquoise text-teal-dark">
      <div className="gutter mx-auto grid max-w-page grid-cols-2 gap-x-6 gap-y-5 py-6 md:grid-cols-4">
        {facts.map((f, i) => (
          <Rise key={f.label} delay={i * 0.06}>
            <p className="text-[28px] font-black leading-none tracking-[-0.02em] tabular-nums">{f.value}</p>
            <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.06em]">{f.label}</p>
          </Rise>
        ))}
      </div>
    </div>
  );
}

function PackageRow({ pkg, index }: { pkg: LabPackage; index: number }) {
  const flip = index % 2 === 1;
  return (
    <article className="grid gap-8 border-b-2 border-teal-dark pb-14 last:border-b-0 lg:grid-cols-2 lg:items-center lg:gap-14">
      <Rise className={`flex min-w-0 flex-col gap-5 ${flip ? "lg:order-2" : ""}`}>
        <div className="flex items-center gap-3">
          <span className="bg-teal-dark px-2 py-1 text-[12px] font-bold tracking-[0.12em] text-turquoise tabular-nums">
            {pkg.id}
          </span>
          <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-teal">Unmanaged package</span>
        </div>
        <h3 className="text-[30px] font-bold leading-[1.1] tracking-[-0.02em] text-teal-dark sm:text-[36px]">
          {pkg.name}
        </h3>
        <p className="text-[19px] font-semibold leading-[1.4] text-charcoal">{pkg.tagline}</p>
        <p className="max-w-[60ch] text-[16px] leading-[1.65] text-charcoal">{pkg.summary}</p>
        <ul className="flex flex-col gap-2">
          {pkg.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-[15px] leading-[1.5] text-charcoal">
              <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-turquoise ring-2 ring-teal-dark" />
              {h}
            </li>
          ))}
        </ul>
        <dl className="grid gap-3 border-t border-light-gray pt-4 text-[14px] sm:grid-cols-2">
          <div>
            <dt className="eyebrow !text-[11px] text-dark-gray">Works with</dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {pkg.worksWith.map((w) => (
                <span key={w} className="bg-light-gray px-2 py-1 font-medium text-teal-dark">{w}</span>
              ))}
            </dd>
          </div>
          <div>
            <dt className="eyebrow !text-[11px] text-dark-gray">Good for</dt>
            <dd className="mt-2 leading-[1.5] text-charcoal">{pkg.goodFor}</dd>
          </div>
        </dl>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          {pkg.installUrl ? (
            <a href={pkg.installUrl} target="_blank" rel="noreferrer" className="btn-dark">
              <Download className="h-4 w-4" /> Install in a sandbox
            </a>
          ) : (
            <span className="btn cursor-default bg-light-gray text-dark-gray">
              <Download className="h-4 w-4" /> Install link coming soon
            </span>
          )}
          {pkg.docsUrl && (
            <a href={pkg.docsUrl} target="_blank" rel="noreferrer" className="btn text-teal-dark hover:bg-light-gray">
              <BookOpen className="h-4 w-4" /> Setup notes
            </a>
          )}
        </div>
      </Rise>
      <Rise delay={0.12} className={`min-w-0 ${flip ? "lg:order-1" : ""}`}>
        <div className="relative h-[260px] bg-light-gray sm:h-[300px] lg:h-[360px]">
          <span className="absolute left-0 top-0 h-2 w-16 bg-yellow" />
          <PackageIllustration kind={pkg.illustration} />
        </div>
      </Rise>
    </article>
  );
}

function Packages() {
  return (
    <section id="packages" className="scroll-mt-20 bg-white">
      <div className="gutter mx-auto flex max-w-page flex-col gap-14 py-20 lg:py-28">
        <Rise>
          <SectionTitle eyebrow="On the bench" title="Three packages, each from a real customer conversation." />
        </Rise>
        {packages.map((p, i) => (
          <PackageRow key={p.id} pkg={p} index={i} />
        ))}
      </div>
    </section>
  );
}

const steps = [
  {
    title: "A customer hits an edge case",
    body: "A finance team, a gateway or a workflow needs something Chargent doesn't do out of the box.",
  },
  {
    title: "Someone at Chargent builds it",
    body: "An engineer, consultant or support specialist solves it with Apex, Flows and Lightning components.",
  },
  {
    title: "We share it here",
    body: "The solution is packaged as an unmanaged package so any Chargent customer can use it.",
  },
  {
    title: "You install, review and adapt",
    body: "Install it in a sandbox, read the code, change what you need, then deploy it on your own terms.",
  },
];

function HowItWorks() {
  const reduce = useReducedMotion();
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-teal-dark text-white">
      <div className="gutter mx-auto flex max-w-page flex-col gap-14 py-20 lg:py-28">
        <Rise>
          <SectionTitle light eyebrow="How it works" title="From a support call to a package you can install." />
        </Rise>
        <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
          <motion.span
            aria-hidden
            className="absolute left-0 right-0 top-[22px] hidden h-[2px] origin-left bg-turquoise md:block"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.4, ease }}
          />
          {steps.map((s, i) => (
            <Rise key={s.title} delay={0.15 + i * 0.15} className="relative flex flex-col gap-4">
              <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-turquoise text-[16px] font-black text-teal-dark tabular-nums">
                {i + 1}
              </span>
              <h3 className="text-[20px] font-semibold leading-[1.25] text-turquoise">{s.title}</h3>
              <p className="text-[15px] leading-[1.6] text-white/85">{s.body}</p>
            </Rise>
          ))}
        </ol>
      </div>
    </section>
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

function BeforeYouInstall() {
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

function Disclaimer() {
  return (
    <section id="disclaimer" className="scroll-mt-20 bg-white">
      <div className="gutter mx-auto grid max-w-page gap-12 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:py-28">
        <Rise className="flex flex-col gap-6">
          <SectionTitle eyebrow="Disclaimer" title="Free community projects, not official Chargent products." />
          <div className="flex flex-col gap-3">
            {["Free to use", "Not officially tested or documented", "Not supported by Chargent Support"].map((t) => (
              <p
                key={t}
                className="bg-turquoise px-4 py-3 text-[15px] font-black uppercase tracking-[0.04em] text-teal-dark"
              >
                {t}
              </p>
            ))}
          </div>
        </Rise>
        <Rise delay={0.1} className="flex gap-6">
          <span className="w-2 shrink-0 bg-yellow" aria-hidden />
          <div className="flex max-w-[64ch] flex-col gap-5 text-[17px] leading-[1.7] text-charcoal">
            <p>
              Chargent Labs is a program that lets Chargent engineers, solution consultants, support specialists and
              other AppFrontier employees share the Salesforce packages they've built with the Chargent customer
              community. Inspired by our work with customers of every size and industry, these packages range from
              simple utilities to complete integrations.
            </p>
            <p>
              Chargent Labs packages are free to use, but they are not official Chargent products and should be
              considered community projects. They are provided as is, as unmanaged packages, and are not officially
              tested or documented. Chargent Support is not available for Chargent Labs packages, and support cases
              about them can't be accepted.
            </p>
            <p>
              Always install and test a package in a sandbox before using it in production. AppFrontier is not liable
              for issues caused by installing, modifying or using Chargent Labs packages.
            </p>
            <p className="text-[14px] font-medium text-teal">
              <strong className="font-bold">IMPORTANT:</strong> Questions or ideas for a new package? Talk to the
              Chargent Labs team, not Chargent Support.
            </p>
          </div>
        </Rise>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-teal-deeper text-white/75">
      <div className="gutter mx-auto flex max-w-page flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img src={markReverse} alt="" className="h-12 w-auto" />
            <img src={wordmarkReverse} alt="Chargent Labs" className="h-8 w-auto" />
          </div>
          <p className="max-w-[48ch] text-[14px] leading-[1.6]">
            Community-built packages for Chargent, Salesforce-native payment processing by AppFrontier.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-[13px] md:items-end">
          <nav className="flex gap-5 font-medium text-white">
            <a href="#packages" className="hover:text-turquoise">Packages</a>
            <a href="#how-it-works" className="hover:text-turquoise">How it works</a>
            <a href="#disclaimer" className="hover:text-turquoise">Disclaimer</a>
          </nav>
          <p>© {new Date().getFullYear()} AppFrontier. Chargent Labs packages are not official Chargent products.</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Packages />
        <HowItWorks />
        <BeforeYouInstall />
        <Disclaimer />
      </main>
      <Footer />
    </>
  );
}
