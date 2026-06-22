import { dirname } from "node:path";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: process.env.BLOB_BASE_URL
      ? [new URL(`${process.env.BLOB_BASE_URL}/**`)]
      : [],
  },
  turbopack: {
    root: dirname(__filename),
  },
};

export default withNextIntl(nextConfig);
