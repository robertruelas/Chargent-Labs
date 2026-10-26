import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import type { Illustration } from "@/data/packages";

// Small looping demos, one per package. Each runs through `steps` while on screen;
// with reduced motion it rests on the finished state.
function useLoop(steps: number, interval = 1000) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(steps - 1);

  useEffect(() => {
    if (reduce || !inView) return;
    setStep(0);
    const t = window.setInterval(() => setStep((s) => (s + 1) % steps), interval);
    return () => window.clearInterval(t);
  }, [inView, reduce, steps, interval]);

  return { ref, step: reduce ? steps - 1 : step };
}

const rows = [
  { label: "Payment · Acme Corp", amount: "$1,250.00" },
  { label: "Payment · Northwind", amount: "$480.00" },
  { label: "Payment · Globex", amount: "$3,075.50" },
];

function Ledger() {
  const { ref, step } = useLoop(5, 900);
  return (
    <div ref={ref} className="grid h-full grid-cols-[1fr_auto_1fr] items-center gap-3 p-5 text-[11px]">
      <div className="flex min-w-0 flex-col gap-2">
        <p className="eyebrow !text-[10px] text-teal-dark">Chargent</p>
        {rows.map((r) => (
          <div key={r.label} className="flex justify-between gap-2 bg-white px-2 py-2 tabular-nums text-charcoal">
            <span className="truncate">{r.label}</span>
            <span className="font-semibold">{r.amount}</span>
          </div>
        ))}
      </div>
      <div className="relative h-full w-8">
        <div className="absolute left-1/2 top-[28%] h-[60%] w-[2px] -translate-x-1/2 bg-teal-dark/20" />
        <motion.span
          className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-yellow"
          animate={{ top: `${32 + Math.min(step, 2) * 20}%` }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />
      </div>
      <div className="flex min-w-0 flex-col gap-2">
        <p className="eyebrow !text-[10px] text-teal-dark">Accounting Seed</p>
        {rows.map((r, i) => (
          <motion.div
            key={r.label}
            className="flex items-center justify-between gap-2 px-2 py-2 tabular-nums"
            animate={{
              backgroundColor: step > i ? "#005452" : "#FFFFFF",
              color: step > i ? "#FFFFFF" : "#838689",
            }}
            transition={{ duration: 0.35 }}
          >
            <span className="truncate">Cash receipt</span>
            <span className="flex items-center gap-1 font-semibold">
              {step > i ? <Check className="h-3 w-3 text-turquoise" strokeWidth={3} /> : null}
              {step > i ? r.amount : "—"}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const lines = [
  { w: "70%", label: "Implementation services" },
  { w: "55%", label: "Annual license × 25" },
  { w: "62%", label: "Onboarding" },
];

function Invoice() {
  const { ref, step } = useLoop(6, 800);
  return (
    <div ref={ref} className="flex h-full items-center justify-center gap-4 p-5 text-[11px]">
      <div className="hidden w-[38%] flex-col gap-2 sm:flex">
        <p className="eyebrow !text-[10px] text-teal-dark">Opportunity</p>
        <div className="bg-white p-3 text-charcoal">
          <p className="font-semibold">Acme Corp · Renewal</p>
          <p className="mt-1 text-dark-gray">3 products</p>
          <p className="mt-2 text-[15px] font-bold tabular-nums text-teal-dark">$18,400.00</p>
        </div>
      </div>
      <div className="relative h-[150px] w-[150px] shrink-0 bg-white p-3 text-charcoal sm:w-[46%]">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-extrabold tracking-[0.12em] text-teal-dark">INVOICE</span>
          <span className="h-3 w-3 rounded-full bg-turquoise" />
        </div>
        <div className="mt-1 h-[2px] w-full bg-teal-dark" />
        <div className="mt-3 flex flex-col gap-2">
          {lines.map((l, i) => (
            <motion.div
              key={l.label}
              className="h-[6px] bg-light-gray"
              initial={false}
              animate={{ width: step > i ? l.w : "0%" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
          ))}
        </div>
        <motion.div
          className="absolute bottom-3 left-3 right-3 flex justify-between border-t border-light-gray pt-2 font-bold tabular-nums"
          animate={{ opacity: step > 3 ? 1 : 0.15 }}
        >
          <span>Total</span>
          <span>$18,400.00</span>
        </motion.div>
        <AnimatePresence>
          {step > 4 && (
            <motion.span
              className="absolute -right-3 -top-3 bg-yellow px-2 py-1 text-[11px] font-black text-teal-dark"
              initial={{ scale: 1.8, opacity: 0, rotate: -12 }}
              animate={{ scale: 1, opacity: 1, rotate: -6 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 16 }}
            >
              PDF
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Updater() {
  const { ref, step } = useLoop(4, 1300);
  const updated = step >= 2;
  return (
    <div ref={ref} className="flex h-full flex-col items-center justify-center gap-3 p-5 text-[11px]">
      <motion.div
        className="relative flex h-[118px] w-[200px] flex-col justify-between bg-teal-dark p-4 text-white"
        animate={{ rotateY: step === 1 ? 90 : 0 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
        style={{ transformPerspective: 600 }}
      >
        <div className="flex items-center justify-between">
          <span className="h-5 w-7 bg-yellow" />
          <span className="h-5 w-5 rounded-full bg-turquoise" />
        </div>
        <p className="text-[15px] font-semibold tracking-[0.18em] tabular-nums">
          •••• {updated ? "8810" : "4242"}
        </p>
        <p className="tabular-nums text-white/80">
          EXP <span className={updated ? "font-bold text-turquoise" : ""}>{updated ? "09/30" : "09/26"}</span>
        </p>
      </motion.div>
      <motion.p
        className="flex items-center gap-1 px-2 py-1 font-semibold"
        animate={{
          backgroundColor: updated ? "#49DFA9" : "#FFCC33",
          color: "#005452",
        }}
      >
        {updated ? (
          <>
            <Check className="h-3 w-3" strokeWidth={3} /> Card updated before next charge
          </>
        ) : (
          "Card reissued by issuer"
        )}
      </motion.p>
    </div>
  );
}

export function PackageIllustration({ kind }: { kind: Illustration }) {
  if (kind === "ledger") return <Ledger />;
  if (kind === "invoice") return <Invoice />;
  return <Updater />;
}
