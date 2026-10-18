import { useState } from "react";
import { PERSON } from "../data";
import { SectionHead } from "./Summary";

const field =
  "w-full rounded-sm border border-rule bg-panel px-4 py-3.5 outline-none transition-colors focus:border-ink";

export default function Access() {
  const [sent, setSent] = useState<string | null>(null);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const ref = "DR-" + Math.floor(1000 + Math.random() * 9000);
    const body = `Name: ${f.get("name")}\nFirm: ${f.get("firm")}\nReason: ${f.get("reason")}\n\n${f.get("msg")}\n\nRef ${ref}`;
    window.location.href = `mailto:${PERSON.email}?subject=${encodeURIComponent("Data room access request " + ref)}&body=${encodeURIComponent(body)}`;
    setSent(ref);
  };

  return (
    <section id="access" className="px-6 pb-24 pt-20 lg:px-14">
      <SectionHead num="7.0" title="Request Access" sub="Reference to a live situation? Tell me what you are looking at and I will clear you for the next folder." />
      <div className="grid gap-12 lg:grid-cols-[1fr_24rem]">
        {sent ? (
          <div className="rise border border-ink bg-panel p-10">
            <p className="stamp inline-block rotate-[-3deg] px-3 py-1 text-sm">Request logged</p>
            <h3 className="font-display mt-6 text-4xl font-medium">Reference {sent}</h3>
            <p className="mt-3 max-w-md text-muted">Your email app should have opened with the request ready to send. I reply within one business day.</p>
            <button onClick={() => setSent(null)} className="mono mt-8 rounded-sm border border-ink px-5 py-3 hover:bg-ink hover:text-panel">
              Submit another
            </button>
          </div>
        ) : (
          <form data-reveal onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mono text-muted">Full name</span>
              <input required name="name" autoComplete="name" className={`${field} mt-2`} />
            </label>
            <label className="block">
              <span className="mono text-muted">Firm</span>
              <input required name="firm" autoComplete="organization" className={`${field} mt-2`} />
            </label>
            <label className="block sm:col-span-2">
              <span className="mono text-muted">Nature of enquiry</span>
              <select name="reason" className={`${field} mt-2`}>
                <option>Sell-side mandate</option>
                <option>Buy-side mandate</option>
                <option>Fairness opinion or board advice</option>
                <option>Introduction or partnership</option>
                <option>Recruiting</option>
              </select>
            </label>
            <label className="block sm:col-span-2">
              <span className="mono text-muted">Brief description (no confidential detail)</span>
              <textarea name="msg" rows={4} className={`${field} mt-2`} />
            </label>
            <label className="flex items-start gap-3 sm:col-span-2">
              <input required type="checkbox" className="mt-1 h-5 w-5 accent-[var(--color-ink)]" />
              <span className="text-sm text-muted">I will not share anything I find here, and I understand this site is read-only.</span>
            </label>
            <button className="rounded-sm bg-ink px-8 py-4 text-sm font-medium text-panel transition-transform hover:-translate-y-0.5 sm:col-span-2 sm:w-fit">
              Submit access request
            </button>
          </form>
        )}

        <aside data-reveal className="border-t border-ink pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <p className="mono text-muted">Direct line</p>
          <a href={`mailto:${PERSON.email}`} className="font-display mt-2 block break-all text-2xl underline decoration-rule underline-offset-4 hover:decoration-accent">
            {PERSON.email}
          </a>
          <p className="mono mt-8 text-muted">Office</p>
          <p className="mt-2">{PERSON.firm}<br />One Fenchurch Place, London</p>
          <p className="mono mt-8 text-muted">End of index</p>
          <p className="mt-2 text-sm text-muted">7 folders · 9 deal files · 8 codenamed projects. Sample deals and firm are illustrative.</p>
        </aside>
      </div>
    </section>
  );
}
