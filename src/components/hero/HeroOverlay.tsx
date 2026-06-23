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
      <p className="tech-label mb-5 text-[11px] text-zinc-accent">
        Structural Steel · Engineered
      </p>
      <h1 className="text-[clamp(2.5rem,5.5vw,5rem)] font-bold leading-[0.95] tracking-tight text-white">
        SAFE<span className="text-zinc-accent">STEEL</span>
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-steel-300">
        We design, fabricate, galvanize and erect structural steel — from truss
        bridges to industrial facilities. Watch one assemble, member by member.
      </p>

      {/* live assembly readout */}
      <div className="mt-10 max-w-md border-t border-steel-800 pt-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="tech-label text-[10px] text-steel-400">
            Auto-Assembly · Pratt Truss
          </span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-accent">
            {phase}
          </span>
        </div>
        <div className="flex items-end gap-4">
          <span className="font-mono text-4xl tabular-nums leading-none text-white">
            {String(pct).padStart(3, "0")}
            <span className="text-lg text-steel-500">%</span>
          </span>
          <div className="mb-1 h-px flex-1 bg-steel-700">
            <div
              className="h-px bg-zinc-accent transition-[width] duration-150"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-3 font-mono text-xs sm:grid-cols-4">
          {SPECS.map((s) => (
            <div key={s.k} className="flex flex-col gap-1">
              <dt className="text-steel-500">{s.k}</dt>
              <dd className="text-white">{s.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
