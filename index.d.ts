import type { NhostClient } from "@nhost/vue";

declare module "#app" {
  interface NuxtApp {
    $nhost: NhostClient;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $nhost: NhostClient;
  }
}

export {};
