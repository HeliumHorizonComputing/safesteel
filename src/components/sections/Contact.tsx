"use client";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-steel-950 py-28 md:py-40"
    >
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <p className="tech-label mb-4 text-[11px] text-zinc-accent">
              Get in touch
            </p>
            <h2 className="text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">
              Let&apos;s build
              <br />
              something solid.
            </h2>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-steel-300">
              Have a structure in mind? Tell us about the project and our
              engineering team will get back to you.
            </p>

            <dl className="mt-12 space-y-4 font-mono text-sm">
              <div className="flex gap-4">
                <dt className="w-24 text-steel-500">LOCATION</dt>
                <dd className="text-steel-200">Chitwan, Nepal</dd>
              </div>
              <div className="flex gap-4">
                <dt className="w-24 text-steel-500">FACILITY</dt>
                <dd className="text-steel-200">12,500 m² fabrication yard</dd>
              </div>
              <div className="flex gap-4">
                <dt className="w-24 text-steel-500">WEB</dt>
                <dd className="text-steel-200">safesteels.com</dd>
              </div>
            </dl>
          </div>

          <form
            className="flex flex-col gap-5"
            onSubmit={(e) => e.preventDefault()}
          >
            {[
              { id: "name", label: "Name", type: "text" },
              { id: "email", label: "Email", type: "email" },
              { id: "org", label: "Organization", type: "text" },
            ].map((f) => (
              <div key={f.id} className="flex flex-col gap-2">
                <label
                  htmlFor={f.id}
                  className="tech-label text-[10px] text-steel-400"
                >
                  {f.label}
                </label>
                <input
                  id={f.id}
                  type={f.type}
                  className="border-b border-steel-700 bg-transparent py-2 text-white outline-none transition-colors focus:border-zinc-accent"
                />
              </div>
            ))}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="msg"
                className="tech-label text-[10px] text-steel-400"
              >
                Project details
              </label>
              <textarea
                id="msg"
                rows={4}
                className="resize-none border-b border-steel-700 bg-transparent py-2 text-white outline-none transition-colors focus:border-zinc-accent"
              />
            </div>
            <button
              type="submit"
              className="tech-label mt-4 self-start border border-zinc-accent px-8 py-3 text-[11px] text-zinc-accent transition-colors hover:bg-zinc-accent hover:text-steel-950"
            >
              Send enquiry
            </button>
          </form>
        </div>

        <footer className="mt-28 flex flex-col items-start justify-between gap-4 border-t border-steel-800 pt-8 md:flex-row md:items-center">
          <span className="tech-label text-[10px] text-steel-500">
            © {new Date().getFullYear()} Safesteel · Structural Steel Fabrication
          </span>
          <span className="tech-label text-[10px] text-steel-500">
            Design · Fabricate · Galvanize · Erect
          </span>
        </footer>
      </div>
    </section>
  );
}
