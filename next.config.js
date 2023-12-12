/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        disableStaticImages: true,
        domains: ['ldb-phinf.pstatic.net'],
        minimumCacheTTL: 31536000,
      },
}

module.exports = nextConfig
