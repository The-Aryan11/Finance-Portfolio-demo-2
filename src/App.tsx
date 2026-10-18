import { useEffect, useRef } from "react";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import Summary from "./components/Summary";
import Transactions from "./components/Transactions";
import FootballField from "./components/FootballField";
import Codenames from "./components/Codenames";
import Process from "./components/Process";
import Access from "./components/Access";
import { gsap, initScroll } from "./lib/scroll";

export default function App() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const destroy = initScroll();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 30,
          opacity: 0.35,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });
    }, root);
    return () => {
      ctx.revert();
      destroy();
    };
  }, []);

  return (
    <div ref={root} className="lg:flex lg:items-start">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <Hero />
        <Summary />
        <Transactions />
        <FootballField />
        <Codenames />
        <Process />
        <Access />
        <footer className="border-t border-ink px-6 py-6 lg:px-14">
          <p className="mono text-muted">© 2026 Bespoke Portfolios · Harcourt Lane &amp; Co. (fictional) · All deals illustrative</p>
        </footer>
      </main>
    </div>
  );
}
