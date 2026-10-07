import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import ServicioHero from "@/components/ServicioHero";
import ServicioDetalle from "@/components/ServicioDetalle";
import MarcaPersonal from "@/components/MarcaPersonal";
import Secuencia from "@/components/Secuencia";
import Formas from "@/components/Formas";
import OtrosServicios from "@/components/OtrosServicios";
import Contacto from "@/components/Contacto";
import { getServicio, servicios } from "@/lib/content";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

// Solo existen los 5 servicios: cualquier otro slug es 404
export const dynamicParams = false;

export function generateStaticParams() {
  return servicios.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getServicio(slug);
  if (!s) return {};
  const url = `/servicios/${s.slug}`;
  return {
    title: { absolute: s.seo.title },
    description: s.seo.description,
    keywords: [s.seo.keyword],
    alternates: { canonical: url },
    openGraph: {
      title: s.seo.title,
      description: s.seo.description,
      url,
      siteName: site.name,
      locale: "es_MX",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: s.seo.title,
      description: s.seo.description,
    },
  };
}

/* Página de servicio: hero claro → qué incluye (oscuro) → [marca personal]
   → cómo trabajamos (claro) → cómo se contrata (oscuro) → otros servicios
   y contacto con el interés ya elegido (claro). */
export default async function ServicioPage({ params }: Props) {
  const { slug } = await params;
  const s = getServicio(slug);
  if (!s) notFound();

  return (
    <>
      <JsonLd graph={[serviceSchema(s), breadcrumbSchema(s)]} />
      <main className="flex-1">
        <ServicioHero servicio={s} />
        <ServicioDetalle servicio={s} />
        {s.slug === "marca-e-identidad" && <MarcaPersonal cutIn={false} />}
        <Secuencia />
        <Formas enfoque={s.forma} titulo="Cómo se contrata este servicio" />
        <OtrosServicios actual={s.slug} />
        <Contacto cutIn={false} interesInicial={s.interes} />
      </main>
    </>
  );
}
