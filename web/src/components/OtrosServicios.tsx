import Link from "next/link";
import { etapas, servicios } from "@/lib/content";

const nombreEtapa = Object.fromEntries(etapas.map((e) => [e.id, e.nombre]));

/* Enlaces al resto de servicios: todos se conectan entre sí. Escena clara
   que entra sobre Formas (oscura) y continúa en Contacto. */
export default function OtrosServicios({ actual }: { actual: string }) {
  const otros = servicios.filter((s) => s.slug !== actual);

  return (
    <section className="scene-cut-in bg-hangar px-5 pt-[calc(5rem+4vw)] text-hangar-ink sm:px-8 lg:pt-[calc(7rem+4vw)]">
      <div className="mx-auto max-w-[1400px]">
        <p className="type-telemetry text-cyan-deep">Se conecta con</p>
        <h2 className="type-display mt-4 text-[clamp(1.8rem,3.6vw,2.6rem)] text-hangar-ink">
          Otros servicios del mismo equipo
        </h2>
        <ul className="mt-10 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {otros.map((s) => (
            <li key={s.slug} className="border-t border-hangar-line">
              <Link
                href={`/servicios/${s.slug}`}
                className="group flex h-full min-h-28 flex-col justify-between gap-4 py-6 transition-colors duration-200"
              >
                <span className="type-telemetry text-hangar-ink-soft">
                  {s.num}&nbsp;·&nbsp;{nombreEtapa[s.etapa]}
                </span>
                <span className="flex items-baseline justify-between gap-3 text-lg font-semibold text-hangar-ink group-hover:text-cyan-deep">
                  {s.nombre}
                  <span
                    aria-hidden
                    className="text-cyan-deep transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
