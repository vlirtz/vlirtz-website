import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/about-software-development",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/services-software-development-ai-consulting-ai-agent-development",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/contact-software-development",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
