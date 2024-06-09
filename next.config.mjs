/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: config => {
    config.module.rules.push({
      test: /\.test\.(js|jsx|ts|tsx)$/,
      loader: 'ignore-loader',
    });
    return config;
  },
};

export default nextConfig;
