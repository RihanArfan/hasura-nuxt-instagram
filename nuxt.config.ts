// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxthq/ui", "@vueuse/nuxt", "@vee-validate/nuxt"],

  runtimeConfig: {
    public: {
      nhostSubdomain: "",
      nhostRegion: "",
    },
  },

  experimental: {
    typedPages: true,
  },

  typescript: {
    strict: true,
  },

  devtools: {
    enabled: true,
  },
});
