import { useEffect, useRef } from "react";
import { stages } from "../data";
import { gsap, ScrollTrigger } from "../lib/scroll";
import { SectionHead } from "./Summary";

export default function Process() {
  const list = useRef<HTMLOListElement>(null);
  const line = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: list.current, start: "top 65%", end: "bottom 65%", scrub: true },
        },
      );
      gsap.utils.toArray<HTMLElement>("[data-stage]").forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 65%",
          toggleClass: { targets: el, className: "is-on" },
        });
      });
    }, list);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="border-b border-rule px-6 py-20 lg:px-14">
      <SectionHead
        num="6.0"
        title="Process Letter"
        sub="How I run a sale, in the order it actually happens. Twenty-two weeks, give or take a bidder."
      />
      <ol ref={list} className="relative ml-3 max-w-4xl">
        <div className="absolute bottom-2 left-0 top-2 w-px bg-rule" />
        <div ref={line} className="absolute bottom-2 left-0 top-2 w-px origin-top bg-accent" style={{ transform: "scaleY(0)" }} />
        {stages.map((s, i) => (
          <li
            key={s.title}
            data-stage
            className="group relative grid gap-1 pb-12 pl-10 opacity-45 transition-opacity duration-500 last:pb-0 sm:grid-cols-[8rem_1fr] sm:gap-8 [&.is-on]:opacity-100"
          >
            <span className="absolute -left-[7px] top-2 block h-3.5 w-3.5 rounded-full border-2 border-ink bg-panel transition-colors group-[.is-on]:bg-accent group-[.is-on]:border-accent" />
            <p className="mono pt-1.5 text-muted">
              {String(i + 1).padStart(2, "0")} · {s.week}
            </p>
            <div>
              <h3 className="font-display text-2xl font-medium sm:text-3xl">{s.title}</h3>
              <p className="mt-2 max-w-xl leading-relaxed text-muted">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
