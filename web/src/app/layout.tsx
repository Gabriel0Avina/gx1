import type { Metadata } from "next";
import { Archivo, Geist_Mono, Jost } from "next/font/google";
import { site } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import SmoothScroll from "@/components/SmoothScroll";
import CursorGlow from "@/components/CursorGlow";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import "./globals.css";

/* Archivo variable: eje wdth 62–125 — display expandido y labels condensados
   desde una sola familia. Geist Mono solo para telemetría (datos). */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/* Jost: revival geométrica de Futura — la tipografía del logo GX1.
   Wordmarks de marca en peso ligero (300) y headlines (H1/H2/H3) en
   pesos medios, para eco del logo sin perder impacto de titular. */
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  // URL pública resuelta en next.config.ts para cada entorno de despliegue.
  metadataBase: new URL(site.url),
  // Metadata del inicio; cada página de servicio la sobrescribe completa.
  // ≤60 caracteres para no truncarse en el SERP
  title: "GX1 | Agencia digital con IA en Guadalajara",
  description:
    "Marca, video, web y automatización con IA en un solo equipo. Agencia integral en Guadalajara para empresas que quieren verse, encontrarse y vender.",
  alternates: { canonical: "/" },
  keywords: [
    "agencia digital Guadalajara",
    "agencia integral",
    "diseño de marca Guadalajara",
    "SEO local Guadalajara",
    "videos para redes sociales",
    "software a la medida Guadalajara",
    "automatización de ventas",
  ],
  openGraph: {
    title: "GX1 | Agencia digital con IA en Guadalajara",
    description:
      "Marca, video, web y automatización con IA en un solo equipo, para empresas que quieren verse, encontrarse y vender.",
    url: "/",
    siteName: site.name,
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GX1 | Agencia digital con IA en Guadalajara",
    description:
      "Marca, video, web y automatización con IA en un solo equipo, para empresas que quieren verse, encontrarse y vender.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${archivo.variable} ${geistMono.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Entidad GX1: válida en todo el sitio */}
        <JsonLd graph={[organizationSchema(), websiteSchema()]} />
        <SmoothScroll>
          <CursorGlow />
          <CustomCursor />
          <Navbar />
          {children}
          <Footer />
          <WhatsAppFloat />
        </SmoothScroll>
      </body>
    </html>
  );
}
