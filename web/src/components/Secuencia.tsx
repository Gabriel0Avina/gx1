"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Kicker from "./Kicker";
import { pasos } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

/* Secuencia de vuelo: la línea de progreso se traza con el scroll y los
   nodos metálicos (eco de los puntos del plexus) se encienden cuando la
   línea los alcanza. */
export default function Secuencia() {
  const scope = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(scope);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-seq-head]", {
        autoAlpha: 0,
        y: 40,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: scope.current, start: "top 75%" },
      });

      const nodes = gsap.utils.toArray<HTMLElement>("[data-seq-node]");

      gsap.fromTo(
        "[data-seq-line]",
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left",
          ease: "none",
          scrollTrigger: {
            trigger: "[data-seq-steps]",
            start: "top 70%",
            end: "bottom 55%",
            scrub: 0.6,
            onUpdate: (self) => {
              // La línea enciende cada nodo al alcanzarlo
              nodes.forEach((node, i) => {
                const threshold = i / (nodes.length - 1 || 1);
                node.setAttribute(
                  "data-lit",
                  self.progress >= threshold ? "true" : "false"
                );
              });
            },
          },
        }
      );

      gsap.utils.toArray<HTMLElement>("[data-seq-step]").forEach((step, i) => {
        gsap.from(step, {
          autoAlpha: 0,
          y: 40,
          duration: 0.9,
          delay: i * 0.12,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-seq-steps]", start: "top 72%" },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={scope}
      className="bg-void px-5 py-24 sm:px-8 lg:py-36"
    >
      <div className="mx-auto max-w-[1400px]">
        <div data-seq-head className="max-w-3xl">
          <Kicker>Secuencia de vuelo</Kicker>
          <h2 className="type-display mt-4 text-[clamp(2.2rem,5.5vw,4rem)]">
            Cómo trabajamos
          </h2>
        </div>

        {/* Línea de progreso con nodos metálicos alineados al grid de pasos */}
        <div className="relative mt-16 hidden h-px w-full grid-cols-3 bg-line/50 md:grid">
          <div
            data-seq-line
            className="absolute inset-0 bg-cyan"
            style={{ boxShadow: "0 0 10px oklch(0.85 0.14 200 / 0.5)" }}
          />
          {pasos.map(({ id }) => (
            <span
              key={id}
              aria-hidden
              data-seq-node
              className="material-metal-dark material-lit-edge relative z-10 flex size-6 -translate-y-1/2 items-center justify-center justify-self-start rounded-full"
            >
              <span className="size-1.5 rounded-full bg-cyan" />
            </span>
          ))}
        </div>

        <ol data-seq-steps className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
          {pasos.map(({ id, titulo, texto }) => (
            <li key={id} data-seq-step>
              <p className="type-telemetry text-cyan">{id}</p>
              <h3 className="type-display mt-4 text-2xl leading-tight lg:text-3xl">
                {titulo}
              </h3>
              <p className="mt-4 leading-relaxed text-ink">{texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
