import { PERSON } from "../data";

const roles = [
  { label: "Sell-side", n: 28 },
  { label: "Buy-side", n: 11 },
  { label: "Fairness and defence", n: 7 },
];

export function SectionHead({ num, title, sub }: { num: string; title: string; sub?: string }) {
  return (
    <div data-reveal className="mb-10 flex flex-col gap-3 border-b border-ink pb-5 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="mono text-muted">Folder {num}</p>
        <h2 className="font-display mt-1 text-4xl font-medium leading-none sm:text-6xl">{title}</h2>
      </div>
      {sub && <p className="max-w-md text-muted">{sub}</p>}
    </div>
  );
}

export default function Summary() {
  return (
    <section id="summary" className="border-b border-rule px-6 py-20 lg:px-14">
      <SectionHead num="2.0" title="Executive Summary" sub="The one-page version, written the way I would brief a board." />
      <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr]">
        <figure data-reveal className="relative">
          <img
            src="/img/portrait.jpg"
            alt={`Portrait of ${PERSON.name}`}
            width={728}
            height={910}
            className="aspect-[4/5] w-full border border-ink object-cover grayscale-[35%]"
          />
          <figcaption className="mono mt-3 flex justify-between text-muted">
            <span>Exhibit A</span>
            <span>{PERSON.name}, MD</span>
          </figcaption>
        </figure>

        <div>
          <p data-reveal className="font-display text-3xl leading-snug sm:text-4xl">
            I have spent fourteen years on the same question: what is this company worth, to whom, and how do we get the
            best buyer to prove it.
          </p>
          <div data-reveal className="mt-8 grid gap-8 text-[1.05rem] leading-relaxed md:grid-cols-2">
            <p>
              I run sell-side processes, advise acquirers on what to pay and when to walk, and sit with boards when an
              unwanted bid arrives. My coverage is industrials and the energy transition: power developers, materials,
              logistics and the software that runs them.
            </p>
            <p>
              Before {PERSON.firm} I spent six years at a bulge-bracket bank in New York and London. I am a CFA
              charterholder and hold a Series 79 licence. I like a tight timetable, a clean data room and a client who
              reads the SPA.
            </p>
          </div>

          <div data-reveal className="mt-10 border border-rule bg-panel p-6">
            <p className="mono text-muted">Mandates by type, closed to date</p>
            <ul className="mt-4 space-y-3">
              {roles.map((r) => (
                <li key={r.label} className="grid grid-cols-[9rem_1fr_2rem] items-center gap-4 text-sm">
                  <span>{r.label}</span>
                  <span className="h-3 bg-canvas">
                    <span className="block h-full bg-ink" style={{ width: `${(r.n / 28) * 100}%` }} />
                  </span>
                  <span className="mono text-right">{r.n}</span>
                </li>
              ))}
            </ul>
          </div>

          <dl data-reveal className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              ["Sectors", "Power and renewables, industrial materials, logistics, vertical software"],
              ["Regions", "North America, Europe, South-East Asia, Latin America"],
              ["Deal sizes", "$500m to $3.5bn enterprise value"],
            ].map(([k, v]) => (
              <div key={k} className="border-t border-ink pt-3">
                <dt className="mono text-muted">{k}</dt>
                <dd className="mt-1">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
