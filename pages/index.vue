<script setup lang="ts">
import { useQuery } from "@urql/vue";
import { graphql } from "~/gql";

const { data, fetching } = useQuery({
  query: graphql(`
    query GetPosts {
      posts(order_by: { created_at: desc }) {
        id
        media_id
        caption
        created_at
        profile {
          username
          account {
            displayName
            avatarUrl
          }
        }
      }
    }
  `),
});
</script>

<template>
  <div class="flex flex-col items-center gap-3">
    <template v-if="fetching">
      <SkeletonPost v-for="i in 10" :key="i" />
    </template>

    <Post
      v-for="post in data?.posts"
      :key="post.id"
      :post="post"
      :profile="post.profile!"
    />
  </div>
</template>
