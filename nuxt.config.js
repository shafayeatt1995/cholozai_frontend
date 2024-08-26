export default {
  target: "static",
  server: {
    port: process.env.PORT || 8080,
  },
  head: {
    title: "cholozai",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  css: ["~/assets/css/main.scss"],

  plugins: [],

  components: true,

  buildModules: ["@nuxtjs/tailwindcss"],

  modules: ["@nuxtjs/axios", "@nuxtjs/pwa"],

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
