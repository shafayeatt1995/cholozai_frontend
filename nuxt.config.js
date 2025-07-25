export default {
  target: "static",
  server: {
    port: process.env.PORT || 8080,
    // host: "0.0.0.0"
  },
  generate: { interval: 100, fallback: true },
  head: {
    title: "cholozai",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "google-adsense-account", content: "ca-pub-4198613489910321" },
      {
        name: "google-site-verification",
        content: "mfkpXWF7Li7GQaM0sHoymIiieIEARIXGCfddV5jtGnY",
      },
      {
        property: "og:image",
        content: `${process.env.BASE_URL}/og-image.webp`,
      },
      { property: "og:site_name", content: `Cholozai` },
      { property: "og:url", content: `https://cholozai.com` },
      { property: "og:type", content: `website` },
      {
        name: "twitter:image",
        content: `${process.env.BASE_URL}/og-image.webp`,
      },
      { name: "twitter:card", content: `summary_large_image` },
      { name: "robots", content: `max-image-preview:large` },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: true,
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css",
      },
    ],
    script: [
      {
        type: "text/javascript",
        src: `/js/gtag.js`,
        head: true,
      },
      {
        type: "text/javascript",
        src: `/js/clearity.js`,
        head: true,
      },
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-GDBWZXY0BG",
        async: true,
        defer: true,
        body: true,
      },
      {
        type: "text/javascript",
        src: `/js/analytics.js`,
        body: true,
      },
    ],
  },

  css: ["~/assets/css/main.scss"],

  transition: { name: "fade", mode: "out-in" },

  plugins: [
    "@/plugins/filter.js",
    "@/plugins/slide.js",
    "@/plugins/global-variable.js",
    { src: "@/plugins/gtag.js", mode: "client" },
  ],

  components: true,

  buildModules: ["@nuxtjs/tailwindcss", "@nuxt/image", "@/modules/generator"],

  modules: ["@nuxtjs/axios", "@nuxtjs/pwa", "@nuxtjs/sitemap"],

  sitemap: {
    hostname: "https://cholozai.com",
    path: "/sitemap.xml",
    gzip: true,
    exclude: ["/dashboard/**"],
    defaults: { changefreq: "daily", priority: 1, lastmod: new Date() },
  },

  image: {
    provider: "static",
    staticFilename: "images/[name][ext]",
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      "2xl": 1536,
    },
  },

  axios: {
    baseURL: "/",
  },

  pwa: {
    manifest: {
      lang: "en",
    },
  },

  router: { middleware: ["errorHandler", "redirect"] },

  build: {
    analyze: !!process.env.ANALYZE,
    extend(config, ctx) {
      if (ctx.isClient) {
        config.devtool = "source-map";
      }
    },
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
    extractCSS: true,
  },
};
