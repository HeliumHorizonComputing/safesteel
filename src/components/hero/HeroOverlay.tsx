"use client";

import { useState } from "react";
import { MotionValue, useMotionValueEvent } from "framer-motion";

const PHASES: { at: number; label: string }[] = [
  { at: 0.0, label: "Foundation" },
  { at: 0.12, label: "Erection" },
  { at: 0.28, label: "Chords" },
  { at: 0.55, label: "Truss assembly" },
  { at: 0.64, label: "Bracing" },
  { at: 0.74, label: "Deck" },
  { at: 0.92, label: "Complete" },
];

function phaseFor(p: number) {
  let current = PHASES[0];
  for (const ph of PHASES) if (p >= ph.at) current = ph;
  return current;
}

const SPECS = [
  { k: "SPAN", v: "18.0 m" },
  { k: "PANELS", v: "6 × 3.0 m" },
  { k: "TYPE", v: "Pratt" },
  { k: "CONFIG", v: "Through" },
];

/** Hero text panel — lives in its own column, never over the animation. */
export default function HeroOverlay({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState(PHASES[0].label);

  useMotionValueEvent(progress, "change", (v) => {
    setPct(Math.round(v * 100));
    setPhase(phaseFor(v).label);
  });

  return (
    <div className="max-w-xl">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-navy-200 bg-white px-3 py-1.5 shadow-sm">
        <span className="h-2 w-2 rotate-45 bg-orange-500" />
        <span className="tech-label text-[10px] text-navy-700">
          ISO 9001 &amp; 14001 Certified · Est. 2010
        </span>
      </div>

      <h1 className="font-display text-[clamp(2.6rem,6vw,5.2rem)] font-bold uppercase leading-[0.92] tracking-tight text-navy-800">
        Safe<span className="text-orange-500">Steels</span>
      </h1>
      <p className="eyebrow mt-3 text-[clamp(0.8rem,1.6vw,1.05rem)] text-navy-600">
        Steel Solutions for Nation Building
      </p>

      <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
        Delivering excellence in design, fabrication, galvanization and erection
        of steel structures across Nepal — from truss bridges to towers and
        industrial facilities. Watch one assemble, member by member.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="#projects"
          className="rounded-md bg-orange-500 px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-white shadow-card transition-colors hover:bg-orange-600"
        >
          View Projects
        </a>
        <a
          href="#contact"
          className="rounded-md border border-navy-300 px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-navy-700 transition-colors hover:border-navy-700 hover:bg-navy-50"
        >
          Get in Touch
        </a>
      </div>

      {/* live assembly readout */}
      <div className="mt-10 max-w-md border-t border-navy-200 pt-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="tech-label text-[10px] text-ink-muted">
            Auto-Assembly · Pratt Truss
          </span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-orange-600">
            {phase}
          </span>
        </div>
        <div className="flex items-end gap-4">
          <span className="font-mono text-4xl tabular-nums leading-none text-navy-800">
            {String(pct).padStart(3, "0")}
            <span className="text-lg text-ink-muted">%</span>
          </span>
          <div className="mb-1 h-1 flex-1 rounded-full bg-navy-100">
            <div
              className="h-1 rounded-full bg-orange-500 transition-[width] duration-150"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-3 font-mono text-xs sm:grid-cols-4">
          {SPECS.map((s) => (
            <div key={s.k} className="flex flex-col gap-1">
              <dt className="text-ink-muted">{s.k}</dt>
              <dd className="font-semibold text-navy-800">{s.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
