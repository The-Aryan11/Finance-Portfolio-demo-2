import { useEffect, useRef, useState } from "react";
import { deals } from "../data";
import { startScroll, stopScroll } from "../lib/scroll";

const tones = ["bg-ink", "bg-accent", "bg-muted", "bg-rule"];

export default function DealDrawer({
  index,
  onClose,
  onNav,
}: {
  index: number;
  onClose: () => void;
  onNav: (dir: number) => void;
}) {
  const deal = deals[index];
  const [step, setStep] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStep(0);
    bodyRef.current?.scrollTo({ top: 0 });
  }, [index]);

  useEffect(() => {
    stopScroll();
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      startScroll();
      prev?.focus?.();
    };
  }, [onClose, onNav]);

  const active = deal.timeline[step];
  const figures = [
    ["Deal size", deal.valueLabel],
    ["Valuation", deal.multiple],
    ["Time to signing", deal.duration.replace(" to signing", "")],
    ["Closed", deal.close],
  ];

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={`Deal file ${deal.doc} ${deal.company}`}>
      <div className="fade absolute inset-0 bg-ink/50" onClick={onClose} />
      <div className="drawer absolute inset-y-0 right-0 flex w-full max-w-3xl flex-col border-l border-ink bg-panel">
        <div className="flex items-center justify-between gap-3 border-b border-rule px-5 py-3 sm:px-8">
          <p className="mono truncate text-muted">
            {deal.doc} — {deal.company.replace(/ /g, "_")}.pdf
          </p>
          <div className="flex shrink-0 items-center gap-1">
            <button onClick={() => onNav(-1)} aria-label="Previous deal" className="mono px-3 py-3 hover:text-accent">
              ← Prev
            </button>
            <button onClick={() => onNav(1)} aria-label="Next deal" className="mono px-3 py-3 hover:text-accent">
              Next →
            </button>
            <button
              ref={closeRef}
              onClick={onClose}
              className="mono ml-1 rounded-sm bg-ink px-4 py-3 text-panel hover:bg-accent"
            >
              Close
            </button>
          </div>
        </div>

        <div ref={bodyRef} data-lenis-prevent className="watermark relative flex-1 overflow-y-auto px-5 pb-16 pt-8 sm:px-8">
          <p className="mono text-muted">
            {deal.category} · {deal.region} · {deal.year}
          </p>
          <h3 className="font-display mt-2 text-4xl font-medium leading-tight sm:text-5xl">{deal.company}</h3>
          <p className="mt-2 text-lg text-muted">
            {deal.descriptor} {deal.verb} <span className="text-ink">{deal.counterparty}</span>
          </p>

          <dl className="mt-8 grid grid-cols-2 border-y border-ink sm:grid-cols-4">
            {figures.map(([k, v], i) => (
              <div key={k} className={`px-3 py-4 ${i > 0 ? "sm:border-l sm:border-rule" : ""} ${i % 2 ? "border-l border-rule sm:border-l" : ""}`}>
                <dt className="mono text-muted">{k}</dt>
                <dd className="font-display mt-1 text-xl font-medium">{v}</dd>
              </div>
            ))}
          </dl>

          <h4 className="mono mt-12 text-muted">A. Timeline</h4>
          <div className="mt-4" role="tablist" aria-label="Deal milestones">
            <div className="relative flex justify-between">
              <div className="absolute left-0 right-0 top-[11px] h-px bg-rule" />
              <div
                className="absolute left-0 top-[11px] h-px bg-ink transition-all duration-500"
                style={{ width: `${(step / (deal.timeline.length - 1)) * 100}%` }}
              />
              {deal.timeline.map((s, i) => (
                <button
                  key={s.title + i}
                  role="tab"
                  aria-selected={i === step}
                  aria-label={`${s.date}: ${s.title}`}
                  onClick={() => setStep(i)}
                  className="relative flex flex-col items-center px-1 pb-1 outline-offset-4"
                >
                  <span
                    className={`block h-[23px] w-[23px] rounded-full border-2 border-ink transition-all ${
                      i === step ? "scale-110 bg-accent border-accent" : i < step ? "bg-ink" : "bg-panel"
                    }`}
                  />
                  <span className="mono mt-2 hidden text-[0.62rem] text-muted sm:block">{s.date}</span>
                </button>
              ))}
            </div>
            <div key={step} className="rise mt-6 border border-rule bg-canvas p-5" role="tabpanel">
              <p className="mono text-accent">
                {active.date} · Step {step + 1} of {deal.timeline.length}
              </p>
              <p className="font-display mt-1 text-2xl font-medium">{active.title}</p>
              <p className="mt-2 leading-relaxed">{active.note}</p>
            </div>
          </div>

          <h4 className="mono mt-12 text-muted">B. Structure — {deal.structureTitle}</h4>
          <div className="mt-4 flex h-12 w-full overflow-hidden border border-ink">
            {deal.split.map((s, i) => (
              <div
                key={s.label}
                className={`flex items-center justify-center text-sm font-medium ${tones[i % tones.length]} ${
                  i % tones.length === 3 ? "text-ink" : "text-panel"
                }`}
                style={{ width: `${s.pct}%` }}
              >
                {s.pct}%
              </div>
            ))}
          </div>
          <ul className="mono mt-3 flex flex-wrap gap-x-6 gap-y-2 text-muted">
            {deal.split.map((s, i) => (
              <li key={s.label} className="flex items-center gap-2">
                <span className={`inline-block h-3 w-3 border border-ink ${tones[i % tones.length]}`} />
                {s.label}
              </li>
            ))}
          </ul>
          <ul className="mt-5 space-y-2 border-t border-rule pt-4">
            {deal.terms.map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mono mt-1 text-accent">▪</span>
                {t}
              </li>
            ))}
          </ul>

          <h4 className="mono mt-12 text-muted">C. My role</h4>
          <p className="font-display mt-2 text-xl">{deal.advised}</p>
          <ul className="mt-4 space-y-4 leading-relaxed">
            {deal.role.map((r) => (
              <li key={r} className="border-l-2 border-ink pl-4">
                {r}
              </li>
            ))}
          </ul>
          <p className="mono mt-6 text-muted">Deal team: {deal.team}</p>
        </div>
      </div>
    </div>
  );
}
