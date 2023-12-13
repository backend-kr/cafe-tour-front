/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    disableStaticImages: true,
    domains: ['ldb-phinf.pstatic.net'],
    minimumCacheTTL: 31536000,
  },
  env: {
    NAVER_CLIENT_ID: "#NAVER_CLIENT_ID",
  },
};

module.exports = nextConfig;