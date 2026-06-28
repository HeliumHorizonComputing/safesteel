"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "2010", unit: "", label: "Established (A.D.)" },
  { value: "12,500", unit: "m²", label: "Facility footprint" },
  { value: "5,000", unit: "MT/yr", label: "Production capacity" },
  { value: "ISO", unit: "9001·14001", label: "Certified company" },
];

export default function About() {
  return (
    <section id="about" className="relative bg-surface-50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
          {/* copy */}
          <div className="lg:col-span-6">
            <p className="eyebrow accent-rule mb-2 text-[12px] text-orange-600">
              About Us
            </p>
            <h2 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-navy-800 md:text-5xl">
              Nepal&apos;s trusted name in structural steel
            </h2>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-ink-soft">
              Safe Steels Pvt. Ltd., an{" "}
              <span className="font-semibold text-navy-700">
                ISO 9001 &amp; 14001 certified
              </span>{" "}
              company, is among Nepal&apos;s leading mechanical and structural
              steel fabrication and erection companies — recognized for
              delivering reliable, high-quality engineering solutions.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
              Established in 2010 A.D., we operate a fully equipped facility in
              Khairahani-1, Chitwan, spanning 12,500 m² including 1,500 m² of
              built-up workspace. Our factory is outfitted with modern technology
              for fabrication and galvanization, achieving an annual production
              capacity of up to 5,000 metric tons.
            </p>
          </div>

          {/* stat panel */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-navy-600 shadow-card-lg">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex flex-col gap-1 bg-navy-800 p-7 md:p-9"
                >
                  <span className="font-display text-4xl font-bold tabular-nums text-white md:text-5xl">
                    {s.value}
                  </span>
                  {s.unit && (
                    <span className="font-mono text-xs text-orange-400">
                      {s.unit}
                    </span>
                  )}
                  <span className="tech-label mt-2 text-[10px] text-navy-200">
                    {s.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
