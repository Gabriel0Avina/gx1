"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Kicker from "./Kicker";
import { etapas, type Servicio } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

/* Detalle del servicio: "Qué incluye" es el líder (panel de metal con
   filo encendido); "Ideal para" y la etapa del camino, en lenguaje
   silencioso. */
export default function ServicioDetalle({ servicio: s }: { servicio: Servicio }) {
  const scope = useRef<HTMLElement>(null);
  const etapa = etapas.find((e) => e.id === s.etapa);
  const numEtapa = etapas.findIndex((e) => e.id === s.etapa) + 1;

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(scope);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-sd]", {
        autoAlpha: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: { trigger: scope.current, start: "top 72%" },
      });
      gsap.from("[data-sd-item]", {
        autoAlpha: 0,
        x: -16,
        duration: 0.6,
        stagger: 0.07,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-sd-lider]", start: "top 76%" },
      });
      ScrollTrigger.create({
        trigger: "[data-sd-lider]",
        start: "top 74%",
        onEnter: () =>
          scope.current
            ?.querySelector("[data-sd-lider]")
            ?.setAttribute("data-lit", "true"),
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={scope}
      className="scene-cut-in bg-void px-5 pb-24 pt-[calc(6rem+4vw)] sm:px-8 lg:pb-32 lg:pt-[calc(8rem+4vw)]"
    >
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
        <div
          data-sd
          data-sd-lider
          className="material-metal-dark material-lit-edge px-7 py-9 lg:px-10 lg:py-12"
        >
          <Kicker>Qué incluye</Kicker>
          <h2 className="type-display mt-4 text-[clamp(1.9rem,3.6vw,2.8rem)] leading-tight">
            {s.nombre}
          </h2>
          <ul className="mt-8 flex flex-col gap-4">
            {s.incluye.map((item) => (
              <li
                key={item}
                data-sd-item
                className="flex gap-3 border-t border-line pt-4 text-lg leading-snug text-ink-bright"
              >
                <span
                  aria-hidden
                  className="mt-2 inline-block size-1.5 shrink-0 rotate-45 bg-cyan"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-10">
          <div data-sd className="border-t border-line pt-6">
            <p className="type-telemetry text-ink-dim">Ideal para</p>
            <p className="type-display mt-3 text-[clamp(1.4rem,2.4vw,1.8rem)] leading-snug text-ink-bright">
              {s.idealPara}
            </p>
          </div>
          {etapa && (
            <div data-sd className="border-t border-line pt-6">
              <p className="type-telemetry text-ink-dim">
                Etapa {String(numEtapa).padStart(2, "0")} del camino
              </p>
              <p className="type-display mt-3 text-[clamp(1.4rem,2.4vw,1.8rem)] text-cyan">
                {etapa.nombre}
              </p>
              <p className="mt-2 leading-relaxed text-ink">{etapa.resuelve}.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
