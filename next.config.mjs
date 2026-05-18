import path from "node:path";
import { fileURLToPath } from "node:url";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// iCloud Drive는 .next 빠른 쓰기를 깨뜨립니다. .nosync 접미사로 동기화 제외.
// 배포 환경(Vercel 등)에서는 USE_DEFAULT_DIST=1로 기본 .next 사용.
const distDir = process.env.USE_DEFAULT_DIST ? ".next" : ".next.nosync";

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: __dirname,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  distDir,
};

export default withMDX(nextConfig);
