"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Kicker from "./Kicker";

gsap.registerPlugin(ScrollTrigger);

const fallas = [
  {
    id: "01",
    titulo: "Publicas sin estrategia — o no publicas",
    texto:
      "El contenido sale cuando hay tiempo, sin plan ni consistencia. Y la visibilidad de tu negocio se apaga.",
  },
  {
    id: "02",
    titulo: "Tu web está vieja o no convierte",
    texto:
      "Los clientes te buscan en Google, llegan a un sitio desactualizado y se van con el competidor que sí se ve profesional.",
  },
  {
    id: "03",
    titulo: "Tareas manuales que comen horas",
    texto:
      "Cotizaciones, seguimiento, reportes… horas repetitivas que deberían ir a hacer crecer tu negocio.",
  },
];

/* Diagnóstico: composición asimétrica — la falla líder es un panel de
   metal oscuro cuyo filo cyan se enciende al entrar; las secundarias
   usan un lenguaje más silencioso (solo separador). */
export default function Diagnostico() {
  const scope = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(scope);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-diag-head]", {
        autoAlpha: 0,
        y: 40,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: scope.current, start: "top 75%" },
      });

      // Líder: entrada con peso
      gsap.from("[data-lead]", {
        autoAlpha: 0,
        y: 60,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-lead]", start: "top 78%" },
      });
      ScrollTrigger.create({
        trigger: "[data-lead]",
        start: "top 72%",
        onEnter: () =>
          scope.current
            ?.querySelector("[data-lead]")
            ?.setAttribute("data-lit", "true"),
      });

      // Secundarias: stagger ligero
      gsap.from("[data-falla-side]", {
        autoAlpha: 0,
        y: 32,
        duration: 0.7,
        stagger: 0.15,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-falla-side]", start: "top 82%" },
      });

      gsap.from("[data-falla-status]", {
        autoAlpha: 0,
        duration: 0.4,
        stagger: 0.2,
        ease: "expo.out",
        scrollTrigger: { trigger: scope.current, start: "top 60%" },
      });

      gsap.from("[data-diag-bridge]", {
        autoAlpha: 0,
        y: 28,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-diag-bridge]", start: "top 88%" },
      });
    });

    return () => mm.revert();
  }, []);

  const [lead, ...resto] = fallas;

  return (
    <section ref={scope} className="bg-void px-5 py-24 sm:px-8 lg:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div data-diag-head className="max-w-3xl">
          <Kicker>Diagnóstico</Kicker>
          <h2 className="type-display mt-4 text-[clamp(2.2rem,5.5vw,4rem)]">
            ¿Te suena familiar?
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink">
            La mayoría de los negocios sabe que debería estar en digital. El
            problema nunca es querer — es no tener tiempo ni estructura para
            hacerlo bien.
          </p>
        </div>

        <ul className="mt-16 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-10">
          {/* Falla líder: panel de metal con filo que se enciende */}
          <li
            data-falla
            data-lead
            className="material-metal-dark material-lit-edge px-8 py-10 lg:row-span-2 lg:px-10 lg:py-14"
          >
            <p className="type-telemetry text-cyan">Falla {lead.id}</p>
            <h3 className="type-display mt-5 text-[clamp(1.9rem,4.2vw,3.2rem)] leading-tight">
              {lead.titulo}
            </h3>
            <p className="mt-5 max-w-md leading-relaxed text-ink">
              {lead.texto}
            </p>
            <p
              data-falla-status
              className="type-telemetry tele-blink mt-8 text-cyan"
            >
              ● Detectada
            </p>
          </li>

          {/* Fallas secundarias: lenguaje silencioso, solo separador */}
          {resto.map(({ id, titulo, texto }) => (
            <li
              key={id}
              data-falla
              data-falla-side
              className="border-t border-line pt-6"
            >
              <div className="flex items-baseline justify-between gap-4">
                <p className="type-telemetry text-ink-dim">Falla {id}</p>
                <p
                  data-falla-status
                  className="type-telemetry tele-blink text-cyan"
                >
                  ● Detectada
                </p>
              </div>
              <h3 className="type-display mt-3 text-[clamp(1.3rem,2.6vw,1.8rem)] leading-tight">
                {titulo}
              </h3>
              <p className="mt-3 max-w-md leading-relaxed text-ink">{texto}</p>
            </li>
          ))}
        </ul>

        {/* Puente narrativo: del diagnóstico a la venta */}
        <div data-diag-bridge className="mt-14 border-t border-line pt-8 lg:mt-16">
          <p className="type-telemetry text-cyan">3/3 fallas detectadas</p>
          <p className="type-display mt-3 max-w-2xl text-[clamp(1.3rem,2.4vw,1.8rem)] leading-snug text-ink-bright">
            Esto es exactamente lo que GX1 corrige — con un sistema, no con
            parches.
          </p>
        </div>
      </div>
    </section>
  );
}
