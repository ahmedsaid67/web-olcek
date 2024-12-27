/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    images: {
        domains: ['127.0.0.1','api.olcek.com'], // Protokol ve sondaki eğik çizgi olmadan
      },
};

export default nextConfig;
