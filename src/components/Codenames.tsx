import { useState } from "react";
import { codenames } from "../data";
import { SectionHead } from "./Summary";

export default function Codenames() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section id="codenames" className="border-b border-rule px-6 py-20 lg:px-14">
      <SectionHead
        num="5.0"
        title="Project Codenames"
        sub="The work I cannot name. Clients are anonymised, details are redacted. Hover, focus or tap a row to declassify it."
      />
      <div data-reveal className="border-t border-ink">
        <div className="mono hidden grid-cols-[4rem_1.2fr_2fr_1.2fr_1fr_1fr] gap-4 border-b border-rule py-3 text-muted md:grid">
          <span>Doc</span>
          <span>Codename</span>
          <span>Business</span>
          <span>Mandate</span>
          <span>Size</span>
          <span>Status</span>
        </div>
        {codenames.map((c) => (
          <div
            key={c.doc}
            role="button"
            tabIndex={0}
            aria-expanded={open === c.doc}
            data-open={open === c.doc}
            onClick={() => setOpen(open === c.doc ? null : c.doc)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpen(open === c.doc ? null : c.doc);
              }
            }}
            className="cn-row grid cursor-pointer grid-cols-2 items-center gap-x-4 gap-y-2 border-b border-rule py-5 transition-colors hover:bg-panel focus-visible:bg-panel data-[open=true]:bg-panel md:grid-cols-[4rem_1.2fr_2fr_1.2fr_1fr_1fr]"
          >
            <span className="mono text-muted md:order-none">{c.doc}</span>
            <span className="font-display text-2xl font-medium md:text-xl">{c.name}</span>
            <span className="cn-cell col-span-2 text-sm md:col-span-1">{c.sector}</span>
            <span className="cn-cell text-sm">{c.mandate}</span>
            <span className="cn-cell mono">{c.size}</span>
            <span className="cn-cell mono col-span-2 flex items-center gap-2 md:col-span-1">
              {c.live && <span className="live-dot inline-block h-2 w-2 rounded-full bg-accent" />}
              {c.status}
            </span>
          </div>
        ))}
      </div>
      <p className="mono mt-4 text-muted">Names withheld under NDA. Live mandates shown with a red marker.</p>
    </section>
  );
}
