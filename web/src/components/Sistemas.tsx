"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Kicker from "./Kicker";
import Plexus from "./Plexus";
import { servicios as sistemas } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

/* Peso visual por índice: SYS.01 panel grande, SYS.02-03 paneles medianos,
   SYS.04 sin panel (solo separador) — asimetría deliberada, no grilla 2×2 */
const layout = [
  {
    panel: true,
    cls: "material-metal-light material-lit-edge px-7 py-9 md:col-span-3 md:row-span-2 lg:px-9 lg:py-11",
    title: "text-[clamp(1.8rem,3.2vw,2.6rem)]",
  },
  {
    panel: true,
    cls: "material-metal-light material-lit-edge px-7 py-7 md:col-span-3",
    title: "text-[clamp(1.4rem,2.4vw,1.9rem)]",
  },
  {
    panel: true,
    cls: "material-metal-light material-lit-edge px-7 py-7 md:col-span-2",
    title: "text-[clamp(1.4rem,2.4vw,1.9rem)]",
  },
  {
    panel: false,
    cls: "border-t border-hangar-line pt-6 md:col-span-1 md:border-l md:border-t-0 md:pl-6 md:pt-0",
    title: "text-[clamp(1.3rem,2vw,1.6rem)]",
  },
];

/* Sistemas: escena clara — los 4 servicios como paneles de metal pulido
   de tamaños variados sobre el estudio del video, con plexus de fondo. */
export default function Sistemas() {
  const scope = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(scope);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-sys-head]", {
        autoAlpha: 0,
        y: 40,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: scope.current, start: "top 75%" },
      });

      gsap.utils.toArray<HTMLElement>("[data-sys-row]").forEach((row, i) => {
        gsap.from(row, {
          autoAlpha: 0,
          y: 56,
          duration: 1,
          delay: i * 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: row, start: "top 85%" },
        });
        if (row.classList.contains("material-lit-edge")) {
          ScrollTrigger.create({
            trigger: row,
            start: "top 78%",
            onEnter: () => row.setAttribute("data-lit", "true"),
          });
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={scope}
      className="scene-cut-in relative isolate overflow-hidden bg-hangar px-5 pb-24 pt-[calc(6rem+4vw)] text-hangar-ink sm:px-8 lg:pb-36 lg:pt-[calc(9rem+4vw)]"
    >
      {/* Eco del estudio del video: puntos conectados, muy sutiles */}
      <Plexus
        variant="light"
        count={16}
        seed={2}
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-40"
      />

      <div className="mx-auto max-w-[1400px]">
        <div data-sys-head className="max-w-3xl">
          <Kicker className="text-cyan-deep">Sistemas</Kicker>
          <h2 className="type-display mt-4 text-[clamp(2.2rem,5.5vw,4rem)] text-hangar-ink">
            Una sola operación digital, no piezas sueltas
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-hangar-ink-soft">
            GX1 es una operación digital completa: no vendemos servicios
            aislados, conectamos web, contenido, video y automatización bajo un
            mismo sistema con reglas de calidad.
          </p>
        </div>

        <ul className="mt-16 grid gap-5 md:grid-cols-6 md:gap-6">
          {sistemas.map(({ id, titulo, texto }, i) => (
            <li key={id} data-sys-row className={layout[i].cls}>
              <p className="type-telemetry text-cyan-deep">{id}</p>
              <h3
                className={`type-display mt-4 leading-tight text-hangar-ink ${layout[i].title}`}
              >
                {titulo}
              </h3>
              <p className="mt-4 max-w-sm leading-relaxed text-hangar-ink-soft">
                {texto}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
