"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site, whatsappLink } from "@/lib/site";
import { intereses } from "@/lib/content";
import { INTERES_EVENT } from "@/lib/interes";
import Kicker from "./Kicker";
import Magnetic from "./Magnetic";
import Plexus from "./Plexus";
import WingMark from "./WingMark";

gsap.registerPlugin(ScrollTrigger);

type Campos = {
  nombre: string;
  empresa: string;
  telefono: string;
  correo: string;
  interes: string;
  mensaje: string;
};
type Errores = Partial<Record<keyof Campos, string>>;

const CORREO_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validar(c: Campos): Errores {
  const e: Errores = {};
  if (!c.nombre.trim()) e.nombre = "Escribe tu nombre.";
  const digitos = c.telefono.replace(/\D/g, "");
  if (!digitos && !c.correo.trim()) {
    e.telefono = "Déjanos un WhatsApp o un correo para responderte.";
  } else {
    if (digitos && digitos.length < 10)
      e.telefono = "Revisa el número: debe tener al menos 10 dígitos.";
    if (c.correo.trim() && !CORREO_RE.test(c.correo.trim()))
      e.correo = "Revisa el correo: parece incompleto.";
  }
  return e;
}

/* El formulario no guarda nada: arma el mensaje y abre WhatsApp con todo
   escrito, listo para enviar. El lead llega al canal principal de GX1. */
function mensajeWhatsApp(c: Campos) {
  const datos = (
    [
      ["Nombre", c.nombre],
      ["Empresa", c.empresa],
      ["WhatsApp o teléfono", c.telefono],
      ["Correo", c.correo],
      ["Me interesa", c.interes],
      ["Mensaje", c.mensaje],
    ] as const
  )
    .filter(([, v]) => v.trim())
    .map(([k, v]) => `${k}: ${v.trim()}`);
  return ["Hola GX1, quiero agendar un diagnóstico.", "", ...datos].join("\n");
}

type Props = {
  cutIn?: boolean;
  interesInicial?: string;
};

