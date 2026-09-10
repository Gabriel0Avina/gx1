import type { Metadata } from "next";
import { Archivo, Geist_Mono, Jost } from "next/font/google";
import { site } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
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
  // ≤60 caracteres para no truncarse en el SERP
  title: "GX1 — Marketing y automatización con IA en Guadalajara",
  description:
    "Web, contenido, video y automatización con IA conectados bajo un solo sistema. Para negocios que necesitan presencia digital constante sin equipo interno.",
  alternates: { canonical: "/" },
  keywords: [
    "agencia de marketing Guadalajara",
    "automatización con IA",
    "marketing digital",
    "desarrollo web",
    "contenido para redes sociales",
  ],
  openGraph: {
    title: "GX1 — Marketing y automatización con IA",
    description:
      "Web, contenido, video y automatización con IA conectados bajo un solo sistema.",
    url: "/",
    siteName: site.name,
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GX1 — Marketing y automatización con IA",
    description:
      "Web, contenido, video y automatización con IA conectados bajo un solo sistema.",
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
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
