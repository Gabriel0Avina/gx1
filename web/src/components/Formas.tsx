"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Kicker from "./Kicker";
import { formas, type Forma } from "@/lib/content";
import { elegirInteres } from "@/lib/interes";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  cutIn?: boolean;
  /* En una página de servicio, su forma de contratar pasa a ser la líder */
  enfoque?: Forma;
  titulo?: string;
};

/* Formas de trabajar: sin precios — se cotiza por alcance. Una líder en
   panel de metal (por defecto el Paquete integral), las otras dos en
   lenguaje silencioso. */
export default function Formas({
  cutIn = true,
  enfoque,
  titulo = "Tres formas de trabajar con GX1",
}: Props) {
  const scope = useRef<HTMLElement>(null);
  const liderId = enfoque ?? "integral";
  const lider = formas.find((f) => f.id === liderId) ?? formas[0];
  const resto = formas.filter((f) => f.id !== lider.id);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(scope);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-formas-head]", {
        autoAlpha: 0,
        y: 40,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: scope.current, start: "top 75%" },
      });
      gsap.from("[data-forma]", {
        autoAlpha: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-formas-list]", start: "top 80%" },
      });
      ScrollTrigger.create({
        trigger: "[data-forma-lider]",
        start: "top 76%",
        onEnter: () =>
          scope.current
            ?.querySelector("[data-forma-lider]")
            ?.setAttribute("data-lit", "true"),
      });
    });

    return () => mm.revert();
  }, []);

  const filas = (f: (typeof formas)[number], tinta: string) => (
    <dl className="mt-5 flex flex-col gap-4">
      {[
        ["Para", f.para],
        ["Cómo funciona", f.como],
        ["Qué recibes", f.recibes],
      ].map(([k, v]) => (
        <div key={k}>
          <dt className="type-telemetry text-ink-dim">{k}</dt>
          <dd className={`mt-1 leading-relaxed ${tinta}`}>{v}</dd>
        </div>
      ))}
    </dl>
  );

  return (
    <section
      ref={scope}
      className={`bg-void px-5 pb-24 sm:px-8 lg:pb-36 ${
        cutIn
          ? "scene-cut-in pt-[calc(6rem+4vw)] lg:pt-[calc(9rem+4vw)]"
          : "pt-24 lg:pt-36"
      }`}
    >
      <div className="mx-auto max-w-[1400px]">
        <div data-formas-head className="max-w-3xl">
          <Kicker>Formas de trabajar</Kicker>
          <h2 className="type-display mt-4 text-[clamp(2.2rem,5.5vw,4rem)]">
            {titulo}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink">
            No publicamos precios: después de una llamada de diagnóstico te
            enviamos una propuesta según el alcance de tu proyecto.
          </p>
        </div>

        <div
          data-formas-list
          className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-14"
        >
          {/* Líder */}
          <article
            data-forma
            data-forma-lider
            className="material-metal-dark material-lit-edge flex flex-col px-7 py-9 lg:px-10 lg:py-12"
          >
            <p className="type-telemetry text-cyan">
              {lider.id === "integral" ? "La que más conviene" : "La forma de este servicio"}
            </p>
            <h3 className="type-display mt-4 text-[clamp(2rem,4vw,3rem)] leading-tight">
              {lider.nombre}
            </h3>
            {filas(lider, "text-ink-bright")}
            <Link
              href="/#contacto"
              onClick={() =>
                lider.id === "integral" && elegirInteres("Paquete integral")
              }
              className="btn-wing btn-sweep mt-10 inline-flex min-h-13 items-center justify-center self-start bg-cyan px-8 text-base font-semibold text-void-deep"
            >
              Cotiza tu proyecto
            </Link>
          </article>

          {/* Secundarias: lenguaje silencioso */}
          <div className="flex flex-col gap-10">
            {resto.map((f) => (
              <article key={f.id} data-forma className="border-t border-line pt-6">
                <h3 className="type-display text-[clamp(1.5rem,2.6vw,2rem)] leading-tight">
                  {f.nombre}
                </h3>
                {filas(f, "text-ink")}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
