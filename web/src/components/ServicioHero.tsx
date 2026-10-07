"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import Magnetic from "./Magnetic";
import WingMark from "./WingMark";
import { etapas, type Servicio } from "@/lib/content";

/* Hero de página de servicio: escena clara (el estudio del video), sin
   video — el ala como eco. Breadcrumb, H1 con la keyword del servicio. */
export default function ServicioHero({ servicio: s }: { servicio: Servicio }) {
  const scope = useRef<HTMLElement>(null);
  const etapa = etapas.find((e) => e.id === s.etapa);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(scope);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from("[data-sh] > *", {
        autoAlpha: 0,
        y: 32,
        duration: 1,
        stagger: 0.09,
        delay: 0.1,
      }).from(
        "[data-sh-wing]",
        { autoAlpha: 0, y: 60, rotate: 6, duration: 1.6 },
        0
      );
      // Seguro: si los frames se congelan (pestaña tapada, render sin
      // pantalla), el contenido de arriba nunca debe quedar invisible
      const failsafe = window.setTimeout(() => tl.progress(1), 2500);
      return () => window.clearTimeout(failsafe);
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={scope}
      className="relative isolate overflow-hidden bg-hangar px-5 pb-[calc(5rem+4vw)] pt-32 text-hangar-ink sm:px-8 lg:pb-[calc(7rem+4vw)] lg:pt-40"
    >
      <div
        data-sh-wing
        aria-hidden
        className="absolute right-[-18%] top-[10%] -z-10 w-[70vw] max-w-[620px] opacity-50 sm:right-[-6%] lg:top-[6%]"
      >
        <WingMark className="h-auto w-full" />
      </div>

      <div data-sh className="relative mx-auto max-w-[1400px]">
        <nav aria-label="Ruta de navegación">
          <ol className="type-telemetry flex flex-wrap items-center gap-2 text-hangar-ink-soft">
            <li>
              <Link href="/" className="inline-flex min-h-11 items-center hover:text-cyan-deep">
                Inicio
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li>
              <Link
                href="/#servicios"
                className="inline-flex min-h-11 items-center hover:text-cyan-deep"
              >
                Servicios
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li aria-current="page" className="text-hangar-ink">
              {s.nombre}
            </li>
          </ol>
        </nav>

        <p className="type-telemetry mt-8 text-cyan-deep">
          {s.num}&nbsp;·&nbsp;{etapa?.nombre}&nbsp;·&nbsp;{s.nombre}
        </p>
        <h1 className="type-display mt-4 max-w-4xl text-[clamp(2.2rem,5.6vw,4.4rem)] text-hangar-ink">
          {s.seo.h1}
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-hangar-ink-soft">
          {s.intro}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Magnetic>
            <Link
              href="#contacto"
              className="btn-wing btn-sweep inline-flex min-h-13 w-full items-center justify-center bg-cyan px-8 text-base font-semibold text-void-deep sm:w-auto"
            >
              Cotiza este servicio
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/#servicios"
              className="inline-flex min-h-13 w-full items-center justify-center border border-hangar-ink/30 px-8 text-base font-semibold text-hangar-ink transition-colors duration-200 hover:border-cyan-deep hover:text-cyan-deep sm:w-auto"
            >
              Ver todos los servicios
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
