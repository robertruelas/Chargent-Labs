import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, Download, ShieldAlert } from "lucide-react";
import { PackageIllustration } from "@/components/Illustrations";
import { BeforeYouInstall, Rise, SectionTitle, ease } from "@/components/Layout";
import { packagePath, packages, type LabPackage } from "@/data/packages";

function InstallButtons({ pkg, light = false }: { pkg: LabPackage; light?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {pkg.installUrl ? (
        <a href={pkg.installUrl} target="_blank" rel="noreferrer" className={light ? "btn-primary" : "btn-dark"}>
          <Download className="h-4 w-4" /> Install in a sandbox
        </a>
      ) : (
        <span
          className={`btn cursor-default ${light ? "bg-white/10 text-white/80" : "bg-white text-dark-gray ring-1 ring-inset ring-teal-dark/15"}`}
        >
          <Download className="h-4 w-4" /> Install link coming soon
        </span>
      )}
      {pkg.docsUrl && (
        <a
          href={pkg.docsUrl}
          target="_blank"
          rel="noreferrer"
          className={light ? "btn-ghost" : "btn text-teal-dark hover:bg-light-gray"}
        >
          <BookOpen className="h-4 w-4" /> Setup notes
        </a>
      )}
    </div>
  );
}

function PackageHero({ pkg }: { pkg: LabPackage }) {
  const reduce = useReducedMotion();
  const item = (i: number) => ({
    initial: reduce ? false : { y: 24, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.7, delay: 0.1 + i * 0.1, ease },
  });
  return (
    <section className="bg-teal-dark text-white">
      <div className="gutter mx-auto grid max-w-page items-center gap-10 pb-16 pt-10 lg:grid-cols-[1.05fr_1fr] lg:pb-20 lg:pt-14">
        <div className="flex min-w-0 flex-col gap-6">
          <motion.nav aria-label="Breadcrumb" className="text-[13px] font-medium text-white/70" {...item(0)}>
            <a href="#top" className="hover:text-turquoise">Chargent Labs</a>
            <span className="px-2 text-white/40">/</span>
            <span>Packages</span>
            <span className="px-2 text-white/40">/</span>
            <span className="text-white">{pkg.name}</span>
          </motion.nav>
          <motion.div className="flex items-center gap-3" {...item(1)}>
            <span className="bg-turquoise px-2 py-1 text-[12px] font-bold tracking-[0.12em] text-teal-dark tabular-nums">
              {pkg.id}
            </span>
            <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-turquoise">Unmanaged package</span>
          </motion.div>
          <motion.h1
            className="text-[40px] font-extrabold leading-[1.04] tracking-[-0.03em] sm:text-[54px] lg:text-[60px]"
            {...item(2)}
          >
            {pkg.name}
          </motion.h1>
          <motion.p className="max-w-[46ch] text-[20px] font-medium leading-[1.45] text-white/90" {...item(3)}>
            {pkg.tagline}
          </motion.p>
          <motion.div {...item(4)}>
            <InstallButtons pkg={pkg} light />
          </motion.div>
          <motion.p className="flex max-w-[56ch] items-start gap-2 text-[13px] leading-[1.5] text-white/70" {...item(5)}>
            <ShieldAlert className="mt-[2px] h-4 w-4 shrink-0 text-yellow" />
            Community project. Free to use, not an official Chargent product, and not covered by Chargent Support.
          </motion.p>
        </div>
        <motion.div
          className="relative h-[260px] min-w-0 bg-light-gray sm:h-[300px] lg:h-[360px]"
          initial={reduce ? false : { y: 32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease }}
        >
          <span className="absolute left-0 top-0 h-2 w-16 bg-yellow" />
          <PackageIllustration kind={pkg.illustration} />
        </motion.div>
      </div>
    </section>
  );
}

