/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Fix for pdfjs-dist - prevent it from trying to use Node.js modules in browser
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
      encoding: false,
      'pdfjs-dist/build/pdf.worker.entry': false,
    };
    
    // Ignore fs module warnings
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    return config;
  },
}

module.exports = nextConfig
