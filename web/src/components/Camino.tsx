"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Kicker from "./Kicker";
import { etapas, servicios } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

/* Crescendo: cada etapa crece respecto a la anterior — el camino va de
   verse profesional a vender. La última (Vende) es el líder: panel de
   metal cuyo filo se enciende al entrar. */
const escala = [
  "text-[clamp(2.4rem,5vw,3.6rem)]",
  "text-[clamp(2.8rem,6vw,4.4rem)]",
  "text-[clamp(3.2rem,7.2vw,5.5rem)]",
];

export default function Camino() {
  const scope = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(scope);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-camino-head]", {
        autoAlpha: 0,
        y: 40,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: scope.current, start: "top 75%" },
      });

      gsap.utils.toArray<HTMLElement>("[data-etapa]").forEach((row, i) => {
        gsap.from(row, {
          autoAlpha: 0,
          y: 40 + i * 12,
          duration: 0.9 + i * 0.1,
          ease: "expo.out",
          scrollTrigger: { trigger: row, start: "top 82%" },
        });
      });

      ScrollTrigger.create({
        trigger: "[data-etapa-lider]",
        start: "top 72%",
        onEnter: () =>
          scope.current
            ?.querySelector("[data-etapa-lider]")
            ?.setAttribute("data-lit", "true"),
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={scope} className="bg-void px-5 py-24 sm:px-8 lg:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div data-camino-head className="max-w-3xl">
          <Kicker>El camino</Kicker>
          <h2 className="type-display mt-4 text-[clamp(2.2rem,5.5vw,4rem)]">
            Un solo camino, tres etapas
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink">
            Cada servicio de GX1 resuelve una etapa. Juntos llevan a tu empresa
            de verse profesional a vender sin que se te escape ningún cliente.
          </p>
        </div>

        <ol className="mt-16 flex flex-col gap-6 lg:gap-8">
          {etapas.map((etapa, i) => {
            const lider = i === etapas.length - 1;
            const suyos = servicios.filter((s) => s.etapa === etapa.id);
            return (
              <li
                key={etapa.id}
                data-etapa
                {...(lider ? { "data-etapa-lider": "" } : {})}
                className={`grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-10 ${
                  lider
                    ? "material-metal-dark material-lit-edge px-7 py-10 lg:px-10 lg:py-14"
                    : "border-t border-line pt-8"
                }`}
              >
                <div>
                  <p className={`type-telemetry ${lider ? "text-cyan" : "text-ink-dim"}`}>
                    Etapa {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className={`type-display mt-3 leading-none ${escala[i]}`}>
                    {etapa.nombre}
                  </h3>
                </div>

                <div className="md:pt-6">
                  <p className="text-xl font-medium leading-snug text-ink-bright">
                    {etapa.resuelve}
                  </p>
                  <p className="mt-3 max-w-lg leading-relaxed text-ink">
                    <span className="text-ink-dim">Si hoy: </span>
                    {etapa.problema}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                    {suyos.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/servicios/${s.slug}`}
                          className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-cyan transition-colors duration-200 hover:text-ink-bright"
                        >
                          <span className="type-telemetry text-ink-dim">{s.num}</span>
                          {s.nombre}
                          <span
                            aria-hidden
                            className="transition-transform duration-200 group-hover:translate-x-1"
                          >
                            →
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
