"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/* Luz de instrumento que sigue el cursor. Solo desktop con puntero fino
   y sin reduced-motion. Alpha bajísimo: es luz de cabina, no neón. */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced || !ref.current) return;

    const xTo = gsap.quickTo(ref.current, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(ref.current, "y", { duration: 0.6, ease: "power3.out" });

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 hidden size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full lg:block"
      style={{
        background:
          "radial-gradient(circle, oklch(0.85 0.14 200 / 0.05) 0%, transparent 65%)",
      }}
    />
  );
}
