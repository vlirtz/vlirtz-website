import { ImageResponse } from "next/og";
import {
  agentDevelopmentMarkets,
  getAgentMarketBySlug,
} from "@/lib/agent-development";
import { site } from "@/lib/site";

export const alt = "AI agent development by VLIRTZ";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Pre-renders one social card per market at build time.
 */
export function generateStaticParams() {
  return agentDevelopmentMarkets.map((market) => ({ city: market.slug }));
}

/**
 * Generates a per-market Open Graph image.
 *
 * Every page previously shared one static /og.jpg, so a link to the
 * Amsterdam page and a link to the homepage looked identical when shared.
 * Naming the city in the card makes shared links legible, which matters for
 * the click-through on social and in chat previews.
 */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const market = getAgentMarketBySlug(city);
  const heading = market
    ? `AI agent development in ${market.city}`
    : "AI agent development";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0d1633",
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
            color: "#8f9bc7",
          }}
        >
          {site.name}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: 74,
              fontWeight: 600,
              lineHeight: 1.1,
              color: "#ffffff",
            }}
          >
            {heading}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#8f9bc7" }}>
            One workflow, measured and shipped in 2 to 4 weeks
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#8f9bc7",
          }}
        >
          {market ? `${market.country} · ` : ""}Headquartered in Stockholm
        </div>
      </div>
    ),
    size,
  );
}
