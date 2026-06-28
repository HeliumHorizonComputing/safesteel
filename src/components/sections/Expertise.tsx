"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-7 w-7"
      aria-hidden
    >
      {children}
    </svg>
  );
}

const SERVICES: {
  title: string;
  body: string;
  tag: string;
  icon: ReactNode;
}[] = [
  {
    title: "Truss & Girder Bridges",
    tag: "Design · Fabricate · Erect",
    body: "Steel truss and plate girder, Bailey bridges and trail bridges — engineered, shop-fabricated and erected on site across Nepal.",
    icon: (
      <>
        <path d="M2 17h20" />
        <path d="M4 17l4-8 4 8 4-8 4 8" />
        <path d="M8 9l4 8M16 9l-4 8" />
      </>
    ),
  },
  {
    title: "Buildings & Towers",
    tag: "Structural Steel",
    body: "Steel structures for warehouses, buildings, sheds, cold stores and towers — long-span frames built to demanding load and tolerance specs.",
    icon: (
      <>
        <path d="M4 21V7l8-4 8 4v14" />
        <path d="M9 21v-6h6v6" />
        <path d="M9 9h.01M15 9h.01" />
      </>
    ),
  },
  {
    title: "Formwork & Joints",
    tag: "Falsework Systems",
    body: "Metal formwork and falsework, drainage spouts and expansion joints — including bridge formwork for the Kathmandu–Terai Fast Track.",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="6" rx="1" />
        <path d="M6 10v10M12 10v10M18 10v10" />
        <path d="M3 20h18" />
      </>
    ),
  },
  {
    title: "Penstock & Hydraulics",
    tag: "Hydropower",
    body: "Penstock pipes and hydraulic structures — heavy fabricated steel for water-control and hydropower infrastructure.",
    icon: (
      <>
        <path d="M3 8a4 4 0 0 1 8 0v8a4 4 0 0 0 8 0" />
        <path d="M3 8h8M11 16h8" />
      </>
    ),
  },
  {
    title: "Galvanization & Civil",
    tag: "Protective Coating",
    body: "Hot-dip galvanization of steel structures plus civil works for buildings and bridges — a complete in-house finishing and construction capability.",
    icon: (
      <>
        <path d="M12 3v6" />
        <path d="M7 9h10l-1.5 9a2 2 0 0 1-2 1.8h-3a2 2 0 0 1-2-1.8L7 9z" />
        <path d="M9 14h6" />
      </>
    ),
  },
  {
    title: "Smart & High-Mast Lighting",
    tag: "Supply · Install",
    body: "Supply and installation of smart street lighting, high-mast lights and solar street-light poles — thousands of units delivered nationwide.",
    icon: (
      <>
        <path d="M12 2v3M5 7l2 2M19 7l-2 2" />
        <circle cx="12" cy="11" r="4" />
        <path d="M10 17h4l-.5 4h-3z" />
      </>
    ),
  },
];

export default function Expertise() {
  return (
    <section id="expertise" className="relative bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-14 max-w-2xl">
          <p className="eyebrow accent-rule mb-2 text-[12px] text-orange-600">
            Our Expertise &amp; Services
          </p>
          <h2 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-navy-800 md:text-5xl">
            End-to-end steel engineering
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-soft">
            Comprehensive mechanical and steel-structure engineering — covering
            design, fabrication, galvanization, supply and erection, ensuring
            seamless project execution from concept to completion.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group relative overflow-hidden rounded-xl border border-navy-100 bg-surface-50 p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-navy-200 hover:bg-white hover:shadow-card-lg"
            >
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-lg bg-navy-700 text-white transition-colors group-hover:bg-orange-500">
                <Icon>{s.icon}</Icon>
              </div>
              <span className="tech-label text-[10px] text-orange-600">
                {s.tag}
              </span>
              <h3 className="mt-1.5 font-display text-xl font-semibold uppercase tracking-tight text-navy-800">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {s.body}
              </p>
              <span className="absolute bottom-0 left-0 h-1 w-0 bg-orange-500 transition-all duration-500 group-hover:w-full" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
