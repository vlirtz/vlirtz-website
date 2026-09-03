import { ImageResponse } from "next/og";
import { getLocationBySlug, locations } from "@/lib/locations";
import { site } from "@/lib/site";

export const alt = "VLIRTZ market page";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Pre-renders one social card per market at build time.
 */
export function generateStaticParams() {
  return locations.map((location) => ({ slug: location.slug }));
}

/**
 * Generates a per-market Open Graph image.
 *
 * Every page previously shared one static /og.jpg. Naming the market in the
 * card makes a shared link legible instead of generic.
 */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  const heading = location?.heroHeading ?? "AI software agency";
  const subheading = location
    ? location.sectors.slice(0, 3).join(" · ")
    : "AI agents, consulting and lead generation";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#3a4bbf",
          }}
        >
          {site.name}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 600,
              lineHeight: 1.1,
              color: "#0d1633",
              textTransform: "capitalize",
            }}
          >
            {heading}
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#5a6382" }}>
            {subheading}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "#5a6382" }}>
          {location?.country ?? "Europe"} · Headquartered in Stockholm
        </div>
      </div>
    ),
    size,
  );
}
