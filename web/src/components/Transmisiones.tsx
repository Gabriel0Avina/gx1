"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Kicker from "./Kicker";
import { preguntas } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export default function Transmisiones() {
  const scope = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(scope);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-faq-head]", {
        autoAlpha: 0,
        y: 40,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: scope.current, start: "top 75%" },
      });
      gsap.from("[data-faq-row]", {
        autoAlpha: 0,
        y: 28,
        duration: 0.7,
        stagger: 0.07,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-faq-list]", start: "top 80%" },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={scope}
      id="preguntas"
      className="bg-void px-5 pb-24 pt-12 sm:px-8 lg:pb-36 lg:pt-16"
    >
      <div className="mx-auto max-w-[900px]">
        <div data-faq-head>
          <Kicker>Transmisiones</Kicker>
          <h2 className="type-display mt-4 text-[clamp(2.2rem,5.5vw,4rem)]">
            Preguntas frecuentes
          </h2>
        </div>

        <div data-faq-list className="mt-14 border-b border-line">
          {preguntas.map(({ q, a }, i) => (
            <details
              key={q}
              data-faq-row
              className="faq-row-material group border-t border-line"
            >
              <summary className="flex min-h-11 cursor-pointer items-center gap-5 py-6 text-left">
                <span className="type-telemetry shrink-0 text-ink-dim">
                  Q.{String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-lg font-semibold text-ink-bright">
                  {q}
                </span>
                <span aria-hidden className="faq-indicator shrink-0 text-cyan" />
              </summary>
              <p className="pb-7 pl-[3.75rem] leading-relaxed text-ink">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
