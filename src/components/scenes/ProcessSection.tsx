"use client";

import { ComponentType, useState } from "react";
import { MotionValue, useMotionValueEvent } from "framer-motion";
import AutoScene from "@/components/scroll/AutoScene";

export interface Phase {
  at: number;
  label: string;
}

interface ProcessSectionProps {
  id: string;
  kicker: string;
  title: string;
  description: string;
  phases: Phase[];
  specs: { k: string; v: string }[];
  scene: ComponentType<{ progress: MotionValue<number> }>;
  align?: "left" | "right";
  camera?: { position: [number, number, number]; fov?: number };
  duration?: number;
  figure?: string;
  className?: string;
}

function phaseFor(phases: Phase[], p: number) {
  let cur = phases[0];
  for (const ph of phases) if (p >= ph.at) cur = ph;
  return cur;
}

function TextPanel({
  progress,
  kicker,
  title,
  description,
  phases,
  specs,
}: {
  progress: MotionValue<number>;
  kicker: string;
  title: string;
  description: string;
  phases: Phase[];
  specs: { k: string; v: string }[];
}) {
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState(phases[0].label);

  useMotionValueEvent(progress, "change", (v) => {
    setPct(Math.round(v * 100));
    setPhase(phaseFor(phases, v).label);
  });

  return (
    <div className="max-w-md">
      <p className="tech-label mb-4 text-[11px] text-zinc-accent">{kicker}</p>
      <h2 className="text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.02] tracking-tight text-white">
        {title}
      </h2>
      <p className="mt-5 text-base leading-relaxed text-steel-300">
        {description}
      </p>

      <div className="mt-9 border-t border-steel-800 pt-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="tech-label text-[10px] text-steel-400">
            Auto-Sequence
          </span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-accent">
            {phase}
          </span>
        </div>
        <div className="flex items-end gap-4">
          <span className="font-mono text-3xl tabular-nums leading-none text-white">
            {String(pct).padStart(3, "0")}
            <span className="text-base text-steel-500">%</span>
          </span>
          <div className="mb-1 h-px flex-1 bg-steel-700">
            <div
              className="h-px bg-zinc-accent transition-[width] duration-150"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <dl className="mt-7 grid grid-cols-2 gap-x-8 gap-y-3 font-mono text-xs">
          {specs.map((s) => (
            <div key={s.k} className="flex flex-col gap-1">
              <dt className="text-steel-500">{s.k}</dt>
              <dd className="text-steel-100">{s.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

export default function ProcessSection({
  id,
  kicker,
  title,
  description,
  phases,
  specs,
  scene: Scene,
  align = "right",
  camera = { position: [0, 1.5, 9], fov: 42 },
  duration = 6,
  figure,
  className = "",
}: ProcessSectionProps) {
  return (
    <AutoScene
      id={id}
      duration={duration}
      align={align}
      figure={figure}
      className={className}
      camera={camera}
      scene={({ progress }) => <Scene progress={progress} />}
      text={({ progress }) => (
        <TextPanel
          progress={progress}
          kicker={kicker}
          title={title}
          description={description}
          phases={phases}
          specs={specs}
        />
      )}
    />
  );
}
