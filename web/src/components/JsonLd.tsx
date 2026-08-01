import { site } from "@/lib/site";
import { preguntas, pasos, servicios } from "@/lib/content";

/* Datos estructurados JSON-LD — se sirven en el HTML inicial (server component)
   para que crawlers tradicionales y de IA lean la entidad sin ejecutar JS.
   Fuente única de contenido: lib/content.ts, igual que lo que ve el usuario. */
export default function JsonLd() {
  const graph = [
    // GEO — entidad de marca: negocio local de servicios profesionales
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#organization`,
      name: site.legalName,
      alternateName: site.name,
      description: site.description,
      url: site.url,
      email: site.contactEmail,
      slogan: site.tagline,
      image: `${site.url}/gx1-logo.png`,
      logo: `${site.url}/gx1-logo.png`,
      telephone: `+${site.whatsappNumber}`,
      priceRange: "$$",
      areaServed: [
        { "@type": "City", name: "Guadalajara" },
        { "@type": "State", name: "Jalisco" },
        { "@type": "Country", name: "México" },
      ],
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
            name: s.titulo,
            description: s.texto,
          },
        })),
      },
    },
    // SEO — el sitio como entidad
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      inLanguage: "es-MX",
      publisher: { "@id": `${site.url}/#organization` },
    },
    // AEO — FAQ para featured snippets y voice search
    {
      "@type": "FAQPage",
      "@id": `${site.url}/#faq`,
      mainEntity: preguntas.map((p) => ({
        "@type": "Question",
        name: p.q,
        acceptedAnswer: { "@type": "Answer", text: p.a },
      })),
    },
    // AEO — proceso de trabajo como HowTo
    {
      "@type": "HowTo",
      "@id": `${site.url}/#howto`,
      name: "Cómo trabaja GX1 con tu negocio",
      description:
        "El proceso de tres pasos de GX1 para construir y operar tu sistema digital.",
      step: pasos.map((p, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: p.titulo,
        text: p.texto,
      })),
    },
  ];

  const jsonLd = { "@context": "https://schema.org", "@graph": graph };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
