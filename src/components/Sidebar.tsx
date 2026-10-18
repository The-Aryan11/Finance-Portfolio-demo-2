import { useEffect, useState } from "react";
import { sections, deals, codenames, PERSON } from "../data";
import { scrollToId } from "../lib/scroll";

function useActive() {
  const [active, setActive] = useState("cover");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

const counts: Record<string, string> = {
  transactions: `${deals.length} files`,
  codenames: `${codenames.length} files`,
};

export default function Sidebar() {
  const active = useActive();
  return (
    <>
      <aside className="sticky top-0 z-30 hidden h-screen w-72 shrink-0 flex-col border-r border-rule bg-panel lg:flex">
        <div className="border-b border-rule px-6 py-6">
          <p className="mono text-muted">Virtual Data Room</p>
          <p className="font-display mt-2 text-2xl font-medium leading-tight">Project Voss</p>
          <p className="mono mt-2 flex items-center gap-2 text-muted">
            <span className="inline-block h-2 w-2 rounded-full bg-accent live-dot" /> Read-only access
          </p>
        </div>
        <nav aria-label="Data room index" className="flex-1 overflow-y-auto px-3 py-5">
          <ul className="space-y-0.5">
            {sections.map((s) => {
              const on = active === s.id;
              return (
                <li key={s.id}>
                  <button
                    onClick={() => scrollToId(s.id)}
                    aria-current={on ? "true" : undefined}
                    className={`group flex w-full items-baseline gap-3 rounded-sm px-3 py-2.5 text-left transition-colors ${
                      on ? "bg-ink text-panel" : "hover:bg-canvas"
                    }`}
                  >
                    <span className={`mono w-8 shrink-0 ${on ? "text-panel/70" : "text-muted"}`}>{s.num}</span>
                    <span className="flex-1 text-[0.95rem] font-medium">{s.label}</span>
                    {counts[s.id] && (
                      <span className={`mono ${on ? "text-panel/70" : "text-muted"}`}>{counts[s.id]}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="border-t border-rule px-6 py-5">
          <p className="mono text-muted">Q&amp;A log: 0 open items</p>
          <p className="mono mt-1 text-muted">Viewers online: 1 (you)</p>
          <a
            href={`mailto:${PERSON.email}`}
            className="mt-4 block rounded-sm border border-ink px-4 py-3 text-center text-sm font-medium transition-colors hover:bg-ink hover:text-panel"
          >
            Email {PERSON.name.split(" ")[0]}
          </a>
        </div>
      </aside>

      <header className="sticky top-0 z-30 border-b border-rule bg-panel/95 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between px-5 pt-3">
          <p className="font-display text-lg font-medium">Project Voss</p>
          <p className="mono flex items-center gap-2 text-muted">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent live-dot" /> Read-only
          </p>
        </div>
        <nav aria-label="Data room index" className="flex gap-1 overflow-x-auto px-3 pb-2 pt-2">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollToId(s.id)}
              className={`mono shrink-0 rounded-sm px-3 py-2.5 ${
                active === s.id ? "bg-ink text-panel" : "text-muted"
              }`}
            >
              {s.num} {s.label}
            </button>
          ))}
        </nav>
      </header>
    </>
  );
}
