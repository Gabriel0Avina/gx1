"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Kicker from "./Kicker";
import { marcaPersonal } from "@/lib/content";
import { elegirInteres } from "@/lib/interes";

gsap.registerPlugin(ScrollTrigger);

/* Kit de marca de muestra: lo que recibe el cliente, ilustrado con la
   paleta de GX1. El color de cada muestra es exactamente su código. */
const muestras = [
  { nombre: "Azul profundo", hex: "#0B1524", tinta: "text-ink-bright" },
  { nombre: "Cian", hex: "#22D3EE", tinta: "text-void-deep" },
  { nombre: "Plata", hex: "#AEB9C6", tinta: "text-void-deep" },
  { nombre: "Blanco", hex: "#F4F7FA", tinta: "text-void-deep" },
];

export default function MarcaPersonal({ cutIn = true }: { cutIn?: boolean }) {
  const scope = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(scope);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-mp-text] > *", {
        autoAlpha: 0,
        y: 36,
        duration: 0.9,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: scope.current, start: "top 72%" },
      });
      // El kit se "arma": las muestras caen en cascada
      gsap.from("[data-mp-swatch]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-mp-kit]", start: "top 78%" },
      });
      ScrollTrigger.create({
        trigger: "[data-mp-kit]",
        start: "top 74%",
        onEnter: () =>
          scope.current
            ?.querySelector("[data-mp-kit]")
            ?.setAttribute("data-lit", "true"),
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={scope}
      id="marca-personal"
      className={`bg-void px-5 pb-24 sm:px-8 lg:pb-36 ${
        cutIn
          ? "scene-cut-in pt-[calc(6rem+4vw)] lg:pt-[calc(9rem+4vw)]"
          : "pt-24 lg:pt-36"
      }`}
    >
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <div data-mp-text>
          <Kicker>Marca personal</Kicker>
          <h2 className="type-display mt-4 text-[clamp(2rem,4.6vw,3.4rem)]">
            {marcaPersonal.titulo}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink">
            {marcaPersonal.texto}
          </p>
          <p className="type-telemetry mt-10 text-ink-dim">Qué recibes</p>
          <ul className="mt-4 flex flex-col gap-3">
            {marcaPersonal.recibes.map((item) => (
              <li key={item} className="flex gap-3 leading-snug text-ink-bright">
                <span
                  aria-hidden
                  className="mt-2 inline-block size-1.5 shrink-0 rotate-45 bg-cyan"
                />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-xl border-t border-line pt-6 leading-relaxed text-ink">
            <span className="font-semibold text-ink-bright">Cómo se continúa: </span>
            {marcaPersonal.continua}
          </p>
          <Link
            href="/#contacto"
            onClick={() => elegirInteres("Marca e identidad")}
            className="btn-wing btn-sweep mt-10 inline-flex min-h-13 items-center justify-center bg-cyan px-8 text-base font-semibold text-void-deep"
          >
            Cotiza tu marca personal
          </Link>
        </div>

        {/* Kit de marca de muestra */}
        <figure
          data-mp-kit
          className="material-metal-dark material-lit-edge self-start p-6 sm:p-8"
        >
          <figcaption className="type-telemetry text-ink-dim">
            Kit de marca · muestra
          </figcaption>

          <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {muestras.map((m) => (
              <li key={m.hex} data-mp-swatch className="flex flex-col">
                <span
                  className={`flex aspect-square items-end p-2.5 ${m.tinta}`}
                  style={{ backgroundColor: m.hex, boxShadow: "inset 0 0 0 1px oklch(1 0 0 / 0.08)" }}
                >
                  <span className="type-telemetry text-[0.62rem]">{m.hex}</span>
                </span>
                <span className="mt-2 text-sm text-ink">{m.nombre}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
            {/* Muestra tipográfica */}
            <div className="border border-line p-5">
              <p className="type-display text-5xl text-ink-bright">Aa</p>
              <p className="mt-3 text-sm text-ink">
                <span className="text-ink-bright">Jost</span> · títulos
              </p>
              <p className="text-sm text-ink">
                <span className="text-ink-bright">Archivo</span> · textos
              </p>
            </div>

            {/* Mini plantilla para redes */}
            <div
              aria-hidden
              className="relative flex aspect-[4/5] flex-col justify-end overflow-hidden p-4"
              style={{ backgroundColor: "#0B1524" }}
            >
              <span className="absolute left-4 top-4 h-0.5 w-8 bg-cyan" />
              <span className="type-display text-lg leading-tight text-ink-bright">
                Tu marca, lista para publicar
              </span>
              <span className="type-telemetry mt-2 text-[0.6rem] text-cyan">
                @tumarca
              </span>
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
