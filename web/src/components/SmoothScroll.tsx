"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

// Altura del navbar fijo (h-16): las secciones no quedan debajo de él
const NAV_OFFSET = -64;

/* Lenis + GSAP en un solo ticker, compartido por todas las páginas.
   - Enlaces a secciones de la misma página (/#contacto estando en /):
     scroll suave con Lenis en vez del salto nativo.
   - Cambio de página: arriba, o a la sección si la URL trae hash, y
     ScrollTrigger recalcula las posiciones de la nueva página.
   Con prefers-reduced-motion el scroll queda nativo y ninguna timeline
   se registra (cada sección usa matchMedia). */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const firstRun = useRef(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.12 });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // En captura: corre antes que next/link. Al marcar defaultPrevented,
    // Link no navega (pero su onClick propio —p. ej. cerrar el menú— sí corre).
    // Solo aplica a anclas de la página actual.
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;
      const link = (e.target as Element | null)?.closest("a");
      if (!link || !link.href || link.target === "_blank") return;
      const url = new URL(link.href);
      if (
        url.origin !== window.location.origin ||
        url.pathname !== window.location.pathname ||
        !url.hash
      )
        return;
      const target = document.querySelector<HTMLElement>(
        decodeURIComponent(url.hash)
      );
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: NAV_OFFSET });
      window.history.replaceState(window.history.state, "", url.hash);
    };
    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Navegación entre páginas
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const frame = requestAnimationFrame(() => {
      const lenis = lenisRef.current;
      const hash = window.location.hash;
      const target = hash
        ? document.querySelector<HTMLElement>(decodeURIComponent(hash))
        : null;

      if (target) {
        if (lenis) lenis.scrollTo(target, { offset: NAV_OFFSET, immediate: true, force: true });
        else target.scrollIntoView();
      } else if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true });
      }
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return <>{children}</>;
}
