import { ImageResponse } from "next/og";

export const alt =
  "GX1 — Agencia de marketing y automatización con IA en Guadalajara";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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
            fontSize: 28,
            color: "#22d3ee",
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          SYS 100% · IA Systems
        </div>
        <div
          style={{
            fontSize: 150,
            fontWeight: 800,
            color: "#f2f5f9",
            letterSpacing: -2,
            marginTop: 8,
          }}
        >
          GX1
        </div>
        <div style={{ fontSize: 36, color: "#9aa8ba", marginTop: 4 }}>
          Marketing y automatización con IA · Guadalajara
        </div>
      </div>
    ),
    { ...size }
  );
}
