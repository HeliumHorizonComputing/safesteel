"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "12,500", unit: "m²", label: "Facility footprint" },
  { value: "5,000", unit: "MT/yr", label: "Fabrication capacity" },
  { value: "100%", unit: "", label: "In-house galvanizing" },
];

export default function About() {
  return (
    <section id="about" className="relative bg-steel-900 py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <p className="tech-label mb-4 text-[11px] text-zinc-accent">
              About Safesteel
            </p>
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              A fully-equipped steel fabrication facility in Chitwan.
            </h2>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-steel-300">
              Formed through the merger with the pioneering Nepa Engineering
              Works, Safesteel carries decades of structural steel expertise.
              From design through fabrication, galvanization and site erection,
              we control the entire process under one roof.
            </p>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-steel-300">
              The result is precision steelwork delivered with the reliability
              that heavy infrastructure demands.
            </p>
          </div>

          <div className="flex flex-col justify-center gap-px bg-steel-800">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-baseline justify-between bg-steel-900 py-8"
              >
                <span className="tech-label text-[11px] text-steel-400">
                  {s.label}
                </span>
                <span className="font-mono text-4xl tabular-nums text-white md:text-5xl">
                  {s.value}
                  <span className="ml-1 text-lg text-zinc-accent">
                    {s.unit}
                  </span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
