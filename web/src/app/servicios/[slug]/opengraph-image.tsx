import { ImageResponse } from "next/og";
import { etapas, getServicio } from "@/lib/content";

export const alt = "Servicio de GX1, agencia integral con IA en Guadalajara";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Imagen para compartir (WhatsApp, redes) de cada página de servicio:
   mismo lenguaje que la del inicio, con el nombre y la etapa del servicio. */
export default async function OgServicio({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getServicio(slug);
  const etapa = etapas.find((e) => e.id === s?.etapa)?.nombre ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px",
          background: "#0a111e",
          position: "relative",
        }}
      >
        {/* Filo diagonal del ala */}
        <div
          style={{
            position: "absolute",
            top: 150,
            right: -60,
            width: 620,
            height: 8,
            background: "#22d3ee",
            transform: "rotate(-12deg)",
            boxShadow: "0 0 40px rgba(34,211,238,0.6)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 210,
            right: -40,
            width: 480,
            height: 4,
            background: "#3d4a5c",
            transform: "rotate(-12deg)",
          }}
        />
        <div
          style={{
            fontSize: 26,
            color: "#22d3ee",
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          {`Servicio ${s?.num ?? ""} · ${etapa}`}
        </div>
        <div
          style={{
            fontSize: 86,
            fontWeight: 700,
            color: "#f2f5f9",
            lineHeight: 1.05,
            marginTop: 14,
            maxWidth: 980,
          }}
        >
          {s?.nombre ?? "GX1"}
        </div>
        <div style={{ fontSize: 30, color: "#9aa8ba", marginTop: 22 }}>
          GX1 · Agencia integral con IA · Guadalajara
        </div>
      </div>
    ),
    { ...size }
  );
}
