"use client";

import { motion } from "framer-motion";

const LEADERS = [
  {
    name: "Er. Arna Raj Silwal",
    credential: "M.Sc. in Structural Engg.",
    role: "Chairperson",
    bio: "Former Vice President of the Nepal Engineering Council. 27+ years as a civil/structural engineer, project manager, consultant and managing director across India and Nepal.",
    initials: "AS",
  },
  {
    name: "Ranjit Barakoti",
    credential: "Masters in Education",
    role: "Executive Director",
    bio: "25+ years administering development projects as Team Leader and Project Coordinator under ADB, World Bank, GIZ, UNDP, Care Nepal and JICA.",
    initials: "RB",
  },
  {
    name: "Er. Jagadish Sharma",
    credential: "MSc in Construction Mgmt.",
    role: "Director / Business Development",
    bio: "27+ years as a civil engineer, including 21 years in government service — managing World Bank and ADB road, bridge and building infrastructure.",
    initials: "JS",
  },
  {
    name: "Er. Thakur P. Adhikari",
    credential: "B.E. in Civil Engg.",
    role: "Technical Director",
    bio: "35+ years in steel design, fabrication and quality monitoring across government and private-sector projects.",
    initials: "TA",
  },
];

export default function Leadership() {
  return (
    <section id="leadership" className="relative bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-14 max-w-2xl">
          <p className="eyebrow accent-rule mb-2 text-[12px] text-orange-600">
            Leadership
          </p>
          <h2 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-navy-800 md:text-5xl">
            Decades of engineering experience
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-soft">
            Safe Steels is led by senior engineers and project managers whose
            combined experience spans Nepal&apos;s largest infrastructure
            programs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LEADERS.map((l, i) => (
            <motion.article
              key={l.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className="flex flex-col rounded-xl border border-navy-100 bg-surface-50 p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-lg"
            >
              <div className="mb-5 flex items-center gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-navy-700 font-display text-lg font-bold tracking-wide text-white">
                  {l.initials}
                </span>
                <span className="rounded-full bg-orange-500/10 px-3 py-1 font-display text-[11px] font-semibold uppercase tracking-wider text-orange-600">
                  {l.role}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold uppercase tracking-tight text-navy-800">
                {l.name}
              </h3>
              <p className="mt-0.5 font-mono text-[11px] text-ink-muted">
                {l.credential}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                {l.bio}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
