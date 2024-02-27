/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/presenter",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
