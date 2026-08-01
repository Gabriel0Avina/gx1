"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/site";
import Kicker from "./Kicker";
import Magnetic from "./Magnetic";
import Plexus from "./Plexus";
import WingMark from "./WingMark";

gsap.registerPlugin(ScrollTrigger);

/* Despegue: cierre "bookend" con el Hero — de vuelta al estudio claro
   del video, con el ala y el plexus como eco silencioso del reveal. */
export default function Despegue() {
  const scope = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(scope);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-cta] > *", {
        autoAlpha: 0,
        y: 48,
        duration: 1,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: { trigger: scope.current, start: "top 68%" },
      });
      gsap.from("[data-cta-wing]", {
        autoAlpha: 0,
        y: 90,
        rotate: 8,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: { trigger: scope.current, start: "top 65%" },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={scope}
      className="scene-cut-in isolate overflow-hidden bg-hangar px-5 pb-28 pt-[calc(7rem+4vw)] text-hangar-ink sm:px-8 lg:pb-44 lg:pt-[calc(11rem+4vw)]"
    >
      {/* Eco del estudio del video — segundo y último uso del plexus */}
      <Plexus
        variant="light"
        count={20}
        seed={3}
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full opacity-30"
      />

      <div
        data-cta-wing
        aria-hidden
        className="absolute right-[-12%] top-1/2 -z-10 w-[60vw] max-w-[640px] -translate-y-1/2 opacity-70"
      >
        <WingMark className="h-auto w-full" />
      </div>

      <div data-cta className="relative mx-auto max-w-[1400px]">
        <Kicker className="text-cyan-deep">Autorización de despegue</Kicker>
        <h2 className="type-display mt-6 max-w-4xl text-[clamp(2.6rem,7vw,5.5rem)] text-hangar-ink">
          Tu competencia ya se ve profesional en digital
        </h2>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-hangar-ink-soft">
          Empecemos con un diagnóstico de tu operación digital: qué tienes hoy,
          qué te falta y por dónde conviene arrancar.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Magnetic>
            <a
              href={site.scheduleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wing btn-sweep inline-flex min-h-14 w-full items-center justify-center bg-cyan px-10 text-lg font-semibold text-void-deep sm:w-auto"
            >
              Agenda tu diagnóstico sin costo
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 w-full items-center justify-center border border-hangar-ink/25 px-10 text-lg font-semibold text-hangar-ink transition-colors duration-200 hover:border-cyan-deep hover:text-cyan-deep sm:w-auto"
            >
              WhatsApp
            </a>
          </Magnetic>
        </div>
        <p className="type-telemetry mt-8 text-hangar-ink-soft">
          Sin compromiso&nbsp;·&nbsp;Sin contratos forzosos
        </p>

        {/* Firma de marca: el tagline del logo, en el idioma del cliente */}
        <p className="type-logo mt-16 text-sm text-hangar-ink-soft">
          Construye&nbsp;·&nbsp;Escala&nbsp;·&nbsp;Evoluciona
        </p>
      </div>
    </section>
  );
}
