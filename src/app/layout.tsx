import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { RevealRoot } from "@/components/motion/RevealRoot";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";
import { getWebsiteJsonLd } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Expert Software Development Agency in Stockholm | VLIRTZ",
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "AI software agency Stockholm",
    "software agency Stockholm",
    "AI agent development",
    "AI consulting Stockholm",
    "AI lead generation",
  ],
  authors: [{ name: site.legalName }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: "AI software agency in Stockholm | VLIRTZ",
    description: site.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "VLIRTZ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI software agency in Stockholm | VLIRTZ",
    description: site.description,
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
};

/**
 * Root layout: fonts, analytics, header/footer, and site-wide JSON-LD.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-motion=""
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white font-sans text-ink">
        <GoogleAnalytics />
        <JsonLd data={getWebsiteJsonLd()} />
        <RevealRoot />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
