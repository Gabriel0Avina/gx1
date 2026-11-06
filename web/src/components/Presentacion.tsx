"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Kicker from "./Kicker";
import VideoPresentacion from "./VideoPresentacion";
import { servicios } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

/* GX1 en 45 segundos: el anuncio vertical como tercera escena del inicio
   (después del hero y el marquee). Oscura y continua con Marquee y Camino. */
export default function Presentacion() {
  const scope = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(scope);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-pres-text] > *", {
        autoAlpha: 0,
        y: 36,
        duration: 0.9,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: scope.current, start: "top 72%" },
      });
      gsap.from("[data-pres-video]", {
        autoAlpha: 0,
        y: 48,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-pres-video]", start: "top 82%" },
      });
      ScrollTrigger.create({
        trigger: "[data-pres-video]",
        start: "top 74%",
        onEnter: () =>
          scope.current
            ?.querySelector("[data-pres-video]")
            ?.setAttribute("data-lit", "true"),
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={scope}
      id="video"
      aria-labelledby="video-titulo"
      className="bg-void px-5 py-20 sm:px-8 lg:py-28"
    >
      {/* En celular: título → video → servicios. En escritorio: texto a la
          izquierda y el video a la derecha ocupando las dos filas. */}
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-20 lg:gap-y-0">
        <div data-pres-text className="lg:col-start-1 lg:row-start-1 lg:self-end">
          <Kicker>GX1 en 45 segundos</Kicker>
          <h2
            id="video-titulo"
            className="type-display mt-4 text-[clamp(2.2rem,5vw,3.8rem)]"
          >
            Así trabaja una agencia integral con IA en Guadalajara
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink">
            Contenido para redes, campañas, sitios web, software a la medida y
            automatización con IA: todo lo digital de tu negocio en un solo
            equipo, explicado en menos de un minuto.
          </p>
        </div>

        <figure
          data-pres-video
          className="material-metal-dark material-lit-edge mx-auto w-full max-w-[440px] px-5 py-6 sm:px-8 sm:py-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center"
        >
          <VideoPresentacion />
          <figcaption className="sr-only">
            Video de presentación de GX1, agencia integral con IA en
            Guadalajara.
          </figcaption>
        </figure>

        <div data-pres-text className="lg:col-start-1 lg:row-start-2 lg:pt-8">
          <ul className="max-w-xl border-t border-line">
            {servicios.map((s) => (
              <li key={s.slug} className="border-b border-line">
                <Link
                  href={`/servicios/${s.slug}`}
                  className="group flex min-h-12 items-center gap-4 py-3 text-ink-bright transition-colors hover:text-cyan"
                >
                  <span className="type-telemetry text-cyan">{s.num}</span>
                  <span className="flex-1">{s.nombre}</span>
                  <span aria-hidden className="text-ink-dim group-hover:text-cyan">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/#contacto"
            className="btn-wing btn-sweep mt-10 inline-flex min-h-13 items-center justify-center bg-cyan px-8 text-base font-semibold text-void-deep"
          >
            Cotiza tu proyecto
          </Link>
        </div>
      </div>
    </section>
  );
}
