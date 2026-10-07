"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Kicker from "./Kicker";
import Plexus from "./Plexus";
import { etapas, servicios } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

const nombreEtapa = Object.fromEntries(etapas.map((e) => [e.id, e.nombre]));

/* Peso visual por posición: 01 es el líder (panel de metal, alto doble,
   con su lista de entregables); 02–05 en lenguaje silencioso. Asimetría
   deliberada — ni grilla simétrica ni filas clonadas. */
const layout = [
  "material-metal-light material-lit-edge px-7 py-9 md:col-span-3 md:row-span-2 lg:px-9 lg:py-11",
  "border-t border-hangar-line pt-6 md:col-span-3",
  "border-t border-hangar-line pt-6 md:col-span-3",
  "border-t border-hangar-line pt-6 md:col-span-3",
  "border-t border-hangar-line pt-6 md:col-span-3",
];

export default function Servicios() {
  const scope = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(scope);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-srv-head]", {
        autoAlpha: 0,
        y: 40,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: scope.current, start: "top 75%" },
      });

      gsap.utils.toArray<HTMLElement>("[data-srv]").forEach((item, i) => {
        gsap.from(item, {
          autoAlpha: 0,
          y: i === 0 ? 60 : 36,
          duration: i === 0 ? 1.1 : 0.8,
          delay: i === 0 ? 0 : (i - 1) * 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: item, start: "top 86%" },
        });
      });

      ScrollTrigger.create({
        trigger: "[data-srv-lider]",
        start: "top 78%",
        onEnter: () =>
          scope.current
            ?.querySelector("[data-srv-lider]")
            ?.setAttribute("data-lit", "true"),
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={scope}
      id="servicios"
      className="scene-cut-in isolate overflow-hidden bg-hangar px-5 pb-24 pt-[calc(6rem+4vw)] text-hangar-ink sm:px-8 lg:pb-36 lg:pt-[calc(9rem+4vw)]"
    >
      {/* Eco del estudio del video: puntos conectados, muy sutiles */}
      <Plexus
        variant="light"
        count={16}
        seed={2}
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-40"
      />

      <div className="mx-auto max-w-[1400px]">
        <div data-srv-head className="max-w-3xl">
          <Kicker className="text-cyan-deep">Servicios</Kicker>
          <h2 className="type-display mt-4 text-[clamp(2.2rem,5.5vw,4rem)] text-hangar-ink">
            Cinco servicios que funcionan solos y se conectan entre sí
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-hangar-ink-soft">
            Empieza por el que más necesitas hoy y suma los demás cuando lo
            necesites. Todos los lleva el mismo equipo.
          </p>
        </div>

        <ul className="mt-16 grid gap-x-10 gap-y-10 md:grid-cols-6">
          {servicios.map((s, i) => {
            const lider = i === 0;
            return (
              <li
                key={s.slug}
                data-srv
                {...(lider ? { "data-srv-lider": "" } : {})}
                className={`group relative flex flex-col ${layout[i]}`}
              >
                <p className="type-telemetry text-cyan-deep">
                  {s.num}&nbsp;·&nbsp;{nombreEtapa[s.etapa]}
                </p>
                <h3
                  className={`type-display mt-4 leading-tight text-hangar-ink ${
                    lider
                      ? "text-[clamp(1.9rem,3.4vw,2.8rem)]"
                      : "text-[clamp(1.4rem,2.4vw,1.9rem)]"
                  }`}
                >
                  {/* Enlace estirado: toda la tarjeta lleva a la página */}
                  <Link
                    href={`/servicios/${s.slug}`}
                    className="after:absolute after:inset-0 after:content-['']"
                  >
                    {s.nombre}
                  </Link>
                </h3>
                <p className="mt-3 max-w-md leading-relaxed text-hangar-ink-soft">
                  {s.tarjeta}
                </p>

                {lider && (
                  <ul className="mt-6 flex flex-col gap-2.5">
                    {s.incluye.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 leading-snug text-hangar-ink"
                      >
                        <span
                          aria-hidden
                          className="mt-2 inline-block size-1.5 shrink-0 rotate-45 bg-cyan-deep"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                <p className="mt-4 text-sm leading-relaxed text-hangar-ink-soft">
                  <span className="font-semibold text-hangar-ink">Ideal para: </span>
                  {s.idealPara}
                </p>
                <span
                  aria-hidden
                  className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-cyan-deep"
                >
                  Ver servicio
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
