"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Kicker from "./Kicker";
import Magnetic from "./Magnetic";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const plataformas = ["TikTok", "Instagram", "Facebook", "YouTube"];

const embudo = [
  { id: "T-01", paso: "TikTok", detalle: "El contenido despierta interés" },
  { id: "T-02", paso: "Google", detalle: "Buscan la marca por su nombre" },
  { id: "T-03", paso: "caycer.ing", detalle: "Llegan al sitio y contactan" },
];

/* El hangar: única sección clara de la página — luz de día sobre el caso real.
   El embudo se enciende paso a paso con el scroll. */
export default function Hangar() {
  const scope = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(scope);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-hangar-head]", {
        autoAlpha: 0,
        y: 40,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: scope.current, start: "top 70%" },
      });

      gsap.fromTo(
        "[data-embudo-line]",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: "[data-embudo]",
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>("[data-embudo-step]").forEach((step, i) => {
        gsap.from(step, {
          autoAlpha: 0,
          x: 32,
          duration: 0.8,
          delay: i * 0.1,
          ease: "expo.out",
          scrollTrigger: { trigger: step, start: "top 78%" },
        });
      });

      // Chips de plataforma: encendido grupal del filo
      ScrollTrigger.create({
        trigger: "[data-plataformas]",
        start: "top 85%",
        onEnter: () => {
          scope.current
            ?.querySelectorAll("[data-plataformas] li")
            .forEach((chip) => chip.setAttribute("data-lit", "true"));
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={scope}
      className="relative -mt-[4vw] bg-hangar px-5 pb-[calc(6rem+4vw)] pt-[calc(6rem+4vw)] text-hangar-ink sm:px-8 lg:pb-[calc(9rem+4vw)] lg:pt-[calc(9rem+4vw)]"
      style={{
        /* Corte diagonal al ángulo del ala en ambos bordes; el margen
           negativo solapa con Secuencia para que no se vea el body */
        clipPath:
          "polygon(0 4vw, 100% 0, 100% calc(100% - 4vw), 0 100%)",
      }}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div data-hangar-head>
            <Kicker className="text-cyan-deep">Caso real · Registro 001</Kicker>
            <h2 className="type-display mt-4 text-[clamp(2.2rem,5vw,3.8rem)] text-hangar-ink">
              CAYCER Ingeniería y Metrología
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-hangar-ink-soft">
              Laboratorio de metrología y calibración acreditado ante la EMA, en
              Tlaquepaque. Un sector técnico y regulado donde la comunicación no
              admite improvisación.
            </p>
            <p className="mt-4 leading-relaxed text-hangar-ink-soft">
              Operamos su sistema de contenido multi-episodio con pipeline
              semanal activo, y documentamos cómo el contenido genera búsquedas
              de marca y tráfico directo a su sitio.
            </p>
            <ul
              data-plataformas
              className="mt-8 flex flex-wrap gap-2"
              aria-label="Plataformas activas"
            >
              {plataformas.map((p) => (
                <li
                  key={p}
                  className="material-metal-light material-lit-edge type-telemetry px-4 py-2.5 text-hangar-ink-soft"
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Embudo documentado: telemetría vertical */}
          <div data-embudo className="relative pl-8">
            <p className="type-telemetry mb-8 text-hangar-ink-soft">
              Embudo documentado
            </p>
            {/* Riel + línea que se traza */}
            <div aria-hidden className="absolute bottom-4 left-2 top-14 w-px bg-hangar-line">
              <div data-embudo-line className="absolute inset-0 bg-cyan-deep" />
            </div>
            <ol className="flex flex-col gap-10">
              {embudo.map(({ id, paso, detalle }) => (
                <li key={id} data-embudo-step className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-8 top-2 size-3 -translate-x-[5px] rotate-45 border border-cyan-deep bg-hangar"
                  />
                  <p className="type-telemetry text-cyan-deep">{id}</p>
                  <p className="type-display mt-1 text-3xl text-hangar-ink lg:text-4xl">
                    {paso}
                  </p>
                  <p className="mt-2 text-hangar-ink-soft">{detalle}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* CTA en el pico de confianza: justo después del caso real */}
        <div
          data-hangar-cta
          className="mt-16 flex flex-col items-start gap-6 border-t border-hangar-line pt-10 md:flex-row md:items-center md:justify-between lg:mt-20"
        >
          <p className="type-display max-w-xl text-[clamp(1.4rem,2.6vw,2rem)] leading-snug text-hangar-ink">
            ¿Quieres un sistema así en tu negocio?
          </p>
          <Magnetic>
            <a
              href={site.scheduleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wing btn-sweep inline-flex min-h-13 items-center justify-center bg-cyan px-8 text-base font-semibold text-void-deep"
            >
              Agenda tu diagnóstico sin costo
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
