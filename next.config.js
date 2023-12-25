/** @type {import('next').NextConfig} */
const nextConfig = {
  // headlessui React 18 compatibility tracking issue
  // add this line of code when `npm run dev`
  // https://github.com/tailwindlabs/headlessui/issues/681
  reactStrictMode: false,

};

module.exports = nextConfig
