import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ShieldAlert } from "lucide-react";
import { LabInstrument } from "@/components/LabInstrument";
import { BeforeYouInstall, Rise, SectionTitle, ease } from "@/components/Layout";
import { packages } from "@/data/packages";

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
            <a href="#how-it-works" className="btn-primary">
              See how it works <ArrowDown className="h-4 w-4" />
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
  { value: String(packages.length), label: "packages on the bench" },
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

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <BeforeYouInstall />
      <Disclaimer />
    </>
  );
}
