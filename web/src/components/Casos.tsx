"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Kicker from "./Kicker";
import Magnetic from "./Magnetic";
import { casos } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

/* Casos: solo lo que ya es verdad. CAYCER (trabajo continuo) es el líder
   con su embudo documentado; los proyectos en curso van sin nombre hasta
   tener permiso escrito, y sin cifras que todavía no existen. */
export default function Casos() {
  const scope = useRef<HTMLElement>(null);
  const { lider, enCurso, confianza } = casos;

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(scope);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-casos-head]", {
        autoAlpha: 0,
        y: 40,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: scope.current, start: "top 72%" },
      });

      ScrollTrigger.create({
        trigger: "[data-caso-lider]",
        start: "top 76%",
        onEnter: () => {
          scope.current
            ?.querySelector("[data-caso-lider]")
            ?.setAttribute("data-lit", "true");
          scope.current
            ?.querySelectorAll("[data-plataformas] li")
            .forEach((chip) => chip.setAttribute("data-lit", "true"));
        },
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
          scrollTrigger: { trigger: step, start: "top 80%" },
        });
      });

      gsap.from("[data-caso-curso]", {
        autoAlpha: 0,
        y: 32,
        duration: 0.8,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-casos-curso]", start: "top 82%" },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={scope}
      id="casos"
      className="scene-cut-in bg-hangar px-5 pb-24 pt-[calc(6rem+4vw)] text-hangar-ink sm:px-8 lg:pb-36 lg:pt-[calc(9rem+4vw)]"
    >
      <div className="mx-auto max-w-[1400px]">
        <div data-casos-head className="max-w-3xl">
          <Kicker className="text-cyan-deep">Casos</Kicker>
          <h2 className="type-display mt-4 text-[clamp(2.2rem,5.5vw,4rem)] text-hangar-ink">
            Empresas que ya trabajan con GX1
          </h2>
        </div>

        {/* Caso líder: CAYCER */}
        <article
          data-caso-lider
          className="material-metal-light material-lit-edge mt-16 grid gap-12 px-7 py-10 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-14"
        >
          <div>
            <p className="type-telemetry text-cyan-deep">
              ● {lider.estado}&nbsp;·&nbsp;{lider.giro}
            </p>
            <h3 className="type-display mt-4 text-[clamp(1.9rem,4vw,3.2rem)] leading-tight text-hangar-ink">
              {lider.cliente}
            </h3>
            <p className="mt-6 text-lg leading-relaxed text-hangar-ink-soft">
              {lider.hace}
            </p>
            <ul
              data-plataformas
              className="mt-8 flex flex-wrap gap-2"
              aria-label="Plataformas activas"
            >
              {lider.plataformas.map((p) => (
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
              Lo que medimos: el embudo
            </p>
            <div aria-hidden className="absolute bottom-4 left-2 top-14 w-px bg-hangar-line">
              <div data-embudo-line className="absolute inset-0 bg-cyan-deep" />
            </div>
            <ol className="flex flex-col gap-10">
              {lider.embudo.map(({ id, paso, detalle }) => (
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
        </article>

        {/* Proyectos en curso: lenguaje silencioso */}
        <div data-casos-curso className="mt-14 grid gap-10 md:grid-cols-2 md:gap-14">
          {enCurso.map((c) => (
            <article key={c.cliente} data-caso-curso className="border-t border-hangar-line pt-6">
              <p className="type-telemetry text-hangar-ink-soft">● {c.estado}</p>
              <h3 className="type-display mt-3 text-[clamp(1.4rem,2.4vw,1.9rem)] leading-tight text-hangar-ink">
                {c.cliente}
              </h3>
              <p className="mt-3 max-w-md leading-relaxed text-hangar-ink-soft">
                {c.hace}
              </p>
            </article>
          ))}
        </div>

        {/* Franja de confianza: solo lo que ya es cierto */}
        <ul className="mt-14 flex flex-col gap-3 border-y border-hangar-line py-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-10">
          {confianza.map((t) => (
            <li
              key={t}
              className="type-telemetry flex items-center gap-3 text-hangar-ink"
            >
              <span aria-hidden className="inline-block size-1.5 rotate-45 bg-cyan-deep" />
              {t}
            </li>
          ))}
        </ul>

        {/* CTA en el pico de confianza */}
        <div className="mt-16 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between lg:mt-20">
          <p className="type-display max-w-xl text-[clamp(1.4rem,2.6vw,2rem)] leading-snug text-hangar-ink">
            ¿Quieres un sistema así en tu empresa?
          </p>
          <Magnetic>
            <Link
              href="/#contacto"
              className="btn-wing btn-sweep inline-flex min-h-13 items-center justify-center bg-cyan px-8 text-base font-semibold text-void-deep"
            >
              Cotiza tu proyecto
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
