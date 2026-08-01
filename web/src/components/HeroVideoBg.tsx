"use client";

import { useLayoutEffect, useRef } from "react";

/* Video de fondo del hero: full-bleed, en loop, silencioso — el protagonista.
   El velo es CLARO y mínimo (el video es un estudio blanco): solo asegura
   contraste del texto navy en la zona izquierda y el piso de los CTAs.
   Se pausa fuera de viewport y con pestaña oculta; con reduced-motion
   queda el póster estático. */
export default function HeroVideoBg() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let intersecting = false;
    const sync = () => {
      if (intersecting && !document.hidden) {
        video.play().catch(() => {
          /* autoplay bloqueado: queda el póster */
        });
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        intersecting = entry.isIntersecting;
        sync();
      },
      { threshold: 0.1 }
    );
    observer.observe(video);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <div data-hero-video aria-hidden className="absolute inset-0">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="auto"
        poster="/gx1-reveal-poster.jpg"
        className="h-full w-full object-cover"
        style={{ objectPosition: "42% center" }}
      >
        <source src="/gx1-reveal.mp4" type="video/mp4" />
      </video>
      {/* Velo claro: asegura AA del texto navy sin apagar el video */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(97deg, oklch(0.96 0.006 240 / 0.85) 0%, oklch(0.96 0.006 240 / 0.4) 34%, transparent 58%)",
        }}
      />
      {/* Piso claro para la zona de CTAs */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/5"
        style={{
          background:
            "linear-gradient(to top, oklch(0.97 0.005 240 / 0.88), transparent)",
        }}
      />
    </div>
  );
}
