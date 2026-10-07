import Link from "next/link";
import WingMark from "@/components/WingMark";

/* 404 en escena clara (el estudio): el navbar del layout arranca con
   tinta navy, así que el fondo debe ser claro. */
export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-svh flex-1 flex-col justify-end overflow-hidden bg-hangar px-5 pb-16 pt-24 text-hangar-ink sm:px-8">
      <div
        aria-hidden
        className="absolute right-[-16%] top-[12%] -z-10 w-[64vw] max-w-[560px] opacity-50"
      >
        <WingMark className="h-auto w-full" />
      </div>
      <div className="mx-auto w-full max-w-[1400px]">
        <p className="type-telemetry text-cyan-deep">Error 404 · Señal perdida</p>
        <h1 className="type-display mt-6 max-w-3xl text-[clamp(2.6rem,8vw,5.5rem)] text-hangar-ink">
          Esta ruta no existe en el plan de vuelo
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-hangar-ink-soft">
          La página que buscas fue movida o nunca despegó. Volvamos a la base.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="btn-wing btn-sweep inline-flex min-h-13 items-center justify-center bg-cyan px-8 text-base font-semibold text-void-deep"
          >
            Volver al inicio
          </Link>
          <Link
            href="/#servicios"
            className="inline-flex min-h-13 items-center justify-center border border-hangar-ink/30 px-8 text-base font-semibold text-hangar-ink transition-colors duration-200 hover:border-cyan-deep hover:text-cyan-deep"
          >
            Ver servicios
          </Link>
        </div>
      </div>
    </main>
  );
}
