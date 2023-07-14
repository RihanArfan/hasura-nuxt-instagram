import { NhostClient } from "@nhost/vue";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const nhost = new NhostClient({
    subdomain: config.public.nhostSubdomain,
    region: config.public.nhostRegion,
  });

  nuxtApp.vueApp.use(nhost);
  return { provide: { nhost } };
});
