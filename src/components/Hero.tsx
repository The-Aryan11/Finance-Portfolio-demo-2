import { PERSON } from "../data";
import { scrollToId } from "../lib/scroll";
import CountUp from "./CountUp";

export default function Hero() {
  return (
    <section id="cover" className="relative overflow-hidden border-b border-rule px-6 pb-16 pt-10 lg:px-14 lg:pt-14">
      <div className="mono flex flex-wrap items-center justify-between gap-3 text-muted">
        <span>Data Room / Folder 1.0 / Cover</span>
        <span>v14 (final) · Last modified 18 Oct 2026</span>
      </div>

      <div className="stamp absolute right-6 top-32 hidden rotate-[8deg] px-4 py-2 text-lg sm:block lg:right-14 lg:top-32 lg:text-2xl">
        Confidential
      </div>

      <h1 className="font-display mt-14 text-[clamp(4.2rem,13vw,11.5rem)] font-medium leading-[0.86] tracking-tight">
        Adrian
        <br />
        Voss
      </h1>

      <p className="mt-8 max-w-3xl font-display text-2xl leading-snug sm:text-4xl">
        Advised on <span className="whitespace-nowrap">$38.4 billion</span> of deals. Most of them{" "}
        <span className="redact" tabIndex={0}>
          <span>I am not allowed to name.</span>
        </span>
      </p>
      <p className="mono mt-3 text-muted">Hover or tap the black bar. Your NDA is assumed.</p>

      <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1fr_auto]">
        <div className="flex flex-wrap items-start gap-3 self-start">
          <button
            onClick={() => scrollToId("transactions")}
            className="rounded-sm bg-ink px-7 py-4 text-sm font-medium text-panel transition-transform hover:-translate-y-0.5 focus-visible:ring-2"
          >
            Open the transactions
          </button>
          <button
            onClick={() => scrollToId("access")}
            className="rounded-sm border border-ink px-7 py-4 text-sm font-medium transition-colors hover:bg-ink hover:text-panel"
          >
            Request access
          </button>
        </div>

        <dl className="grid min-w-[18rem] grid-cols-[auto_1fr] gap-x-6 gap-y-2 border border-rule bg-panel p-5 text-sm">
          <dt className="mono text-muted">Name</dt>
          <dd>{PERSON.name}</dd>
          <dt className="mono text-muted">Title</dt>
          <dd>{PERSON.title}</dd>
          <dt className="mono text-muted">Coverage</dt>
          <dd>{PERSON.coverage}</dd>
          <dt className="mono text-muted">Firm</dt>
          <dd>{PERSON.firm}</dd>
          <dt className="mono text-muted">Access</dt>
          <dd>Read-only, no download</dd>
        </dl>
      </div>

      <div className="mt-16 grid grid-cols-2 border-y border-ink md:grid-cols-4">
        {[
          { v: 38.4, d: 1, pre: "$", suf: "bn", l: "Aggregate deal value advised" },
          { v: 46, d: 0, pre: "", suf: "", l: "Transactions closed" },
          { v: 14, d: 0, pre: "", suf: " yrs", l: "In M&A advisory" },
          { v: 11, d: 0, pre: "", suf: "", l: "Cross-border mandates" },
        ].map((s, i) => (
          <div key={s.l} className={`px-4 py-6 ${i % 2 === 1 ? "border-l border-rule" : ""} ${i > 1 ? "border-t border-rule md:border-t-0" : ""} ${i > 0 ? "md:border-l" : ""}`}>
            <p className="font-display text-4xl font-medium sm:text-5xl">
              <CountUp to={s.v} decimals={s.d} prefix={s.pre} suffix={s.suf} />
            </p>
            <p className="mono mt-2 text-muted">{s.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
