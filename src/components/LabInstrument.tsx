import { motion, useReducedMotion } from "framer-motion";

// The hero illustration: the Labs hexagon around a Chargent "C" core, with a trace
// running in from each featured package. Pulses travel along the traces into the core.

const HEX = "M320 90 L484.5 185 L484.5 375 L320 470 L155.5 375 L155.5 185 Z";
const INNER_HEX = "M320 112 L465.5 196 L465.5 364 L320 448 L174.5 364 L174.5 196 Z";

const traces = [
  { id: "seed", label: "ACCOUNTING SEED", d: "M100 70 V240 H155.5", tag: { x: 16, y: 40, w: 168 } },
  { id: "pdf", label: "PDF INVOICES", d: "M562 140 V250 H484.5", tag: { x: 500, y: 110, w: 124 } },
  { id: "vantiv", label: "ACCOUNT UPDATER", d: "M440 515 H402 V422.5", tag: { x: 440, y: 500, w: 184 } },
];

// Short bracket segments between the two hexagons, echoing the Labs logo.
const brackets = [
  "M250 136 L226 150", "M390 136 L414 150", "M190 214 V254", "M450 214 V254",
  "M190 306 V346", "M450 306 V346", "M250 424 L226 410", "M390 424 L414 410",
];

const ease = [0.22, 1, 0.36, 1] as const;

export function LabInstrument() {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 640 560"
      className="h-auto w-full max-w-[640px]"
      role="img"
      aria-label="The Chargent Labs hexagon with traces connecting Accounting Seed, PDF Invoices and Account Updater to the Chargent core"
    >
      {/* Traces and their tags */}
      {traces.map((t, i) => (
        <g key={t.id}>
          <motion.path
            d={t.d}
            fill="none"
            stroke="#49DFA9"
            strokeWidth={3}
            strokeLinecap="square"
            initial={{ pathLength: reduce ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, delay: 0.9 + i * 0.18, ease }}
          />
          <motion.g
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 + i * 0.18, ease }}
          >
            <rect x={t.tag.x} y={t.tag.y} width={t.tag.w} height={30} fill="#003F3D" stroke="#49DFA9" strokeWidth={2} />
            <text
              x={t.tag.x + t.tag.w / 2}
              y={t.tag.y + 19.5}
              textAnchor="middle"
              fill="#FFFFFF"
              fontFamily="Inter, system-ui, sans-serif"
              fontSize={12}
              fontWeight={700}
              letterSpacing="0.1em"
            >
              {t.label}
            </text>
          </motion.g>
          {!reduce && (
            <circle r={5} fill="#FFCC33">
              <animateMotion dur="2.8s" begin={`${2 + i * 0.9}s`} repeatCount="indefinite" path={t.d} />
            </circle>
          )}
        </g>
      ))}

      {/* Hexagon frame */}
      <motion.path
        d={HEX}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={8}
        strokeLinejoin="round"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease }}
      />
      <motion.path
        d={INNER_HEX}
        fill="none"
        stroke="#49DFA9"
        strokeOpacity={0.45}
        strokeWidth={2}
        strokeDasharray="10 8"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, delay: 0.3, ease }}
      />
      {brackets.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="#FFFFFF"
          strokeWidth={5}
          strokeLinecap="square"
          initial={{ opacity: reduce ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 + i * 0.05 }}
        />
      ))}

      {/* Core: turquoise disc, rotating white C, dark teal coin */}
      <motion.g
        style={{ transformOrigin: "320px 280px", transformBox: "view-box" }}
        initial={{ scale: reduce ? 1 : 0.4, opacity: reduce ? 1 : 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.35, ease }}
      >
        <circle cx={320} cy={280} r={118} fill="#49DFA9" />
        <circle cx={320} cy={280} r={118} fill="none" stroke="#005452" strokeWidth={6} />
        {/* Orbit: a dashed ring that turns slowly around the core */}
        <motion.circle
          cx={320}
          cy={280}
          r={100}
          fill="none"
          stroke="#005452"
          strokeOpacity={0.5}
          strokeWidth={3}
          strokeDasharray="4 12"
          style={{ transformOrigin: "320px 280px", transformBox: "view-box" }}
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        />
        {/* C: a thick ring with its mouth open to the right */}
        <path d="M370.4 251 A58 58 0 1 0 370.4 309" fill="none" stroke="#FFFFFF" strokeWidth={30} />
        <motion.circle
          cx={320}
          cy={280}
          r={34}
          fill="#005452"
          animate={reduce ? undefined : { r: [34, 37, 34] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.g>
    </svg>
  );
}
