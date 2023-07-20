// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxthq/ui", "@vueuse/nuxt", "@vee-validate/nuxt"],

  ui: {
    icons: ["heroicons", "fa6-brands"],
  },

  runtimeConfig: {
    public: {
      nhostSubdomain: "",
      nhostRegion: "",
    },
  },

  experimental: {
    typedPages: true,
  },

  devtools: {
    enabled: true,
  },
});
