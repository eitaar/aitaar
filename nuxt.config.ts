export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  target: "static",
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@nuxtjs/google-fonts",
    "@pinia-plugin-persistedstate/nuxt",
    "@pinia/nuxt",
  ],
  gsap: {
    extraPlugins: {
      scrollTo: true,
      scrollTrigger: true,
      pixi: true,
    },
  },
  googleFonts: {
    families: {
      Roboto: true,
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "AItaar AI",
      charset: "utf-8",
      meta: [
        { name: "description", content: "AItaar" },
        { name: "author", content: "eitaar" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { property: "og:title", content: "AItaar | A super intelegent AI" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://eitaar.dev" },
        { property: "og:image", content: "https://eitaar.dev/logo.png" },
        { property: "og:site_name", content: "AItaar" },
        { property: "og:locale", content: "en_US" },
      ],
    },
  },

  compatibilityDate: "2024-12-15",
});
