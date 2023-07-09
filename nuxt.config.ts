// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxthq/ui", "@vueuse/nuxt"],

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
    tsConfig: {
      compilerOptions: {
        moduleResolution: "bundler",
      },
    },
  },

  devtools: {
    enabled: true,
  },
});
