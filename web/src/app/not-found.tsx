import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-start justify-end bg-void-deep px-5 pb-16 pt-24 sm:px-8">
      <div className="mx-auto w-full max-w-[1400px]">
        <p className="type-telemetry text-cyan">Error 404 · Señal perdida</p>
        <h1 className="type-display mt-6 max-w-3xl text-[clamp(2.6rem,8vw,5.5rem)]">
          Esta ruta no existe en el plan de vuelo
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink">
          La página que buscas fue movida o nunca despegó. Volvamos a la base.
        </p>
        <Link
          href="/"
          className="btn-wing btn-sweep mt-10 inline-flex min-h-13 items-center bg-cyan px-8 text-base font-semibold text-void-deep"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
