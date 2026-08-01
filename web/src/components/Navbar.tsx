"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { site } from "@/lib/site";
import Magnetic from "./Magnetic";

/* Navbar adaptativo: sobre el hero claro (top) la tinta es navy;
   al hacer scroll entra el fondo de cabina y la tinta se invierte. */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        scrolled
          ? "border-line bg-void/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8">
        <a href="#inicio" aria-label="GX1 — inicio" className="flex items-center gap-2.5">
          <Image
            src="/gx1-wing.png"
            alt=""
            aria-hidden
            width={26}
            height={32}
            priority
            className="h-8 w-auto"
          />
          <span
            className={`type-logo text-2xl transition-colors duration-300 ${
              scrolled ? "text-ink-bright" : "text-hangar-ink"
            }`}
          >
            GX1
          </span>
          <span
            className={`type-logo hidden self-end pb-1 text-[0.7rem] transition-colors duration-300 sm:inline ${
              scrolled ? "text-ink-dim" : "text-hangar-ink-soft"
            }`}
          >
            IA&nbsp;Systems
          </span>
        </a>
        <p
          className={`type-telemetry hidden transition-colors duration-300 md:block ${
            scrolled ? "text-ink-dim" : "text-hangar-ink-soft"
          }`}
          aria-hidden
        >
          GDL&nbsp;·&nbsp;20.67°N&nbsp;103.35°W&nbsp;·&nbsp;
          <span className={scrolled ? "text-cyan" : "text-cyan-deep"}>
            EN&nbsp;LÍNEA
          </span>
        </p>
        <Magnetic strength={0.2}>
          <a
            href={site.scheduleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wing btn-sweep inline-flex min-h-11 items-center bg-cyan px-6 text-sm font-semibold text-void-deep"
          >
            Agenda una llamada
          </a>
        </Magnetic>
      </div>
    </header>
  );
}
