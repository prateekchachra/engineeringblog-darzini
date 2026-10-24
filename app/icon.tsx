import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/**
 * Favicon: a "P" on the site's accent gradient.
 *
 * A cropped photo turns to mush at 16px, so this uses the wordmark's initial
 * instead, with the accent dot from the header lockup in the corner.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #e85d2f, #ffa23a)",
          borderRadius: 14,
          color: "#ffffff",
          fontSize: 44,
          fontWeight: 700,
          fontFamily: "sans-serif",
          letterSpacing: -2,
        }}
      >
        P
      </div>
    ),
    size
  );
}
