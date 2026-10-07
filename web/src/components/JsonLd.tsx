/* Datos estructurados JSON-LD — se sirven en el HTML inicial (server
   component) para que crawlers tradicionales y de IA lean la entidad sin
   ejecutar JS. Cada página pasa solo los nodos visibles en ella
   (constructores en lib/schema.ts). */
export default function JsonLd({ graph }: { graph: object[] }) {
  const jsonLd = { "@context": "https://schema.org", "@graph": graph };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
