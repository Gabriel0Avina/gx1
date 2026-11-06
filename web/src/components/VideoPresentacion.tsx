"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { videoPresentacion as v } from "@/lib/video";

/* Video vertical de presentación. Sin sonido se reproduce solo mientras está
   en pantalla (los subtítulos van quemados, se entiende igual); "Ver con
   sonido" lo reinicia con audio. Con prefers-reduced-motion no hay autoplay:
   queda el póster con un botón de reproducir. */
const MQ_REDUCIDO = "(prefers-reduced-motion: reduce)";
const suscribirReducido = (cb: () => void) => {
  const mq = window.matchMedia(MQ_REDUCIDO);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export default function VideoPresentacion() {
  const ref = useRef<HTMLVideoElement>(null);
  const [sonido, setSonido] = useState(false);
  const [pausado, setPausado] = useState(true);
  // pausa elegida por el usuario: en estado para el render, en ref para el observador
  const [manual, setManual] = useState(false);
  const pausaManual = useRef(false);
  const reducido = useSyncExternalStore(
    suscribirReducido,
    () => window.matchMedia(MQ_REDUCIDO).matches,
    () => false
  );

  const marcarManual = (valor: boolean) => {
    pausaManual.current = valor;
    setManual(valor);
  };

  // Autoplay silencioso solo mientras el video está a la vista
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!reducido && !pausaManual.current) video.play().catch(() => {});
        } else if (!video.paused) {
          video.pause();
        }
      },
      { threshold: 0.45 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reducido]);

  const verConSonido = () => {
    const video = ref.current;
    if (!video) return;
    marcarManual(false);
    video.muted = false;
    video.currentTime = 0;
    setSonido(true);
    video.play().catch(() => {});
  };

  const alternarSonido = () => {
    const video = ref.current;
    if (!video) return;
    video.muted = !video.muted;
    setSonido(!video.muted);
  };

  const alternarPausa = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      marcarManual(false);
      video.play().catch(() => {});
    } else {
      marcarManual(true);
      video.pause();
    }
  };

  return (
    <div>
      <div className="relative mx-auto aspect-[9/16] w-full max-w-[360px] overflow-hidden bg-void-deep">
        <video
          ref={ref}
          className="absolute inset-0 h-full w-full cursor-pointer object-cover"
          poster={v.poster}
          muted={!sonido}
          loop={!sonido}
          playsInline
          preload="none"
          aria-label={`${v.nombre}: ${v.descripcion}`}
          onClick={alternarPausa}
          onPlay={() => setPausado(false)}
          onPause={() => setPausado(true)}
          onEnded={() => {
            setSonido(false);
            marcarManual(true);
          }}
        >
          <source src={v.fuentes.chica} type="video/mp4" media="(max-width: 767px)" />
          <source src={v.fuentes.grande} type="video/mp4" />
        </video>

        {pausado && (reducido || manual) && (
          <button
            type="button"
            onClick={verConSonido}
            className="absolute inset-0 flex items-center justify-center bg-void-deep/40"
            aria-label="Reproducir el video con sonido"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan text-void-deep">
              <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8" fill="currentColor" aria-hidden>
                <path d="M7 4.5v15l12-7.5z" />
              </svg>
            </span>
          </button>
        )}
      </div>

      <div className="mx-auto mt-5 flex w-full max-w-[360px] flex-wrap items-center gap-3">
        {!sonido ? (
          <button
            type="button"
            onClick={verConSonido}
            className="btn-wing btn-sweep inline-flex min-h-12 flex-1 items-center justify-center gap-2 bg-cyan px-6 text-sm font-semibold text-void-deep"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M11 5 6 9H3v6h3l5 4z" />
              <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
            </svg>
            Ver con sonido
          </button>
        ) : (
          <button
            type="button"
            onClick={alternarSonido}
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 border border-line px-6 text-sm font-semibold text-ink-bright"
          >
            Silenciar
          </button>
        )}
        <button
          type="button"
          onClick={alternarPausa}
          className="inline-flex min-h-12 min-w-12 items-center justify-center border border-line px-4 text-sm font-semibold text-ink-bright"
          aria-label={pausado ? "Reproducir" : "Pausar"}
        >
          {pausado ? "▶" : "❚❚"}
        </button>
      </div>

      <details className="mx-auto mt-4 w-full max-w-[360px] text-sm text-ink">
        <summary className="type-telemetry cursor-pointer py-2 text-ink-dim">Ver transcripción</summary>
        <div className="mt-2 space-y-2 leading-relaxed">
          {v.transcripcion.map((linea) => (
            <p key={linea}>{linea}</p>
          ))}
        </div>
      </details>
    </div>
  );
}
