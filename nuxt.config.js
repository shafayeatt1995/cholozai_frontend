export default {
  target: "static",
  server: { port: process.env.PORT || 8080 },
  generate: { interval: 100 },
  head: {
    title: "cholozai",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "google-site-verification",
        content: "mfkpXWF7Li7GQaM0sHoymIiieIEARIXGCfddV5jtGnY",
      },
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
        rel: "preload",
        href: "https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap",
        as: "style",
        onload: "this.onload=null;this.rel='stylesheet'",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap",
        media: "print",
        onload: "this.media='all'",
      },
      {
        rel: "preload",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css",
        as: "style",
        onload: "this.onload=null;this.rel='stylesheet'",
      },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css",
        media: "print",
        onload: "this.media='all'",
      },
    ],
    script: [
      {
        type: "text/javascript",
        src: `/js/gtag.js`,
        head: true,
      },
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-GDBWZXY0BG",
        async: true,
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

  plugins: [
    "@/plugins/filter.js",
    "@/plugins/slide.js",
    { src: "@/plugins/gtag.js", mode: "client" },
  ],

  components: true,

  buildModules: ["@nuxtjs/tailwindcss", "@nuxt/image", "@/modules/generator"],

  modules: ["@nuxtjs/axios", "@nuxtjs/pwa", "@nuxtjs/sitemap"],

  sitemap: {
    hostname: "https://cholozai.com",
    path: "/sitemap.xml",
    gzip: true,
    exclude: [],
    defaults: { changefreq: "monthly", priority: 1, lastmod: new Date() },
  },

  image: {
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
