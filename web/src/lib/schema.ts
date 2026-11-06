import { site } from "@/lib/site";
import { preguntas, pasos, servicios, type Servicio } from "@/lib/content";
import { videoPresentacion as v } from "@/lib/video";

/* Constructores de datos estructurados (schema.org). Cada página monta solo
   lo que es visible en ella: la entidad GX1 en todo el sitio, FAQPage y
   HowTo en el inicio, Service + BreadcrumbList en cada servicio. */

const orgId = `${site.url}/#organization`;
const servicioUrl = (slug: string) => `${site.url}/servicios/${slug}`;

const areaServed = [
  { "@type": "City", name: "Guadalajara" },
  { "@type": "State", name: "Jalisco" },
  { "@type": "Country", name: "México" },
];

export function organizationSchema() {
  return {
    "@type": "ProfessionalService",
    "@id": orgId,
    name: site.legalName,
    alternateName: site.name,
    description: site.description,
    url: site.url,
    email: site.contactEmail,
    telephone: `+${site.whatsappNumber}`,
    slogan: site.tagline,
    image: `${site.url}/gx1-logo.png`,
    logo: `${site.url}/gx1-logo.png`,
    priceRange: "$$",
    areaServed,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios GX1",
      itemListElement: servicios.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.nombre,
          description: s.tarjeta,
          url: servicioUrl(s.slug),
        },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: "es-MX",
    publisher: { "@id": orgId },
  };
}

export function faqSchema() {
  return {
    "@type": "FAQPage",
    "@id": `${site.url}/#faq`,
    mainEntity: preguntas.map((p) => ({
      "@type": "Question",
      name: p.q,
      acceptedAnswer: { "@type": "Answer", text: p.a },
    })),
  };
}

export function howToSchema() {
  return {
    "@type": "HowTo",
    "@id": `${site.url}/#howto`,
    name: "Cómo trabaja GX1 con tu empresa",
    description:
      "El proceso de cuatro pasos de GX1: diagnóstico, estrategia, producción y medición.",
    step: pasos.map((p, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: p.titulo,
      text: p.texto,
    })),
  };
}

export function videoSchema() {
  return {
    "@type": "VideoObject",
    "@id": `${site.url}/#video`,
    name: v.nombre,
    description: v.descripcion,
    thumbnailUrl: `${site.url}${v.poster}`,
    contentUrl: `${site.url}${v.fuentes.grande}`,
    uploadDate: v.publicado,
    duration: v.duracion,
    inLanguage: "es-MX",
    width: v.ancho,
    height: v.alto,
    transcript: v.transcripcion.join(" "),
    publisher: { "@id": orgId },
  };
}

export function serviceSchema(s: Servicio) {
  return {
    "@type": "Service",
    "@id": `${servicioUrl(s.slug)}#service`,
    name: s.nombre,
    serviceType: s.seo.keyword,
    description: s.intro,
    url: servicioUrl(s.slug),
    provider: { "@id": orgId },
    areaServed,
  };
}

export function breadcrumbSchema(s: Servicio) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Servicios",
        item: `${site.url}/#servicios`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: s.nombre,
        item: servicioUrl(s.slug),
      },
    ],
  };
}
