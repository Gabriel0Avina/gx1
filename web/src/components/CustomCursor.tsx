"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

/* Cursor de instrumento: punto cyan + retícula que crece sobre interactivos.
   Solo puntero fino sin reduced-motion; si el JS falla, el cursor nativo
   sigue ahí porque la clase cursor-on nunca se agrega. */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!fine || reduced || !dot || !ring) return;

    document.body.classList.add("cursor-on");

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    const move = (e: PointerEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const over = (e: PointerEvent) => {
      const interactive = (e.target as Element | null)?.closest(
        "a, button, summary, [data-cursor]"
      );
      gsap.to(ring, {
        scale: interactive ? 1.9 : 1,
        opacity: interactive ? 1 : 0.55,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    return () => {
      document.body.classList.remove("cursor-on");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan lg:block"
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/60 opacity-55 lg:block"
      />
    </>
  );
}
