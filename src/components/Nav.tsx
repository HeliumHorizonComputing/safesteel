"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#expertise", label: "Expertise" },
  { href: "#fabrication", label: "Process" },
  { href: "#projects", label: "Projects" },
  { href: "#leadership", label: "Leadership" },
  { href: "#contact", label: "Contact" },
];

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5">
      <span className="relative grid h-9 w-9 place-items-center rounded-[5px] bg-navy-700">
        <span className="block h-3.5 w-3.5 rotate-45 border-2 border-orange-500" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold uppercase tracking-tight text-navy-800">
          Safe<span className="text-orange-500">Steels</span>
        </span>
        <span className="tech-label text-[8px] text-ink-muted">
          Pvt. Ltd. · Nepal
        </span>
      </span>
    </a>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-navy-100 bg-white/90 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Logo />

        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-display text-[13px] font-medium uppercase tracking-wider text-ink-soft transition-colors hover:text-orange-600"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-md bg-orange-500 px-5 py-2.5 font-display text-[13px] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-orange-600 lg:block"
        >
          Enquire
        </a>

        {/* mobile menu toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="grid h-10 w-10 place-items-center rounded-md border border-navy-200 bg-white/80 lg:hidden"
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-navy-800 transition-all ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-navy-800 transition-all ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-navy-800 transition-all ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* mobile drawer */}
      {open && (
        <div className="border-t border-navy-100 bg-white/95 backdrop-blur-md lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-6 py-3">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-navy-50 py-3 font-display text-sm font-medium uppercase tracking-wider text-ink-soft"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-3 block rounded-md bg-orange-500 px-5 py-3 text-center font-display text-sm font-semibold uppercase tracking-wider text-white"
              >
                Enquire
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
