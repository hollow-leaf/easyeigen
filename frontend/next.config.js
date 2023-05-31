/** @type {import('next').NextConfig} */

const isProd = 'production'
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true
      },
    experimental: {
        appDir: false,
    },
    basePath: '/easyeigen',
    assetPrefix: './',
    webpack: function (config, options) {
        if (!options.isServer) {
          config.resolve.fallback.fs = false;
        }
        config.experiments = { asyncWebAssembly: true, layers: true };
        return config;
      },
}

module.exports = nextConfig
