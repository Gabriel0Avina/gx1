"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Kicker from "./Kicker";
import Magnetic from "./Magnetic";
import { casos } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

/* Casos: solo lo que ya es verdad. CAYCER (trabajo continuo) es el líder
   con su embudo documentado; ECOPESTS y RP muestran cómo trabajamos y
   capturas reales de lo construido, sin cifras que todavía no existen. */
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

        {/* ECOPESTS y RP: cómo trabajamos + capturas reales de su sitio y sistema */}
        <div data-casos-curso className="mt-20 flex flex-col gap-20 lg:gap-28">
          {enCurso.map((c, i) => (
            <article
              key={c.cliente}
              data-caso-curso
              className="grid gap-10 border-t border-hangar-line pt-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14"
            >
              <div className={i % 2 ? "lg:order-2" : undefined}>
                <p className="type-telemetry text-cyan-deep">● {c.estado}</p>
                <h3 className="type-display mt-3 text-[clamp(1.8rem,3.4vw,2.8rem)] leading-tight text-hangar-ink">
                  {c.cliente}
                </h3>
                <p className="type-telemetry mt-2 text-hangar-ink-soft">{c.giro}</p>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-hangar-ink-soft">
                  {c.hace}
                </p>
                <p className="type-telemetry mt-8 text-hangar-ink-soft">Cómo trabajamos</p>
                <ol className="mt-4 border-t border-hangar-line">
                  {c.pasos.map((p, k) => (
                    <li
                      key={p}
                      className="flex gap-4 border-b border-hangar-line py-3 leading-snug text-hangar-ink"
                    >
                      <span className="type-telemetry pt-0.5 text-cyan-deep">
                        {String(k + 1).padStart(2, "0")}
                      </span>
                      {p}
                    </li>
                  ))}
                </ol>
                {c.sitio && (
                  <a
                    href={c.sitio.url}
                    target="_blank"
                    rel="noopener"
                    className="mt-8 inline-flex min-h-12 items-center gap-2 border border-hangar-ink px-6 font-semibold text-hangar-ink transition-colors hover:bg-hangar-ink hover:text-hangar"
                  >
                    Ver {c.sitio.texto} <span aria-hidden>↗</span>
                  </a>
                )}
              </div>

              {/* Galería: una captura principal y dos de apoyo */}
              <div className={i % 2 ? "lg:order-1" : undefined}>
                <div className="material-metal-light relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={c.imagenes[0].src}
                    alt={c.imagenes[0].alt}
                    fill
                    sizes="(min-width: 1024px) 52vw, 92vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {c.imagenes.slice(1).map((img) => (
                    <div
                      key={img.src}
                      className={`material-metal-light relative aspect-[16/10] overflow-hidden ${img.vertical ? "bg-void" : ""}`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(min-width: 1024px) 26vw, 46vw"
                        className={img.vertical ? "object-contain object-top" : "object-cover object-top"}
                      />
                    </div>
                  ))}
                </div>
              </div>
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