function PackageDetails({ pkg }: { pkg: LabPackage }) {
  return (
    <section className="bg-white">
      <div className="gutter mx-auto grid max-w-page gap-12 py-20 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16 lg:py-24">
        <Rise className="flex min-w-0 flex-col gap-8">
          <SectionTitle eyebrow="What it does" title={pkg.tagline} />
          <p className="max-w-[62ch] text-[18px] leading-[1.7] text-charcoal">{pkg.summary}</p>
          <ul className="flex flex-col gap-4">
            {pkg.highlights.map((h) => (
              <li key={h} className="flex gap-4 border-b border-light-gray pb-4 text-[16px] leading-[1.55] text-charcoal">
                <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-turquoise ring-2 ring-teal-dark" />
                {h}
              </li>
            ))}
          </ul>
        </Rise>
        <Rise delay={0.1} className="min-w-0">
          <aside className="flex flex-col gap-6 bg-light-gray p-6 lg:sticky lg:top-24">
            <dl className="flex flex-col gap-5 text-[14px]">
              <div>
                <dt className="eyebrow !text-[11px] text-dark-gray">Works with</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {pkg.worksWith.map((w) => (
                    <span key={w} className="bg-white px-2 py-1 font-medium text-teal-dark">{w}</span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="eyebrow !text-[11px] text-dark-gray">Good for</dt>
                <dd className="mt-2 leading-[1.55] text-charcoal">{pkg.goodFor}</dd>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-teal-dark/15 pt-5">
                <div>
                  <dt className="eyebrow !text-[11px] text-dark-gray">Package</dt>
                  <dd className="mt-1 font-semibold text-teal-dark tabular-nums">{pkg.id}</dd>
                </div>
                <div>
                  <dt className="eyebrow !text-[11px] text-dark-gray">Price</dt>
                  <dd className="mt-1 font-semibold text-teal-dark">Free</dd>
                </div>
              </div>
            </dl>
            <InstallButtons pkg={pkg} />
            <p className="flex gap-3 text-[13px] leading-[1.55] text-charcoal">
              <span className="w-1 shrink-0 bg-yellow" aria-hidden />
              <span>
                Provided as is and not supported by Chargent Support.{" "}
                <a href="#disclaimer" className="font-semibold text-teal underline underline-offset-2 hover:text-teal-dark">
                  Read the disclaimer
                </a>
                .
              </span>
            </p>
          </aside>
        </Rise>
      </div>
    </section>
  );
}

function MorePackages({ current }: { current?: LabPackage }) {
  const others = packages.filter((p) => p.slug !== current?.slug);
  return (
    <section className="bg-white">
      <div className="gutter mx-auto flex max-w-page flex-col gap-10 py-20 lg:py-24">
        <Rise>
          <SectionTitle eyebrow="More on the bench" title={current ? (others.length === 1 ? "Another Labs package" : "Other Labs packages") : "Browse the Labs packages"} />
        </Rise>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {others.map((pkg, i) => (
            <Rise key={pkg.slug} delay={i * 0.08} className="bg-white ring-1 ring-inset ring-teal-dark/15">
              <a href={packagePath(pkg)} className="group flex h-full flex-col gap-4 p-6 hover:bg-light-gray">
                <span className="w-fit whitespace-nowrap bg-teal-dark px-2 py-1 text-[12px] font-bold tracking-[0.12em] text-turquoise tabular-nums">
                  {pkg.id}
                </span>
                <h3 className="text-[22px] font-bold leading-[1.2] text-teal-dark">{pkg.name}</h3>
                <p className="text-[15px] leading-[1.55] text-charcoal">{pkg.tagline}</p>
                <span className="mt-auto flex items-center gap-2 pt-2 text-[14px] font-semibold text-teal-dark">
                  View package
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </a>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PackagePage({ slug }: { slug: string }) {
  const pkg = packages.find((p) => p.slug === slug);

  if (!pkg) {
    return (
      <>
        <section className="bg-teal-dark text-white">
          <div className="gutter mx-auto flex max-w-page flex-col gap-6 py-20">
            <span className="accent-bar" />
            <h1 className="text-[40px] font-extrabold leading-[1.05] tracking-[-0.03em]">We couldn't find that package.</h1>
            <a href="#top" className="btn-primary w-fit">
              <ArrowLeft className="h-4 w-4" /> Back to Chargent Labs
            </a>
          </div>
        </section>
        <MorePackages />
      </>
    );
  }

  return (
    <>
      <PackageHero pkg={pkg} />
      <PackageDetails pkg={pkg} />
      <BeforeYouInstall />
      <MorePackages current={pkg} />
    </>
  );
}
