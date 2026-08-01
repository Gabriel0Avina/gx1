"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/site";
import { BOOT_HERO_DELAY, shouldBoot } from "@/lib/boot";
import Magnetic from "./Magnetic";
import HeroVideoBg from "./HeroVideoBg";

gsap.registerPlugin(ScrollTrigger);

/* Palabras enteras en nowrap para no partir a media palabra;
   cada caracter es animable. Presentacional: el h1 lleva aria-label. */
function Chars({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((ch, ci) => (
            <span key={ci} data-char className={`inline-block ${className}`}>
              {ch}
            </span>
          ))}
          {wi < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </>
  );
}

/* Hero invertido: el video (estudio blanco, ala ensamblándose) es el
   protagonista. La tipografía navy vive abajo-izquierda y deja el aire
   superior al video. El boot oscuro hace wipe hacia esta luz. */
export default function Hero() {
  const scope = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(scope);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const boot = shouldBoot() ? BOOT_HERO_DELAY : 0;
      const counter = { value: 0 };
      const counterEl = scope.current?.querySelector("[data-ign='counter']");

      const tl = gsap.timeline({ delay: boot, defaults: { ease: "expo.out" } });

      tl.to(counter, {
        value: 100,
        duration: 1.1,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterEl)
            counterEl.textContent = `SYS ${String(Math.round(counter.value)).padStart(3, "0")}%`;
        },
      })
        .from(
          "[data-char]",
          { yPercent: 120, duration: 0.9, stagger: 0.016 },
          0.4
        )
        .from(
          "[data-ign='fade']",
          { autoAlpha: 0, y: 24, duration: 0.9, stagger: 0.1 },
          1.0
        );

      // El video se queda atrás al hacer scroll: profundidad real
      gsap.to("[data-hero-video]", {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={scope}
      id="inicio"
      className="relative isolate flex min-h-svh flex-col justify-between overflow-hidden bg-hangar px-5 pb-[calc(4rem+3vw)] pt-24 sm:px-8"
      style={{
        /* Salida diagonal al ángulo del ala, hacia la cabina oscura */
        clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 3vw), 0 100%)",
      }}
    >
      {/* Video de marca al fondo — el protagonista */}
      <HeroVideoBg />

      {/* Telemetría superior */}
      <div className="relative mx-auto flex w-full max-w-[1400px] items-baseline gap-6 pb-10">
        <p
          data-ign="counter"
          className="type-telemetry whitespace-nowrap text-cyan-deep"
        >
          SYS 100%
        </p>
        <p
          data-ign="fade"
          className="type-logo text-[0.7rem] tracking-[0.16em] text-hangar-ink-soft sm:text-sm"
        >
          Agencia de marketing y automatización con IA
        </p>
      </div>

      {/* Bloque de texto: compacto, abajo-izquierda — el aire es del video */}
      <div className="relative mx-auto w-full max-w-[1400px]">
        <h1
          aria-label="Atrae más clientes con marketing y automatización impulsados por IA"
          className="type-display max-w-3xl text-[clamp(2.4rem,6.5vw,4.5rem)] text-hangar-ink"
        >
          <span aria-hidden>
            <span className="block overflow-hidden">
              <Chars text="Atrae más clientes" />
            </span>
            <span className="type-condensed block overflow-hidden text-hangar-ink-soft">
              <Chars text="con marketing y automatización" />
            </span>
            <span className="block overflow-hidden">
              <Chars text="impulsados por" />
              <span>&nbsp;</span>
              <Chars text="IA" className="text-cyan-deep" />
            </span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p
            data-ign="fade"
            className="max-w-xl leading-relaxed text-hangar-ink-soft"
          >
            GX1 es la agencia de marketing en Guadalajara que conecta web,
            contenido, video y automatización bajo un solo sistema y un solo
            aliado, y lo ejecuta cada semana. Para negocios que no tienen
            tiempo de hacerlo todo.
          </p>
          <div data-ign="fade" className="flex flex-col gap-3 sm:flex-row">
            <Magnetic>
              <a
                href={site.scheduleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wing btn-sweep inline-flex min-h-13 w-full items-center justify-center bg-cyan px-8 text-base font-semibold text-void-deep sm:w-auto"
              >
                Agenda una llamada
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-13 w-full items-center justify-center border border-hangar-ink/30 px-8 text-base font-semibold text-hangar-ink transition-colors duration-200 hover:border-cyan-deep hover:text-cyan-deep sm:w-auto"
              >
                WhatsApp
              </a>
            </Magnetic>
          </div>
        </div>

        <p data-ign="fade" className="type-telemetry mt-8 text-hangar-ink-soft">
          Diagnóstico inicial sin costo&nbsp;·&nbsp;Sin compromiso
        </p>
      </div>
    </section>
  );
}
