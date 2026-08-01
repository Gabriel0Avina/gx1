/**
 * Configuración central del sitio GX1.
 * TODO(Gabriel): reemplazar los placeholders restantes antes de publicar:
 *  - SCHEDULE_URL: link de Calendly/Cal.com cuando exista;
 *    mientras tanto el CTA "Agenda una llamada" abre WhatsApp con mensaje prellenado.
 *  - CONTACT_EMAIL: confirmar correo real de la agencia
 *  - url: dominio real cuando se confirme
 *  - sameAs: URLs de las redes sociales propias de GX1 cuando existan
 */
// WhatsApp de GX1: 52 (México) + 33 1100 3471 (Guadalajara)
const WHATSAPP_NUMBER = "523311003471";

const whatsappLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const site = {
  name: "GX1",
  legalName: "GX1 IA Systems",
  tagline: "Build. Scale. Evolve.",
  description:
    "Agencia de marketing y automatización con IA en Guadalajara. Web, contenido, video y automatización conectados bajo un solo sistema.",
  location: "Guadalajara, Jalisco, México",
  city: "Guadalajara",
  region: "Jalisco",
  country: "MX",
  geo: { lat: 20.6597, lng: -103.3496 },
  contactEmail: "hola@gx1.mx",
  // TODO(Gabriel): confirmar dominio final
  url: "https://gx1.mx",
  whatsappNumber: WHATSAPP_NUMBER,
  // TODO(Gabriel): agregar URLs reales de redes sociales cuando existan
  sameAs: [] as string[],
  scheduleUrl: whatsappLink(
    "Hola, quiero agendar una llamada de diagnóstico para mi negocio."
  ),
  whatsappUrl: whatsappLink("Hola, me interesa saber más sobre GX1."),
};
