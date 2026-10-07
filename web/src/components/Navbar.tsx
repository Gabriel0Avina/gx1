"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import Magnetic from "./Magnetic";

const links = [
  { href: "/#servicios", label: "Servicios" },
  { href: "/#casos", label: "Casos" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#contacto", label: "Contacto" },
];

/* Navbar adaptativo: sobre los heros claros (top) la tinta es navy; al
   hacer scroll entra el fondo de cabina y la tinta se invierte. Los enlaces
   apuntan a secciones del inicio, así funcionan igual desde cualquier
   página de servicio. En móvil, menú a pantalla completa. */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menú móvil: bloquear scroll, Esc para cerrar, foco atrapado dentro
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const panel = panelRef.current;
    const focusables = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>("a, button") ?? []
      );
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const toggle = toggleRef.current;
    return () => {
      root.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  const dark = scrolled || open;
  const close = () => setOpen(false);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        dark
          ? "border-line bg-void/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8">
        <Link
          href="/#inicio"
          aria-label="GX1 — inicio"
          className="flex items-center gap-2.5"
          onClick={close}
        >
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
              dark ? "text-ink-bright" : "text-hangar-ink"
            }`}
          >
            GX1
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`inline-flex min-h-11 items-center text-sm font-medium transition-colors duration-200 ${
                    dark
                      ? "text-ink hover:text-cyan"
                      : "text-hangar-ink-soft hover:text-cyan-deep"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Magnetic strength={0.2}>
            <Link
              href="/#contacto"
              className="btn-wing btn-sweep hidden min-h-11 items-center bg-cyan px-6 text-sm font-semibold text-void-deep sm:inline-flex"
            >
              Cotiza tu proyecto
            </Link>
          </Magnetic>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
            className={`relative inline-flex size-11 items-center justify-center lg:hidden ${
              dark ? "text-ink-bright" : "text-hangar-ink"
            }`}
          >
            <span aria-hidden className="relative block h-3 w-6">
              <span
                className={`absolute left-0 top-0 h-0.5 w-6 bg-current transition-transform duration-300 ${
                  open ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-6 bg-current transition-transform duration-300 ${
                  open ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>
    </header>

      {/* Menú móvil a pantalla completa — fuera del header: su backdrop-blur
          convertiría al header en el contenedor de los hijos fixed */}
      <div
        id="menu-movil"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-16 z-40 bg-void-deep px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-8 sm:px-8 lg:hidden"
      >
        <nav aria-label="Menú móvil" className="flex h-full flex-col">
          <ul className="flex flex-col">
            {links.map(({ href, label }) => (
              <li key={href} className="border-b border-line">
                <Link
                  href={href}
                  onClick={close}
                  className="type-display flex min-h-16 items-center text-3xl text-ink-bright"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/#contacto"
            onClick={close}
            className="btn-wing btn-sweep mt-8 inline-flex min-h-13 items-center justify-center bg-cyan px-8 text-base font-semibold text-void-deep"
          >
            Cotiza tu proyecto
          </Link>
          <div className="type-telemetry mt-auto flex flex-col gap-3 pt-8 text-ink-dim">
            <a href={site.phoneHref} className="inline-flex min-h-11 items-center">
              {site.phoneDisplay}
            </a>
            <a
              href={`mailto:${site.contactEmail}`}
              className="inline-flex min-h-11 items-center"
            >
              {site.contactEmail}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
