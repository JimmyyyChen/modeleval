/** @type {import('next').NextConfig} */
const nextConfig = {
  // headlessui React 18 compatibility tracking issue
  // add this line of code when `npm run dev`
  // https://github.com/tailwindlabs/headlessui/issues/681
  reactStrictMode: false,

  // TODO: remove this after api is completed
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = {
  nextConfig,
  output: 'standlone',
}
