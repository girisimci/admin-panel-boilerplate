/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/, // SVG dosyaları için düzenleme
      use: ['@svgr/webpack'], // SVGR loader kullanımı
    });
    return config; // Güncellenmiş config'i döndür
  },
};

export default nextConfig;
