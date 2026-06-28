"use client";

import { motion } from "framer-motion";

const REASONS = [
  {
    title: "ISO 9001:2015 Certified",
    body: "Quality Management — disciplined processes from design through erection.",
  },
  {
    title: "ISO 14001:2015 Certified",
    body: "Environmental Management — responsible, compliant operations.",
  },
  {
    title: "Modern, high-capacity facility",
    body: "Equipped for both fabrication and in-house galvanization at scale.",
  },
  {
    title: "Experienced technical team",
    body: "Highly skilled engineers and fabricators with decades of structural expertise.",
  },
  {
    title: "End-to-end delivery",
    body: "Seamless project execution from concept to completion under one roof.",
  },
];

function Check() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export default function WhyChooseUs() {
  return (
    <section
      id="why"
      className="relative overflow-hidden bg-surface-50 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          {/* vision */}
          <div className="lg:col-span-5">
            <p className="eyebrow accent-rule mb-2 text-[12px] text-orange-600">
              Our Vision
            </p>
            <h2 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-navy-800 md:text-5xl">
              Built to lead the industry
            </h2>
            <p className="mt-7 text-base leading-relaxed text-ink-soft">
              With a strong emphasis on people, advanced technology and efficient
              systems, Safe Steels is driven by a vision to emerge as a leader in
              the steel fabrication industry.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              We are dedicated to upholding the highest standards of quality and
              excellence, while delivering innovative, customized solutions that
              adapt to the evolving needs of our clients.
            </p>
          </div>

          {/* why choose us */}
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5 text-[12px] text-navy-600">
              Why Choose Us
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {REASONS.map((r, i) => (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
                  className={`flex gap-4 rounded-xl border border-navy-100 bg-white p-5 shadow-card ${
                    i === REASONS.length - 1 ? "sm:col-span-2" : ""
                  }`}
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-orange-500 text-white">
                    <Check />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold uppercase tracking-tight text-navy-800">
                      {r.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                      {r.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
