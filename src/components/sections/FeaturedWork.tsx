"use client";

import { motion } from "framer-motion";

const PROJECTS = [
  {
    no: "01",
    title: "Steel Truss Bridges",
    meta: "Design · Fabrication · Erection",
    body: "Through and deck truss spans engineered, shop-fabricated and erected on site — from rural river crossings to highway infrastructure.",
  },
  {
    no: "02",
    title: "Industrial Structures",
    meta: "Power & Cement Plants",
    body: "Heavy structural frames, girders and platforms for power and cement facilities, built to demanding load and tolerance requirements.",
  },
  {
    no: "03",
    title: "Warehouses & Sheds",
    meta: "Long-Span Roofing",
    body: "Pre-engineered long-span warehouse and shade structures, optimized for material efficiency and rapid erection.",
  },
  {
    no: "04",
    title: "Hydraulic Infrastructure",
    meta: "Gates & Heavy Girders",
    body: "Fabricated hydraulic gates, penstocks and heavy girders for water-control and hydropower infrastructure.",
  },
];

export default function FeaturedWork() {
  return (
    <section id="work" className="relative bg-steel-950 py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16 flex items-end justify-between border-b border-steel-800 pb-6">
          <div>
            <p className="tech-label mb-3 text-[11px] text-zinc-accent">
              Selected Work
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
              What we build
            </h2>
          </div>
          <span className="tech-label hidden text-[11px] text-steel-500 md:block">
            Chitwan · Nepal
          </span>
        </div>

        <div className="grid grid-cols-1 gap-px bg-steel-800 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.no}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
              className="group bg-steel-950 p-8 transition-colors hover:bg-steel-900 md:p-12"
            >
              <div className="mb-8 flex items-start justify-between">
                <span className="font-mono text-sm text-steel-500">{p.no}</span>
                <span className="tech-label text-[10px] text-zinc-accent">
                  {p.meta}
                </span>
              </div>
              <h3 className="mb-4 text-2xl font-semibold text-white md:text-3xl">
                {p.title}
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-steel-300">
                {p.body}
              </p>
              <div className="mt-8 h-px w-0 bg-zinc-accent transition-all duration-500 group-hover:w-full" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
