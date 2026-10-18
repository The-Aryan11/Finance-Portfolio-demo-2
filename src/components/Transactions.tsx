import { useState } from "react";
import { deals, type Deal } from "../data";
import { SectionHead } from "./Summary";
import DealDrawer from "./DealDrawer";

const filters = ["All", "Sell-side", "Buy-side", "Merger", "Defence & Recap"] as const;

function Tombstone({ deal, index, onOpen }: { deal: Deal; index: number; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      aria-label={`Open deal file ${deal.doc}: ${deal.company}`}
      className="tomb rise flex min-h-[27rem] flex-col items-center px-8 pb-6 pt-9 text-center"
      style={{ animationDelay: `${index * 45}ms` }}
    >
      <div className="mono flex w-full justify-between text-muted">
        <span>{deal.year}</span>
        <span>{deal.category}</span>
      </div>
      <h3 className="font-display mt-6 text-[1.6rem] font-bold uppercase leading-tight tracking-wide">{deal.company}</h3>
      <p className="mt-1 text-sm text-muted">{deal.descriptor}</p>
      <p className="font-display mt-6 text-base italic text-muted">{deal.verb}</p>
      <p className="font-display mt-2 text-xl font-bold uppercase leading-tight tracking-wide">{deal.counterparty}</p>
      <p className="font-display mt-6 text-3xl font-medium">{deal.valueLabel}</p>
      <p className="mt-auto pt-6 text-xs leading-snug text-muted">{deal.advised}</p>
      <p className="tomb-open mono mt-5 w-full border-t border-rule pt-3 transition-colors">Open file {deal.doc} →</p>
    </button>
  );
}

export default function Transactions() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [open, setOpen] = useState<number | null>(null);
  const visible = deals.filter((d) => filter === "All" || d.category === filter);

  return (
    <section id="transactions" className="border-b border-rule px-6 py-20 lg:px-14">
      <SectionHead
        num="3.0"
        title="Transactions"
        sub="Selected public mandates, each drawn up as a tombstone. Click one to open the deal file: timeline, size, structure and my role."
      />
      <div data-reveal className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter by mandate type">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`mono rounded-sm border px-4 py-3 transition-colors ${
              filter === f ? "border-ink bg-ink text-panel" : "border-rule bg-panel hover:border-ink"
            }`}
          >
            {f}
            <span className="ml-2 opacity-60">
              {f === "All" ? deals.length : deals.filter((d) => d.category === f).length}
            </span>
          </button>
        ))}
      </div>

      <div key={filter} className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((d, i) => (
          <Tombstone key={d.doc} deal={d} index={i} onOpen={() => setOpen(deals.indexOf(d))} />
        ))}
      </div>

      {open !== null && (
        <DealDrawer
          index={open}
          onClose={() => setOpen(null)}
          onNav={(dir) => setOpen((open + dir + deals.length) % deals.length)}
        />
      )}
    </section>
  );
}
