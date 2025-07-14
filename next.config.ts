import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://vlonefarsi-phonecase.storage.iran.liara.space/**"),
    ],
  },
};

export default nextConfig;
