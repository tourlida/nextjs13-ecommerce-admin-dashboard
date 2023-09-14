/** @type {import('next').NextConfig} */
const nextConfig = {
   images:{
    domains:  ["res.cloudinary.com"]
   },
   webpack: (config, { isServer }) => {
    // The fallback for fs is usually to handle "Can't resolve 'fs'" error for client-side.
    // It indicates some package or part of your code is trying to use fs (File System module) on the client-side, which isn't available.
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false
      };
    }
    return config;
  }
}

module.exports = nextConfig
