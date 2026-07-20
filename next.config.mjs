/** @type {import('next').NextConfig} */

const SECURITY_HEADERS = [

  { key: "X-Frame-Options", value: "DENY" },

  { key: "X-Content-Type-Options", value: "nosniff" },

  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

  {

    key: "Permissions-Policy",

    value: "camera=(), microphone=(), geolocation=()",

  },

  { key: "X-DNS-Prefetch-Control", value: "on" },

];



const nextConfig = {

  experimental: {

    serverActions: {

      bodySizeLimit: "2mb",

    },

  },

  async headers() {

    return [

      {

        source: "/downloads/:path*",

        headers: [

          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },

          ...SECURITY_HEADERS,

        ],

      },

      {

        source: "/_next/static/:path*",

        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],

      },

      {

        source: "/pathways/:path*",

        headers: [

          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },

          ...SECURITY_HEADERS,

        ],

      },

      {

        source: "/shop/:path*",

        headers: [

          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },

          ...SECURITY_HEADERS,

        ],

      },

      {

        source: "/icon.svg",

        headers: [

          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },

          ...SECURITY_HEADERS,

        ],

      },

      {

        source: "/:path*",

        headers: SECURITY_HEADERS,

      },

    ];

  },

  async redirects() {

    return [

      {

        source: "/academy",

        destination: "/school",

        permanent: true,

      },

      {

        source: "/academy/:path*",

        destination: "/school/:path*",

        permanent: true,

      },

      {

        source: "/es/academy",

        destination: "/es/school",

        permanent: true,

      },

      {

        source: "/es/academy/:path*",

        destination: "/es/school/:path*",

        permanent: true,

      },

      {

        source: "/qwa",

        destination: "/college/quantum-workforce",

        permanent: true,

      },

      {

        source: "/es/qwa",

        destination: "/es/college/quantum-workforce",

        permanent: true,

      },

      {

        source: "/college/ux-digital-product-design",

        destination: "/college/digital-marketing-business",

        permanent: true,

      },

      {

        source: "/college/ux-digital-product-design/:path*",

        destination: "/college/digital-marketing-business/:path*",

        permanent: true,

      },

      {

        source: "/es/college/ux-digital-product-design",

        destination: "/es/college/digital-marketing-business",

        permanent: true,

      },

      {

        source: "/es/college/ux-digital-product-design/:path*",

        destination: "/es/college/digital-marketing-business/:path*",

        permanent: true,

      },

      {

        source: "/school/girls-stem-creative-impact",

        destination: "/school/creative-tech-social-impact-teens",

        permanent: true,

      },

      {

        source: "/es/school/girls-stem-creative-impact",

        destination: "/es/school/creative-tech-social-impact-teens",

        permanent: true,

      },

      {

        source: "/pt/shop",

        destination: "/shop",

        permanent: true,

      },

      {

        source: "/pt/shop/:path*",

        destination: "/shop/:path*",

        permanent: true,

      },

    ];

  },

};



export default nextConfig;

