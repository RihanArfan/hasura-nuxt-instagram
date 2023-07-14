import { createClient, ssrExchange, fetchExchange } from "@urql/core";
import { type Exchange, cacheExchange, subscriptionExchange } from "@urql/vue";
import {
  type SubscribePayload,
  createClient as createWSClient,
} from "graphql-ws";
import { ref, defineNuxtPlugin, useNuxtApp } from "#imports";

// import introspection from "~/gql/introspection";

const ssrKey = "__URQL_DATA__";

// see: https://github.com/nhost/nhost/blob/main/integrations/react-urql/src/provider.tsx
// see: https://github.com/holwech/supabase-nuxt-graphql-demo/blob/main/plugins/urql.ts
// see: https://github.com/gbicou/nuxt3-urql/blob/main/plugins/urql.ts
export default defineNuxtPlugin((nuxt) => {
  const { $nhost } = useNuxtApp();
  const accessToken = $nhost.auth.getAccessToken();

  // ssr client hydration
  const ssr = ssrExchange({
    isClient: process.client,
  });

  if (process.client) {
    nuxt.hook("app:created", () => {
      ssr.restoreData(nuxt.payload.data[ssrKey]);
    });
  }

  if (process.server) {
    nuxt.hook("app:rendered", () => {
      nuxt.payload.data[ssrKey] = ssr.extractData();
    });
  }

  // auth headers
  // not using authExchange as @nhost/react-urql doesn't, presumably so graphql requests can be made as annonymous
  const getHeaders = () => {
    const resHeaders = {
      "Sec-WebSocket-Protocol": "graphql-ws",
    } as { [header: string]: string };

    if (accessToken) {
      resHeaders.authorization = `Bearer ${accessToken}`;
    }

    return resHeaders;
  };

  // urql exchanges
  let exchanges: Exchange[] = [
    // cacheExchange({
    //   schema: introspection,
    // }),
    ssr,
    fetchExchange,
  ];

  // support subscriptions
  if (process.client) {
    // Close the active socket when token changes.
    // The WebSocket client will automatically reconnect with the new access token.
    // see: https://github.com/nhost/nhost/blob/main/integrations/react-urql/src/provider.tsx#L75

    let activeSocket: any;
    $nhost.auth.onTokenChanged(() => {
      if (!activeSocket) return;
      activeSocket.close();
    });

    // see: https://the-guild.dev/graphql/ws/recipes#client-usage-with-urql
    const wsClient = createWSClient({
      url: $nhost.graphql.url.replace("http", "ws"),
      connectionParams() {
        return { headers: { ...getHeaders() } };
      },
      on: { connected: (socket) => (activeSocket = socket) },
    });

    exchanges = [
      ...exchanges,
      subscriptionExchange({
        forwardSubscription: (operation) => ({
          subscribe: (sink) => {
            const dispose = wsClient.subscribe(
              operation as SubscribePayload,
              sink
            );
            return { unsubscribe: dispose };
          },
        }),
      }),
    ];
  }

  const client = createClient({
    url: $nhost.graphql.url,
    requestPolicy: "cache-and-network",
    exchanges,
    fetchOptions: () => ({
      headers: getHeaders(),
    }),
  });

  nuxt.vueApp.provide("$urql", ref(client));
  return { provide: { urql: client } };
});
