// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxthq/ui", "@vueuse/nuxt"],

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