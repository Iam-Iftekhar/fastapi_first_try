import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

// export default nextConfig;

export default {
reactStrictMode: true,
images: {
domains: ["ik.imagekit.io", "localhost"],
},
};