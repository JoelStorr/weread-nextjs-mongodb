/** @type {import('next').NextConfig} */

import path from 'path'
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "books.google.com",
      },
    ],
  },

  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "./app/loader.scss";`,
  },
};

export default nextConfig;
