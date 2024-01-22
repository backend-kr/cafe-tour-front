/** @type {import('next').NextConfig} */

const NAVER_KEY = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;

const nextConfig = {
  images: {
    disableStaticImages: true,
    domains: ["ldb-phinf.pstatic.net"],
    minimumCacheTTL: 31536000,
  },
  env: {
    NAVER_CLIENT_ID: NAVER_KEY,
  },
};

module.exports = nextConfig;
