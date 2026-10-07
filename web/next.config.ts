import type { NextConfig } from "next";

// La URL pública se fija al compilar para que servidor y navegador coincidan.
// Vercel proporciona el dominio de producción incluso en los previews.
const vercelDomain =
  process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ||
    (vercelDomain ? `https://${vercelDomain}` : "http://localhost:3000")
).origin;

const nextConfig: NextConfig = {
  reactCompiler: true,
  env: {
    NEXT_PUBLIC_SITE_URL: siteUrl,
  },
  // No hay índice de servicios: la lista vive en la sección del inicio
  async redirects() {
    return [
      { source: "/servicios", destination: "/#servicios", permanent: false },
    ];
  },
};

export default nextConfig;
