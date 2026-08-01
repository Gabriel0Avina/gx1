"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { markBooted, shouldBoot } from "@/lib/boot";

/* Secuencia de arranque: telemetría que se enciende, contador y wipe diagonal.
   Renderiza null en SSR y solo aparece antes del primer paint (useLayoutEffect),
   así que sin JS o con reduced-motion nunca bloquea el contenido. */
export default function Preloader() {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!shouldBoot()) return;
    setActive(true);
  }, []);

  useLayoutEffect(() => {
    if (!active || !ref.current) return;

    const counter = { value: 0 };
    const counterEl = ref.current.querySelector("[data-boot='counter']");

    // Failsafe: si los rAF se pausan (pestaña oculta a media secuencia),
    // el overlay se retira solo — nunca puede quedarse tapando la página
    const failsafe = window.setTimeout(() => {
      markBooted();
      setActive(false);
    }, 4000);

    const tl = gsap.timeline({
      defaults: { ease: "expo.out" },
      onComplete: () => {
        window.clearTimeout(failsafe);
        markBooted();
        setActive(false);
      },
    });

    tl.from("[data-boot='row']", { autoAlpha: 0, y: 14, stagger: 0.14, duration: 0.5 })
      .to(
        counter,
        {
          value: 100,
          duration: 0.85,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counterEl)
              counterEl.textContent = String(Math.round(counter.value)).padStart(3, "0");
          },
        },
        0.25
      )
      .to(
        ref.current,
        {
          clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
          duration: 0.75,
          ease: "expo.inOut",
        },
        1.25
      );

    return () => {
      window.clearTimeout(failsafe);
      tl.kill();
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-0 z-50 flex flex-col justify-end bg-void-deep px-5 pb-10 sm:px-8"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <p data-boot="row" className="type-telemetry text-ink-dim">
          GX1 Flight System
        </p>
        <p data-boot="row" className="type-telemetry mt-2 text-ink-dim">
          Calibrando instrumentos…
        </p>
        <p data-boot="row" className="mt-6 flex items-baseline gap-2">
          <span
            data-boot="counter"
            className="type-display text-6xl text-ink-bright sm:text-7xl"
          >
            000
          </span>
          <span className="type-telemetry text-cyan">%</span>
        </p>
      </div>
    </div>
  );
}
