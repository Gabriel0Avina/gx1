import Preloader from "@/components/Preloader";
import JsonLd from "@/components/JsonLd";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Camino from "@/components/Camino";
import Servicios from "@/components/Servicios";
import MarcaPersonal from "@/components/MarcaPersonal";
import Secuencia from "@/components/Secuencia";
import Formas from "@/components/Formas";
import Casos from "@/components/Casos";
import Nosotros from "@/components/Nosotros";
import Transmisiones from "@/components/Transmisiones";
import Contacto from "@/components/Contacto";
import { faqSchema, howToSchema } from "@/lib/schema";

/* Inicio: un solo camino con tres etapas (Se ve · Se encuentra · Vende).
   Escenas alternadas claro/oscuro; el shell (navbar, footer, scroll) vive
   en el layout y lo comparten las páginas de servicio. */
export default function Home() {
  return (
    <>
      {/* FAQ y proceso: visibles solo en esta página */}
      <JsonLd graph={[faqSchema(), howToSchema()]} />
      <Preloader />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Camino />
        <Servicios />
        <MarcaPersonal />
        <Secuencia />
        <Formas />
        <Casos />
        <Nosotros />
        <Transmisiones />
        <Contacto />
      </main>
    </>
  );
}
