"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const POOL = "▮▯/\\_-=+*<>[]{}01GX";

/* Kicker de telemetría con efecto decode: los caracteres se resuelven
   como un instrumento calibrándose. El texto real está siempre en el
   aria-label; el span animado es presentacional. */
export default function Kicker({
  children,
  className = "text-cyan",
}: {
  children: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia(el);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const target = el.querySelector("[data-scramble]");
      if (!target) return;

      const state = { progress: 0 };
      gsap.to(state, {
        progress: 1,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => {
          const resolved = Math.floor(children.length * state.progress);
          let out = children.slice(0, resolved);
          for (let i = resolved; i < children.length; i++) {
            out +=
              children[i] === " "
                ? " "
                : POOL[Math.floor(Math.random() * POOL.length)];
          }
          target.textContent = out;
        },
      });
    });

    return () => mm.revert();
  }, [children]);

  return (
    <p ref={ref} aria-label={children} className={`type-telemetry ${className}`}>
      <span data-scramble aria-hidden>
        {children}
      </span>
    </p>
  );
}
