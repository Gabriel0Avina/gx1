import Link from "next/link";
import { site } from "@/lib/site";
import { servicios } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-void-deep px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-14 sm:px-8">
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <p className="type-logo text-4xl text-ink-bright">GX1</p>
          <p className="mt-4 max-w-xs leading-relaxed text-ink">
            Agencia integral con IA. Marca, contenido, web y automatización
            para empresas que quieren crecer en digital.
          </p>
          <p className="type-logo mt-5 text-xs text-ink-dim">{site.tagline}</p>
        </div>

        <nav aria-label="Servicios">
          <p className="type-telemetry text-ink-dim">Servicios</p>
          <ul className="mt-3 flex flex-col">
            {servicios.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/servicios/${s.slug}`}
                  className="inline-flex min-h-11 items-center text-ink transition-colors duration-200 hover:text-cyan"
                >
                  {s.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="type-telemetry text-ink-dim">Contacto</p>
          <ul className="mt-3 flex flex-col">
            <li>
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-ink transition-colors duration-200 hover:text-cyan"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={site.phoneHref}
                className="inline-flex min-h-11 items-center text-ink transition-colors duration-200 hover:text-cyan"
              >
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.contactEmail}`}
                className="inline-flex min-h-11 items-center break-all text-ink transition-colors duration-200 hover:text-cyan"
              >
                {site.contactEmail}
              </a>
            </li>
            <li className="inline-flex min-h-11 items-center text-ink">
              {site.city}, {site.region}
            </li>
          </ul>
        </div>
      </div>

      <p className="type-telemetry mx-auto mt-14 max-w-[1400px] border-t border-line pt-6 text-ink-dim">
        GX1&nbsp;·&nbsp;Agencia integral con IA&nbsp;·&nbsp;Guadalajara, Jalisco&nbsp;·&nbsp;Build&nbsp;·&nbsp;Scale&nbsp;·&nbsp;Evolve&nbsp;·&nbsp;©&nbsp;{new Date().getFullYear()}
      </p>
    </footer>
  );
}