export default function Contacto({ cutIn = true, interesInicial = "" }: Props) {
  const scope = useRef<HTMLElement>(null);
  const formId = useId();
  const [campos, setCampos] = useState<Campos>({
    nombre: "",
    empresa: "",
    telefono: "",
    correo: "",
    interes: interesInicial,
    mensaje: "",
  });
  const [errores, setErrores] = useState<Errores>({});
  const [enviado, setEnviado] = useState<string | null>(null);

  // Un CTA de otra sección puede preseleccionar el interés
  useEffect(() => {
    const onInteres = (e: Event) => {
      const valor = (e as CustomEvent<string>).detail;
      if (intereses.includes(valor))
        setCampos((c) => ({ ...c, interes: valor }));
    };
    window.addEventListener(INTERES_EVENT, onInteres);
    return () => window.removeEventListener(INTERES_EVENT, onInteres);
  }, []);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(scope);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-ct-text] > *", {
        autoAlpha: 0,
        y: 40,
        duration: 1,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: scope.current, start: "top 68%" },
      });
      gsap.from("[data-ct-wing]", {
        autoAlpha: 0,
        y: 90,
        rotate: 8,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: { trigger: scope.current, start: "top 65%" },
      });
      ScrollTrigger.create({
        trigger: "[data-ct-form]",
        start: "top 78%",
        onEnter: () =>
          scope.current
            ?.querySelector("[data-ct-form]")
            ?.setAttribute("data-lit", "true"),
      });
    });

    return () => mm.revert();
  }, []);

  const set =
    (k: keyof Campos) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const valor = e.target.value;
      setCampos((c) => ({ ...c, [k]: valor }));
      if (errores[k]) setErrores((er) => ({ ...er, [k]: undefined }));
    };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const er = validar(campos);
    setErrores(er);
    const primero = (Object.keys(er) as Array<keyof Campos>)[0];
    if (primero) {
      document.getElementById(`${formId}-${primero}`)?.focus();
      return;
    }
    const url = whatsappLink(mensajeWhatsApp(campos));
    const ventana = window.open(url, "_blank", "noopener,noreferrer");
    if (!ventana) window.location.href = url;
    setEnviado(url);
  };

  const idDe = (k: keyof Campos) => `${formId}-${k}`;
  const errDe = (k: keyof Campos) => `${formId}-${k}-error`;
  const campoCls = (k: keyof Campos) =>
    `mt-2 block min-h-12 w-full border bg-hangar-panel px-4 py-3 text-base text-hangar-ink placeholder:text-hangar-ink-soft/70 transition-colors duration-200 focus:border-cyan-deep focus:outline-2 focus:outline-offset-2 focus:outline-cyan-deep ${
      errores[k] ? "border-alert" : "border-hangar-line"
    }`;
  const ariaDe = (k: keyof Campos) =>
    errores[k]
      ? { "aria-invalid": true as const, "aria-describedby": errDe(k) }
      : {};
  const errorDe = (k: keyof Campos) =>
    errores[k] ? (
      <p id={errDe(k)} className="mt-2 text-sm font-medium text-alert">
        {errores[k]}
      </p>
    ) : null;
  const label = "text-sm font-semibold text-hangar-ink";

  return (
    <section
      ref={scope}
      id="contacto"
      className={`isolate overflow-hidden bg-hangar px-5 pb-24 text-hangar-ink sm:px-8 lg:pb-36 ${
        cutIn
          ? "scene-cut-in pt-[calc(7rem+4vw)] lg:pt-[calc(10rem+4vw)]"
          : "relative pt-24 lg:pt-36"
      }`}
    >
      {/* Eco del estudio del video */}
      <Plexus
        variant="light"
        count={20}
        seed={3}
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full opacity-30"
      />
      <div
        data-ct-wing
        aria-hidden
        className="absolute left-[-14%] top-[12%] -z-10 w-[50vw] max-w-[520px] opacity-40"
      >
        <WingMark className="h-auto w-full" />
      </div>

      <div className="relative mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
        <div data-ct-text>
          <Kicker className="text-cyan-deep">Contacto</Kicker>
          <h2 className="type-display mt-4 text-[clamp(2.4rem,6vw,4.6rem)] text-hangar-ink">
            Cuéntanos qué necesita tu negocio
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-hangar-ink-soft">
            En una llamada revisamos tu marca, tus redes y cómo te llegan hoy
            los clientes. Al final te decimos por dónde empezar y te enviamos
            una propuesta.
          </p>
          <div className="mt-10 flex flex-col items-start gap-3">
            <Magnetic>
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-13 items-center justify-center border border-hangar-ink/25 px-8 text-base font-semibold text-hangar-ink transition-colors duration-200 hover:border-cyan-deep hover:text-cyan-deep"
              >
                Escríbenos por WhatsApp
              </a>
            </Magnetic>
            <ul className="type-telemetry mt-4 flex flex-col gap-1 text-hangar-ink-soft">
              <li>
                <a
                  href={site.phoneHref}
                  className="inline-flex min-h-11 items-center transition-colors duration-200 hover:text-cyan-deep"
                >
                  Tel.&nbsp;{site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.contactEmail}`}
                  className="inline-flex min-h-11 items-center transition-colors duration-200 hover:text-cyan-deep"
                >
                  {site.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Formulario → WhatsApp */}
        <div data-ct-form className="material-metal-light material-lit-edge px-6 py-8 sm:px-9 sm:py-10">
          {enviado ? (
            <div role="status" className="flex flex-col items-start gap-5">
              <p className="type-telemetry text-cyan-deep">● Mensaje listo</p>
              <p className="type-display text-[clamp(1.6rem,3vw,2.2rem)] leading-tight text-hangar-ink">
                Gracias. Abrimos WhatsApp con tu mensaje ya escrito.
              </p>
              <p className="leading-relaxed text-hangar-ink-soft">
                Solo presiona enviar. Recibimos tu mensaje y te respondemos en
                el siguiente día hábil.
              </p>
              <a
                href={enviado}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-cyan-deep underline underline-offset-4"
              >
                ¿No se abrió WhatsApp? Ábrelo aquí
              </a>
              <button
                type="button"
                onClick={() => setEnviado(null)}
                className="inline-flex min-h-11 items-center text-sm font-semibold text-hangar-ink-soft hover:text-hangar-ink"
              >
                Editar mis datos
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} aria-label="Agenda tu diagnóstico">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor={idDe("nombre")} className={label}>
                    Nombre <span className="text-cyan-deep" aria-hidden>*</span>
                  </label>
                  <input
                    id={idDe("nombre")}
                    name="nombre"
                    type="text"
                    autoComplete="name"
                    required
                    value={campos.nombre}
                    onChange={set("nombre")}
                    className={campoCls("nombre")}
                    {...ariaDe("nombre")}
                  />
                  {errorDe("nombre")}
                </div>
                <div>
                  <label htmlFor={idDe("empresa")} className={label}>
                    Empresa
                  </label>
                  <input
                    id={idDe("empresa")}
                    name="empresa"
                    type="text"
                    autoComplete="organization"
                    value={campos.empresa}
                    onChange={set("empresa")}
                    className={campoCls("empresa")}
                  />
                </div>
                <div>
                  <label htmlFor={idDe("telefono")} className={label}>
                    WhatsApp o teléfono
                  </label>
                  <input
                    id={idDe("telefono")}
                    name="telefono"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={campos.telefono}
                    onChange={set("telefono")}
                    className={campoCls("telefono")}
                    {...ariaDe("telefono")}
                  />
                  {errorDe("telefono")}
                </div>
                <div>
                  <label htmlFor={idDe("correo")} className={label}>
                    Correo
                  </label>
                  <input
                    id={idDe("correo")}
                    name="correo"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={campos.correo}
                    onChange={set("correo")}
                    className={campoCls("correo")}
                    {...ariaDe("correo")}
                  />
                  {errorDe("correo")}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor={idDe("interes")} className={label}>
                    Qué te interesa
                  </label>
                  <div className="relative">
                    <select
                      id={idDe("interes")}
                      name="interes"
                      value={campos.interes}
                      onChange={set("interes")}
                      className={`${campoCls("interes")} appearance-none pr-12`}
                    >
                      <option value="">Elige una opción</option>
                      {intereses.map((i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                    <span
                      aria-hidden
                      className="pointer-events-none absolute right-4 top-1/2 mt-1 size-2.5 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-hangar-ink-soft"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor={idDe("mensaje")} className={label}>
                    Mensaje
                  </label>
                  <textarea
                    id={idDe("mensaje")}
                    name="mensaje"
                    rows={4}
                    value={campos.mensaje}
                    onChange={set("mensaje")}
                    placeholder="Cuéntanos en pocas palabras qué buscas"
                    className={`${campoCls("mensaje")} resize-y`}
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4">
                <button
                  type="submit"
                  className="btn-wing btn-sweep inline-flex min-h-14 w-full items-center justify-center whitespace-nowrap bg-cyan px-8 text-lg font-semibold text-void-deep"
                >
                  Agenda tu diagnóstico
                </button>
                <p className="text-sm leading-snug text-hangar-ink-soft">
                  Se abre WhatsApp con tus datos. Te respondemos el siguiente
                  día hábil.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
