import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt = "Tequila Fest Columbus 2027 – August 14 in Columbus, Ohio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const heroImg = readFileSync(join(process.cwd(), "public/hero-bg.jpg"));
  const heroBase64 = `data:image/jpeg;base64,${heroImg.toString("base64")}`;

  const logoImg = readFileSync(join(process.cwd(), "public/tequilafest_columbus_logo.png"));
  const logoBase64 = `data:image/png;base64,${logoImg.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Hero background */}
        <img
          src={heroBase64}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />

        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            // Heavier than Cleveland's 0.62: the Columbus hero photo is a bright,
          // busy daytime crowd shot and the gold highlights line was washing out.
          background: "rgba(0,0,0,0.72)",
          }}
        />

        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "linear-gradient(90deg, #00A878, #F5A623, #00A878)",
          }}
        />

        {/* Bottom accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "linear-gradient(90deg, #00A878, #F5A623, #00A878)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            padding: "0 60px",
            textAlign: "center",
            gap: "0px",
          }}
        >
          {/* Logo */}
          <img
            src={logoBase64}
            style={{ width: "140px", height: "140px", objectFit: "contain", marginBottom: "8px" }}
          />

          {/* TEQUILA FEST */}
          <div
            style={{
              fontSize: "100px",
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1,
              textTransform: "uppercase",
              letterSpacing: "-2px",
            }}
          >
            TEQUILA FEST
          </div>

          {/* COLUMBUS */}
          <div
            style={{
              fontSize: "64px",
              fontWeight: 900,
              color: "#FACC15",
              lineHeight: 1,
              letterSpacing: "8px",
              textTransform: "uppercase",
              marginTop: "8px",
            }}
          >
            COLUMBUS
          </div>

          {/* Date + venue */}
          <div
            style={{
              marginTop: "20px",
              fontSize: "26px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.92)",
            }}
          >
            August 14, 2027 · Venue TBA · Columbus, OH
          </div>

          {/* Highlights */}
          <div
            style={{
              marginTop: "12px",
              fontSize: "20px",
              color: "#F5A623",
              fontWeight: 500,
            }}
          >
            50+ Tequilas · Tacos · Live Music · VIP Experience
          </div>
        </div>

        {/* URL badge */}
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            right: "40px",
            fontSize: "16px",
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "2px",
          }}
        >
          tequilafestcolumbus.com
        </div>
      </div>
    ),
    { ...size }
  );
}
