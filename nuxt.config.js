export default {
  target: "static",
  server: { port: process.env.PORT || 8080 },
  generate: { interval: 100 },
  head: {
    title: "cholozai",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css",
      },
    ],
    script: [
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-GDBWZXY0BG",
        async: true,
      },
      {
        src: "https://cholozai.com/js/analytics.js",
      },
    ],
  },

  css: ["~/assets/css/main.scss"],

  plugins: ["@/plugins/filter.js", "@/plugins/slide.js"],

  components: true,

  buildModules: ["@nuxtjs/tailwindcss"],

  modules: ["@nuxtjs/axios", "@nuxtjs/pwa", "@nuxt/image"],

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
