/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  reactStrictMode: true,
  // Static HTML export for GitHub Pages
  output: "export",
  // GitHub Pages serves a project site from a subpath: /<repo>
  basePath: isProd ? "/safesteel" : "",
  // next/image optimization isn't available on a static host
  images: { unoptimized: true },
  // Emit directory-style URLs (about/index.html) for clean static routing
  trailingSlash: true,
};

export default nextConfig;
