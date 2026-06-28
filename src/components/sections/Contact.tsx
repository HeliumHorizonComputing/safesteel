"use client";

const OFFICES = [
  {
    label: "Factory Office",
    lines: ["Khairahani-1, Tarkari Chowk, Chitwan"],
    phones: ["056-560622", "9801900841"],
  },
  {
    label: "Corporate Office",
    lines: ["Krishna Marg, Kupondole, Lalitpur"],
    phones: ["01-5418587", "9851010850"],
  },
];

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-navy-900 py-24 md:py-32"
    >
      <div className="tech-grid-dark pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -left-28 -top-28 z-[1] h-56 w-56 rotate-45 bg-orange-500" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
          {/* info */}
          <div>
            <p className="eyebrow mb-2 text-[12px] text-orange-400">Contact Us</p>
            <h2 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-white md:text-5xl">
              Let&apos;s build something solid
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-navy-200">
              Have a structure in mind? Tell us about the project and our
              engineering team will get back to you.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {OFFICES.map((o) => (
                <div
                  key={o.label}
                  className="rounded-xl border border-navy-700 bg-navy-800/60 p-6"
                >
                  <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-orange-400">
                    {o.label}
                  </h3>
                  <div className="mt-3 flex items-start gap-2.5 text-navy-100">
                    <span className="mt-0.5 text-orange-400">
                      <PinIcon />
                    </span>
                    <span className="text-sm leading-relaxed">{o.lines[0]}</span>
                  </div>
                  <div className="mt-2 flex items-start gap-2.5 text-navy-100">
                    <span className="mt-0.5 text-orange-400">
                      <PhoneIcon />
                    </span>
                    <span className="font-mono text-sm">
                      {o.phones.join(" · ")}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <dl className="mt-8 space-y-2 font-mono text-sm">
              <div className="flex gap-4">
                <dt className="w-20 text-navy-300">EMAIL</dt>
                <dd>
                  <a href="mailto:info@safesteels.com" className="text-navy-100 transition-colors hover:text-orange-400">
                    info@safesteels.com
                  </a>
                </dd>
              </div>
              <div className="flex gap-4">
                <dt className="w-20 text-navy-300">WEB</dt>
                <dd>
                  <a href="https://www.safesteels.com" className="text-navy-100 transition-colors hover:text-orange-400">
                    www.safesteels.com
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* form */}
          <form
            className="flex flex-col gap-5 rounded-2xl border border-navy-700 bg-navy-800/50 p-7 md:p-9"
            onSubmit={(e) => e.preventDefault()}
          >
            {[
              { id: "name", label: "Name", type: "text" },
              { id: "email", label: "Email", type: "email" },
              { id: "org", label: "Organization", type: "text" },
            ].map((f) => (
              <div key={f.id} className="flex flex-col gap-2">
                <label htmlFor={f.id} className="tech-label text-[10px] text-navy-300">
                  {f.label}
                </label>
                <input
                  id={f.id}
                  type={f.type}
                  className="rounded-md border border-navy-700 bg-navy-900/60 px-3 py-2.5 text-white outline-none transition-colors placeholder:text-navy-400 focus:border-orange-500"
                />
              </div>
            ))}
            <div className="flex flex-col gap-2">
              <label htmlFor="msg" className="tech-label text-[10px] text-navy-300">
                Project details
              </label>
              <textarea
                id="msg"
                rows={4}
                className="resize-none rounded-md border border-navy-700 bg-navy-900/60 px-3 py-2.5 text-white outline-none transition-colors focus:border-orange-500"
              />
            </div>
            <button
              type="submit"
              className="mt-2 self-start rounded-md bg-orange-500 px-8 py-3 font-display text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-orange-600"
            >
              Send enquiry
            </button>
          </form>
        </div>

        <footer className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-navy-700 pt-8 md:flex-row md:items-center">
          <span className="tech-label text-[10px] text-navy-300">
            © {new Date().getFullYear()} Safe Steels Pvt. Ltd. · Steel Solutions
            for Nation Building
          </span>
          <span className="tech-label text-[10px] text-navy-300">
            Design · Fabricate · Galvanize · Erect
          </span>
        </footer>
      </div>
    </section>
  );
}
