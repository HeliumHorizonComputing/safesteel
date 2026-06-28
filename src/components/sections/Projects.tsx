"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Project {
  name: string;
  location: string;
  detail?: string;
  metric: string;
}

const CATEGORIES: { id: string; label: string; projects: Project[] }[] = [
  {
    id: "motorable",
    label: "Motorable Bridges",
    projects: [
      { name: "Kaligandaki River Bridge", location: "Damachaur, Palpa", detail: "Multi-span steel truss · 60 m × 3", metric: "615 MT" },
      { name: "Seti River Bridge", location: "Bajhang", detail: "Double-lane steel truss · 77 m", metric: "440 MT" },
      { name: "Karnali River Bridge", location: "Rakam, Dailekh", detail: "Steel truss · 77 m span", metric: "380 MT" },
      { name: "Madi River Bridge", location: "Chitwan region", detail: "Multi-span steel truss · 55 m × 3", metric: "370 MT" },
      { name: "Bheri River Bridge", location: "Mid-West Nepal", detail: "Multi-span steel truss · 45 m × 3", metric: "290 MT" },
      { name: "Sunkoshi River Bridge", location: "Dhuskun, Sindhupalchowk", detail: "Steel truss · 60 m span", metric: "210 MT" },
      { name: "Kaligandaki River Bridge", location: "Rudrabeni", detail: "Steel truss · 77 m span", metric: "240 MT" },
      { name: "Okhaldhunga Plate Girders", location: "Thotne, Lipe & Mulung Khola", detail: "Plate girder bridges · 30–45 m", metric: "3 spans" },
    ],
  },
  {
    id: "trail",
    label: "Trail Bridges",
    projects: [
      { name: "Indrawati Multi-Span Bridge", location: "Sindhupalchowk", detail: "459.5 m span", metric: "88 MT" },
      { name: "Laxmijhar Multi-Span Bridge", location: "Morang", detail: "453 m span", metric: "89 MT" },
      { name: "Dhodyani Multi-Span Bridge", location: "Sindhuli", detail: "455 m span", metric: "87 MT" },
      { name: "Banbasha Rajipur Suspension Bridge", location: "Kailali", detail: "353.22 m span", metric: "68 MT" },
      { name: "Trail Bridge Steel Parts", location: "Nationwide supply", detail: "Fabrication & supply, annually", metric: "500+ MT" },
    ],
  },
  {
    id: "towers",
    label: "Towers & Buildings",
    projects: [
      { name: "Skywalk Tower", location: "Kamaladi, Kathmandu", detail: "Landmark observation tower", metric: "1000 MT" },
      { name: "Cold Storage Projects", location: "10 districts, Bagmati Province", detail: "Chitwan, Dhading, Sindhuli, Dolakha…", metric: "1000 MT" },
      { name: "Hotel Sarobar Extension", location: "Pokhara", detail: "Structural extension works", metric: "200 MT" },
      { name: "Rajbiraj Engineering College", location: "Rajbiraj", detail: "Institutional steel structure", metric: "82 MT" },
      { name: "Veterinary Block", location: "Om Megashree Pharma, Chitwan", detail: "Industrial block", metric: "27 MT" },
      { name: "British School Building", location: "Jhamsikhel, Kathmandu", detail: "Earthquake-resistant structure", metric: "Seismic" },
    ],
  },
  {
    id: "lighting",
    label: "Smart & Solar Lighting",
    projects: [
      { name: "Smart Street Lighting", location: "Bharatpur, Phase I & II", detail: "1,800 + 4,057 units installed", metric: "5,857" },
      { name: "Smart Street Lighting", location: "Lalitpur II & Ringroad", detail: "1,400 + 2,000 units installed", metric: "3,400" },
      { name: "High Mast Lighting", location: "Butwal", detail: "High-mast light towers", metric: "25 units" },
      { name: "Solar Street Light Poles", location: "Various locations", detail: "Poles & accessories supply", metric: "Supply" },
    ],
  },
  {
    id: "formwork",
    label: "Formwork & Falsework",
    projects: [
      { name: "Kathmandu–Terai Fast Track", location: "National Pride Project", detail: "Bridge steel formwork — design & supply", metric: "Formwork" },
      { name: "East–West Highway", location: "Butwal–Gorusinghe Section", detail: "Bridge steel formwork — design & supply", metric: "Formwork" },
    ],
  },
];

export default function Projects() {
  const [active, setActive] = useState(CATEGORIES[0].id);
  const current = CATEGORIES.find((c) => c.id === active) ?? CATEGORIES[0];

  return (
    <section id="projects" className="relative overflow-hidden bg-navy-900 py-24 md:py-32">
      <div className="tech-grid-dark pointer-events-none absolute inset-0 opacity-60" />
      {/* orange diagonal accent */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rotate-45 bg-orange-500/10" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow mb-2 text-[12px] text-orange-400">
              Key Projects Executed
            </p>
            <h2 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-white md:text-5xl">
              Steel that stands across Nepal
            </h2>
            <p className="mt-5 text-base leading-relaxed text-navy-200">
              From major river crossings and landmark towers to nationwide
              street-lighting — a selection of works delivered by Safe Steels.
            </p>
          </div>
          <div className="flex shrink-0 gap-8">
            <div>
              <div className="font-display text-4xl font-bold text-orange-400">
                25+
              </div>
              <div className="tech-label text-[10px] text-navy-200">
                Major projects
              </div>
            </div>
            <div>
              <div className="font-display text-4xl font-bold text-orange-400">
                9k+
              </div>
              <div className="tech-label text-[10px] text-navy-200">
                Lights installed
              </div>
            </div>
          </div>
        </div>

        {/* category tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActive(c.id)}
              className={`rounded-full px-4 py-2 font-display text-[12px] font-semibold uppercase tracking-wider transition-colors ${
                active === c.id
                  ? "bg-orange-500 text-white"
                  : "bg-navy-800 text-navy-200 hover:bg-navy-700 hover:text-white"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* project grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-navy-700/70 sm:grid-cols-2 lg:grid-cols-3"
          >
            {current.projects.map((p) => (
              <div
                key={p.name + p.location}
                className="group flex flex-col justify-between gap-6 bg-navy-900 p-6 transition-colors hover:bg-navy-800"
              >
                <div>
                  <h3 className="font-display text-lg font-semibold uppercase leading-tight tracking-tight text-white">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-sm text-navy-200">{p.location}</p>
                  {p.detail && (
                    <p className="mt-2 font-mono text-[11px] leading-relaxed text-navy-300">
                      {p.detail}
                    </p>
                  )}
                </div>
                <span className="self-start rounded-md border border-orange-500/40 bg-orange-500/10 px-3 py-1 font-mono text-sm font-semibold text-orange-300">
                  {p.metric}
                </span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
