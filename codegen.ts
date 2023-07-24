import type { CodegenConfig } from "@graphql-codegen/cli";
import { NhostClient } from "@nhost/vue";
import * as dotenv from "dotenv";

dotenv.config();

const nhost = new NhostClient({
  subdomain: process.env.NUXT_PUBLIC_NHOST_SUBDOMAIN,
  region: process.env.NUXT_PUBLIC_NHOST_REGION,
});

const config: CodegenConfig = {
  schema: {
    [nhost.graphql.httpUrl]: {
      headers: {
        "x-hasura-admin-secret": process.env.NHOST_HASURA_SECRET!,
      },
    },
  },
  documents: ["pages/**/*.vue", "components/**/*.vue", "composables/**/*.ts"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./gql/": {
      preset: "client",
      config: {
        useTypeImports: true,
      },
    },
    "./gql/introspection.ts": {
      plugins: ["urql-introspection"],
    },
  },
};

export default config;
