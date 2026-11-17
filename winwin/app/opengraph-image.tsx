import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import {
  CLUB_HOURS,
  CLUB_SEASON_DATES_SHORT,
  CLUB_SEASON_NAME,
} from "@/lib/site";

// The preview card shown when the site link is shared (WhatsApp, Facebook, iMessage...).
export const alt =
  "Winwin Club, a coworking space in Menzah 7, Ariana, open every day from 8am to 2am";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function readAsDataUrl(file: string, type: string) {
  const data = await readFile(join(process.cwd(), "assets/og", file), "base64");
  return `data:${type};base64,${data}`;
}

/**
 * Loads the site's font from Google Fonts while the image is built. If that fails,
 * the image still renders with the default font.
 */
async function loadFont(weight: 500 | 700 | 800) {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@${weight}`
      )
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    const data = await (await fetch(url)).arrayBuffer();
    return { name: "Plus Jakarta Sans", data, weight, style: "normal" } as const;
  } catch {
    return null;
  }
}

export default async function Image() {
  const [mark, photo, ...fonts] = await Promise.all([
    readAsDataUrl("mark.png", "image/png"),
    readAsDataUrl("space.jpg", "image/jpeg"),
    loadFont(500),
    loadFont(700),
    loadFont(800),
  ]);
  const loadedFonts = fonts.filter((font) => font !== null);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "#ffffff",
          fontFamily: loadedFonts.length ? "Plus Jakarta Sans" : undefined,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 680,
            padding: "64px 48px 64px 72px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <img src={mark} width={64} height={64} alt="" />
            <span
              style={{
                fontSize: 30,
                fontWeight: 700,
                letterSpacing: 3,
                color: "#7C2314",
                textTransform: "uppercase",
              }}
            >
              Winwin Club
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 56,
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: -1.5,
                color: "#0A0E27",
              }}
            >
              <span>Coworking space</span>
              <span>in Menzah 7, Ariana</span>
            </div>
            <span style={{ marginTop: 20, fontSize: 30, fontWeight: 500, color: "#525252" }}>
              Open every day, {CLUB_HOURS}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignSelf: "flex-start",
              gap: 12,
              padding: "12px 22px",
              borderRadius: 999,
              backgroundImage: "linear-gradient(90deg, #7C2314, #B23A1F, #E0612F)",
              color: "#ffffff",
              fontSize: 24,
            }}
          >
            <span style={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, fontSize: 17 }}>
              {CLUB_SEASON_NAME}
            </span>
            <span style={{ fontWeight: 800 }}>Open 24/7,</span>
            <span>{CLUB_SEASON_DATES_SHORT}</span>
          </div>
        </div>

        <div style={{ display: "flex", flex: 1, padding: "32px 32px 32px 0" }}>
          <img
            src={photo}
            alt=""
            width={488}
            height={566}
            style={{ objectFit: "cover", borderRadius: 28, width: "100%", height: "100%" }}
          />
        </div>
      </div>
    ),
    { ...size, fonts: loadedFonts }
  );
}
