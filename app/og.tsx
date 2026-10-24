import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/**
 * Shared renderer for the OpenGraph cards.
 *
 * The portrait is read off disk and inlined as a data URI rather than linked:
 * satori (which backs ImageResponse) fetches remote images at render time, and
 * a build-time network call is a needless way for a preview to break. It also
 * has to be JPEG, since satori does not decode WebP, which is what every image on
 * darzini.com is stored as.
 */
async function portraitDataUri(): Promise<string> {
  const bytes = await readFile(join(process.cwd(), "public", "prateek.jpg"));
  return `data:image/jpeg;base64,${bytes.toString("base64")}`;
}

export async function renderCard({
  title,
  byline,
}: {
  title: string;
  byline: string;
}) {
  const portrait = await portraitDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 56,
          padding: "0 72px",
          background: "#130e1e",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Accent spine down the left edge. */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 8,
            height: "100%",
            background: "linear-gradient(180deg, #ff7a5c, #ffb347)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            style={{
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: 2.6,
              color: "#ff7a5c",
              marginBottom: 26,
            }}
          >
            ENGINEERINGBLOG.DARZINI.COM
          </div>
          <div
            style={{
              fontSize: 54,
              lineHeight: 1.14,
              fontWeight: 700,
              color: "#f7f0e8",
              letterSpacing: -0.8,
              marginBottom: 30,
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 23, color: "#b6a8bf", display: "flex" }}>{byline}</div>
        </div>

        <img
          src={portrait}
          width={332}
          height={332}
          style={{
            width: 332,
            height: 332,
            objectFit: "cover",
            borderRadius: 28,
            border: "3px solid rgba(255,122,92,0.55)",
          }}
        />
      </div>
    ),
    OG_SIZE
  );
}
