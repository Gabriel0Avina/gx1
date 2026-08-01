import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-void-deep px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-12 sm:px-8">
      <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-3">
        <div>
          <p className="type-logo text-4xl text-ink-bright">GX1</p>
          <p className="type-logo mt-3 text-xs text-ink-dim">{site.tagline}</p>
        </div>
        <div className="type-telemetry flex flex-col gap-3 text-ink-dim">
          <a
            href={`mailto:${site.contactEmail}`}
            className="inline-flex min-h-11 items-center transition-colors duration-200 hover:text-cyan"
          >
            {site.contactEmail}
          </a>
          <span className="inline-flex min-h-11 items-center">
            Guadalajara&nbsp;·&nbsp;20.6597°&nbsp;N&nbsp;103.3496°&nbsp;W
          </span>
        </div>
        <p className="type-telemetry text-ink-dim md:justify-self-end md:text-right">
          ©&nbsp;{new Date().getFullYear()}&nbsp;{site.name}
          <br />
          Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}
