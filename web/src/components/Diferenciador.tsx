"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Kicker from "./Kicker";

gsap.registerPlugin(ScrollTrigger);

/* El "Unlike" del posicionamiento (plantilla Geoffrey Moore): la única
   sección de contraste contra alternativas. Banda oscura compacta con
   la frase más memorable de la marca en display grande. */
export default function Diferenciador() {
  const scope = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(scope);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-dif] > *", {
        autoAlpha: 0,
        y: 36,
        duration: 1,
        stagger: 0.14,
        ease: "expo.out",
        scrollTrigger: { trigger: scope.current, start: "top 72%" },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={scope}
      className="scene-cut-in bg-void-deep px-5 pb-20 pt-[calc(5rem+4vw)] sm:px-8 lg:pb-28 lg:pt-[calc(7rem+4vw)]"
    >
      <div data-dif className="mx-auto max-w-[1400px]">
        <Kicker>Ventaja GX1</Kicker>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-dim">
          A diferencia de las agencias tradicionales — caras, manuales,
          lentas —
        </p>
        <p className="type-display mt-4 max-w-4xl text-[clamp(1.9rem,4.8vw,3.4rem)] leading-tight text-ink-bright">
          GX1 combina <span className="text-cyan">IA con criterio humano</span>
          : resultados de nivel agencia, a velocidad y costo de freelancer.
        </p>
      </div>
    </section>
  );
}
