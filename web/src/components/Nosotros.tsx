"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Kicker from "./Kicker";

gsap.registerPlugin(ScrollTrigger);

/* TODO(Gabriel): cuando tengas tu foto, súbela a public/ (p. ej.
   public/gabriel.jpg, vertical 4:5) y pon aquí su ruta. Mientras sea
   null, el bloque muestra el ala de GX1 y se ve completo igual. */
const FOTO_FUNDADOR: string | null = null;

const pilares = [
  {
    nombre: "Build",
    texto: "Construimos lo que tu negocio necesita, no un paquete genérico.",
  },
  {
    nombre: "Scale",
    texto: "Lo hacemos crecer con contenido, campañas y automatización.",
  },
  {
    nombre: "Evolve",
    texto: "Medimos cada mes y mejoramos lo que no funciona.",
  },
];

export default function Nosotros() {
  const scope = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(scope);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-nos-text] > *", {
        autoAlpha: 0,
        y: 36,
        duration: 0.9,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: scope.current, start: "top 72%" },
      });
      gsap.from("[data-fundador]", {
        autoAlpha: 0,
        y: 48,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-fundador]", start: "top 80%" },
      });
      ScrollTrigger.create({
        trigger: "[data-fundador]",
        start: "top 74%",
        onEnter: () =>
          scope.current
            ?.querySelector("[data-fundador]")
            ?.setAttribute("data-lit", "true"),
      });
      gsap.from("[data-pilar]", {
        autoAlpha: 0,
        y: 32,
        duration: 0.8,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-pilares]", start: "top 84%" },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={scope}
      id="nosotros"
      className="scene-cut-in bg-void px-5 pb-20 pt-[calc(6rem+4vw)] sm:px-8 lg:pb-28 lg:pt-[calc(9rem+4vw)]"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-20">
          <div data-nos-text>
            <Kicker>Sobre GX1</Kicker>
            <h2 className="type-display mt-4 text-[clamp(2.2rem,5vw,3.8rem)]">
              Una agencia que junta lo que casi siempre está separado
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink">
              En GX1 creemos que una empresa no debería necesitar un proveedor
              para su página, otro para sus redes y nadie que ordene sus
              procesos. Somos una agencia integral con base en Guadalajara.
              Unimos marca, video, desarrollo web y automatización con IA para
              que tu negocio se vea profesional, sea fácil de encontrar y
              atienda a cada cliente a tiempo.
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-bright">
              Usamos la IA para producir más rápido y entregar con constancia,
              y a las personas para decidir lo importante.
            </p>
          </div>

          {/* Quién está detrás */}
          <figure
            data-fundador
            className="material-metal-dark material-lit-edge self-start"
          >
            <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-void-deep">
              {FOTO_FUNDADOR ? (
                <Image
                  src={FOTO_FUNDADOR}
                  alt="Gabriel, fundador de GX1"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
              ) : (
                <Image
                  src="/gx1-wing.png"
                  alt=""
                  aria-hidden
                  width={196}
                  height={240}
                  className="h-auto w-2/5 opacity-90"
                />
              )}
            </div>
            <figcaption className="px-6 py-6 sm:px-8">
              <p className="type-telemetry text-cyan">Quién está detrás</p>
              <p className="type-display mt-3 text-2xl text-ink-bright">
                Gabriel, fundador de GX1
              </p>
              <p className="mt-3 leading-relaxed text-ink">
                Emprende desde muy joven, construyó su primer sitio web él solo
                y hoy dirige el contenido y las redes de empresas como CAYCER.
              </p>
            </figcaption>
          </figure>
        </div>

        {/* Lo que nos define: el lema, como sistema */}
        <div data-pilares className="mt-20 lg:mt-28">
          <p className="type-telemetry text-ink-dim">Lo que nos define</p>
          <ul className="mt-6 grid gap-8 border-t border-line pt-8 md:grid-cols-3 md:gap-10">
            {pilares.map((p) => (
              <li key={p.nombre} data-pilar>
                <p className="type-logo text-3xl text-ink-bright">{p.nombre}</p>
                <p className="mt-3 max-w-xs leading-relaxed text-ink">{p.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
