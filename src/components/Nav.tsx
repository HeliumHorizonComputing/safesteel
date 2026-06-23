"use client";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#fabrication", label: "Fabrication" },
  { href: "#galvanization", label: "Galvanization" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center border border-zinc-accent">
            <span className="block h-3 w-3 rotate-45 border border-zinc-accent" />
          </span>
          <span className="tech-label text-sm font-semibold text-white">
            Safesteel
          </span>
        </a>
        <ul className="hidden gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="tech-label text-[11px] text-steel-300 transition-colors hover:text-zinc-accent"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="tech-label hidden border border-steel-600 px-4 py-2 text-[11px] text-white transition-colors hover:border-zinc-accent hover:text-zinc-accent md:block"
        >
          Enquire
        </a>
      </nav>
    </header>
  );
}
