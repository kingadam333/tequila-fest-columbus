import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Tequila Fest Columbus 2027 – August 14 in Columbus, Ohio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0d0500 0%, #3d1a00 50%, #0d0500 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background texture dots */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(245,166,35,0.15) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #00A878, #F5A623, #00A878)",
          }}
        />

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #00A878, #F5A623, #00A878)",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            padding: "0 60px",
            textAlign: "center",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#F5A623",
              letterSpacing: "6px",
              textTransform: "uppercase",
            }}
          >
            🌵 Columbus&apos;s Biggest Tequila Festival
          </div>

          {/* Main headline */}
          <div
            style={{
              fontSize: "96px",
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-2px",
              lineHeight: 1,
              textTransform: "uppercase",
            }}
          >
            TEQUILA FEST
          </div>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 900,
              color: "#F5A623",
              letterSpacing: "4px",
              lineHeight: 1,
              textTransform: "uppercase",
            }}
          >
            COLUMBUS
          </div>

          {/* Date / venue */}
          <div
            style={{
              marginTop: "8px",
              fontSize: "28px",
              fontWeight: 600,
              color: "#fff",
              opacity: 0.9,
            }}
          >
            August 14, 2027 · Venue TBA · Columbus, OH
          </div>

          {/* Sub line */}
          <div
            style={{
              fontSize: "22px",
              color: "#F5A623",
              fontWeight: 500,
            }}
          >
            50+ Tequilas · Tacos · Live Music · VIP Experience
          </div>
        </div>

        {/* Bottom badge */}
        <div
          style={{
            position: "absolute",
            bottom: "28px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.6)",
              letterSpacing: "2px",
            }}
          >
            tequilafestcolumbus.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
