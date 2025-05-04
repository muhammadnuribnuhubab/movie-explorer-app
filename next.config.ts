// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['image.tmdb.org'],
    loader: 'imgix',
    path: '',
  },
};

module.exports = nextConfig;
