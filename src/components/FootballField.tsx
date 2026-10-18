import { useRef, useState } from "react";
import { SectionHead } from "./Summary";

const MIN = 20;
const MAX = 60;
const PRICE = 38.4;
const SHARES = 100;
const NET_DEBT = 600;
const LTM = 310;
const NTM = 330;
const FCF = [210, 240, 270, 300, 330];

const perShare = (ev: number) => (ev - NET_DEBT) / SHARES;
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const usd = (v: number) => `$${v.toFixed(2)}`;

function dcf(w: number, g: number) {
  let ev = 0;
  FCF.forEach((f, i) => (ev += f / Math.pow(1 + w, i + 1)));
  ev += (FCF[4] * (1 + g)) / (w - g) / Math.pow(1 + w, 5);
  return perShare(ev);
}

type Row = { id: string; label: string; sub: string; lo: number; hi: number; kind: "market" | "relative" | "intrinsic"; basis: string };

export default function FootballField() {
  const [offer, setOffer] = useState(46);
  const [wacc, setWacc] = useState(9);
  const [tgr, setTgr] = useState(2.5);
  const [off, setOff] = useState<Set<string>>(new Set());
  const [hover, setHover] = useState<string | null>(null);
  const plot = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const w = wacc / 100;
  const g = tgr / 100;
  const rows: Row[] = [
    { id: "52w", label: "52-week trading range", sub: "Low and high close", lo: 29.1, hi: 41.8, kind: "market", basis: "Lowest and highest closing price over the last twelve months." },
    { id: "pt", label: "Analyst price targets", sub: "Street, 12 months", lo: 36, hi: 51, kind: "market", basis: "Range of published broker targets. Reference only, not a valuation method." },
    { id: "cc", label: "Trading comparables", sub: "11.0x to 13.5x NTM EBITDA", lo: perShare(11 * NTM), hi: perShare(13.5 * NTM), kind: "relative", basis: `11.0x to 13.5x NTM EBITDA of $${NTM}m, less $${NET_DEBT}m net debt, over ${SHARES}m shares.` },
    { id: "pt2", label: "Precedent transactions", sub: "13.0x to 16.0x LTM EBITDA", lo: perShare(13 * LTM), hi: perShare(16 * LTM), kind: "relative", basis: `13.0x to 16.0x LTM EBITDA of $${LTM}m from recent control deals, so it includes a premium.` },
    { id: "lbo", label: "LBO analysis", sub: "20% to 25% IRR, 6.0x debt", lo: 33.2, hi: 40.4, kind: "intrinsic", basis: "What a financial buyer could pay and still earn a 20% to 25% IRR at 6.0x leverage." },
    { id: "dcf", label: "Discounted cash flow", sub: `WACC ${wacc.toFixed(1)}%, TGR ${tgr.toFixed(1)}%`, lo: dcf(w + 0.01, g - 0.005), hi: dcf(w - 0.01, g + 0.005), kind: "intrinsic", basis: `Five-year free cash flow, WACC ${wacc.toFixed(1)}% plus or minus 1.0 point, terminal growth ${tgr.toFixed(1)}% plus or minus 0.5 point.` },
  ];

  const pct = (v: number) => `${((clamp(v, MIN, MAX) - MIN) / (MAX - MIN)) * 100}%`;
  const live = rows.filter((r) => !off.has(r.id));
  const above = live.filter((r) => offer > r.hi).length;
  const inside = live.filter((r) => offer >= r.lo && offer <= r.hi).length;
  const below = live.length - above - inside;

  const premium = (offer / PRICE - 1) * 100;
  const ev = offer * SHARES + NET_DEBT;
  const hov = rows.find((r) => r.id === hover);

  const setFromX = (x: number) => {
    const r = plot.current!.getBoundingClientRect();
    setOffer(Math.round(clamp(MIN + ((x - r.left) / r.width) * (MAX - MIN), MIN, MAX) * 20) / 20);
  };

  let reading: string;
  if (live.length === 0) reading = "Switch at least one methodology back on.";
  else if (above === live.length) reading = `At ${usd(offer)}, the offer clears the top of every range showing. A banker would call that full, and ask the client whether there is any reason to keep pushing.`;
  else if (below === live.length) reading = `At ${usd(offer)}, the offer sits below every range showing. A board would reject this without a meeting.`;
  else reading = `At ${usd(offer)}, the offer clears the top of ${above} of ${live.length} ranges, sits inside ${inside} and below ${below}. That is a ${premium.toFixed(1)}% premium to the unaffected price.`;

  return (
    <section id="valuation" className="border-b border-rule px-6 py-20 lg:px-14">
      <SectionHead
        num="4.0"
        title="Valuation Workbench"
        sub="A football field for an illustrative target, Fennimore Biologics. Drag the offer line, move the DCF assumptions, or switch methods on and off."
      />

      <div data-reveal className="border border-ink bg-panel p-4 sm:p-8">
        <div className="mono mb-6 flex flex-wrap justify-between gap-2 text-muted">
          <span>Fennimore Biologics (illustrative)</span>
          <span>Equity value per share, USD</span>
        </div>

        <div className="flex">
          <div className="w-28 shrink-0 sm:w-60">
            {rows.map((r) => (
              <button
                key={r.id}
                onClick={() =>
                  setOff((s) => {
                    const n = new Set(s);
                    n.has(r.id) ? n.delete(r.id) : n.add(r.id);
                    return n;
                  })
                }
                aria-pressed={!off.has(r.id)}
                onMouseEnter={() => setHover(r.id)}
                onMouseLeave={() => setHover(null)}
                className={`block h-16 w-full pr-3 text-left transition-opacity ${off.has(r.id) ? "opacity-35" : ""}`}
              >
                <span className="block text-[0.8rem] font-medium leading-tight sm:text-sm">{r.label}</span>
                <span className="mono mt-1 hidden text-[0.62rem] normal-case text-muted sm:block">{r.sub}</span>
              </button>
            ))}
          </div>

          <div className="flex-1">
            <div
              ref={plot}
              className="relative cursor-ew-resize select-none"
              style={{ touchAction: "pan-y" }}
              onPointerDown={(e) => {
                dragging.current = true;
                e.currentTarget.setPointerCapture(e.pointerId);
                setFromX(e.clientX);
              }}
              onPointerMove={(e) => dragging.current && setFromX(e.clientX)}
              onPointerUp={() => (dragging.current = false)}
              onPointerCancel={() => (dragging.current = false)}
            >
              {[20, 30, 40, 50, 60].map((t) => (
                <div key={t} className="absolute inset-y-0 w-px bg-rule" style={{ left: pct(t) }} />
              ))}
              {rows.map((r) => {
                const lo = clamp(r.lo, MIN, MAX);
                const hi = clamp(r.hi, MIN, MAX);
                const dim = off.has(r.id);
                return (
                  <div
                    key={r.id}
                    className="relative h-16"
                    onMouseEnter={() => setHover(r.id)}
                    onMouseLeave={() => setHover(null)}
                  >
                    <div
                      className={`absolute top-4 h-8 transition-all duration-300 ${
                        dim ? "border border-dashed border-ink opacity-30" : r.kind === "market" ? "hatch border border-ink" : r.kind === "relative" ? "bg-ink/70" : "bg-ink"
                      } ${hover === r.id && !dim ? "ring-2 ring-accent ring-offset-2 ring-offset-panel" : ""}`}
                      style={{ left: pct(lo), width: `calc(${pct(hi)} - ${pct(lo)})` }}
                    />
                    {!dim && (
                      <>
                        <span className="mono absolute top-5 -translate-x-full pr-1.5 text-[0.62rem]" style={{ left: pct(lo) }}>
                          {lo.toFixed(1)}
                        </span>
                        <span className="mono absolute top-5 pl-1.5 text-[0.62rem]" style={{ left: pct(hi) }}>
                          {r.hi > MAX ? `${MAX}+` : hi.toFixed(1)}
                        </span>
                      </>
                    )}
                  </div>
                );
              })}

              <div className="pointer-events-none absolute inset-y-0 border-l border-dashed border-ink" style={{ left: pct(PRICE) }}>
                <span className="mono absolute -top-5 -translate-x-1/2 whitespace-nowrap text-[0.6rem] text-muted">Unaffected {usd(PRICE)}</span>
              </div>

              <div className="pointer-events-none absolute -bottom-0 -top-1 w-0.5 bg-accent" style={{ left: pct(offer) }}>
                <span className="mono absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-accent px-2 py-1 text-[0.65rem] text-panel">
                  Offer {usd(offer)}
                </span>
                <span className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-accent bg-panel" />
              </div>
            </div>
            <div className="relative mt-3 h-5">
              {[20, 30, 40, 50, 60].map((t) => (
                <span key={t} className="mono absolute -translate-x-1/2 text-[0.65rem] text-muted" style={{ left: pct(t) }}>
                  ${t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 border-t border-rule pt-8 lg:grid-cols-3">
          <div className="space-y-6">
            <label className="block">
              <span className="mono flex justify-between text-muted">
                <span>Offer price per share</span>
                <span className="text-accent">{usd(offer)}</span>
              </span>
              <input className="accent mt-3" type="range" min={MIN} max={MAX} step={0.05} value={offer} onChange={(e) => setOffer(+e.target.value)} />
            </label>
            <label className="block">
              <span className="mono flex justify-between text-muted">
                <span>DCF discount rate (WACC)</span>
                <span>{wacc.toFixed(1)}%</span>
              </span>
              <input className="mt-3" type="range" min={7.5} max={11} step={0.1} value={wacc} onChange={(e) => setWacc(+e.target.value)} />
            </label>
            <label className="block">
              <span className="mono flex justify-between text-muted">
                <span>Terminal growth rate</span>
                <span>{tgr.toFixed(1)}%</span>
              </span>
              <input className="mt-3" type="range" min={1} max={3.5} step={0.1} value={tgr} onChange={(e) => setTgr(+e.target.value)} />
            </label>
          </div>

          <dl className="grid grid-cols-2 content-start gap-x-6 gap-y-4">
            {[
              ["Premium to unaffected", `${premium >= 0 ? "+" : ""}${premium.toFixed(1)}%`],
              ["Equity value", `$${(offer * SHARES / 1000).toFixed(2)}bn`],
              ["Implied EV", `$${(ev / 1000).toFixed(2)}bn`],
              ["EV / LTM EBITDA", `${(ev / LTM).toFixed(1)}x`],
              ["EV / NTM EBITDA", `${(ev / NTM).toFixed(1)}x`],
              ["Ranges cleared", `${above} of ${live.length}`],
            ].map(([k, v]) => (
              <div key={k} className="border-t border-ink pt-2">
                <dt className="mono text-muted">{k}</dt>
                <dd className="font-display text-2xl font-medium">{v}</dd>
              </div>
            ))}
          </dl>

          <div aria-live="polite" className="border-l-2 border-accent pl-5">
            <p className="mono text-muted">{hov ? hov.label : "Reading the page"}</p>
            <p className="mt-2 leading-relaxed">{hov ? `${hov.basis} Range ${usd(hov.lo)} to ${usd(hov.hi)}.` : reading}</p>
          </div>
        </div>
        <p className="mono mt-6 text-muted">Click or drag anywhere on the chart to move the offer. Click a method name to switch it off. Hatched = market reference, light = relative, solid = intrinsic.</p>
      </div>
    </section>
  );
}
