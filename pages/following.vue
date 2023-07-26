<script setup lang="ts">
import { useUserData } from "@nhost/vue";
import { useQuery } from "@urql/vue";
import { graphql } from "~/gql";

useHead({ title: "Following" });

const userData = useUserData();

const { data, fetching } = useQuery({
  query: graphql(`
    query GetFollowingPosts($profile: uuid!) {
      posts(
        order_by: { created_at: desc }
        where: {
          profile: { followers: { followerProfile: { id: { _eq: $profile } } } }
        }
      ) {
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
  variables: { profile: userData.value!?.id },
});
</script>

<template>
  <div class="flex flex-col items-center gap-3">
    <template v-if="fetching">
      <SkeletonPost v-for="i in 10" :key="i" />
    </template>

    <div
      v-if="!data?.posts.length && !fetching"
      class="flex h-[calc(100vh-4rem)] flex-col items-center justify-center text-center text-xl"
    >
      <UIcon name="i-heroicons-information-circle" class="mb-5 text-6xl" />
      <p>Posts from accounts you follow will show here</p>
    </div>

    <Post
      v-for="post in data?.posts"
      :key="post.id"
      :post="{
        media_id: post.media_id,
        caption: post.caption,
        created_at: post.created_at,
      }"
      :profile="{
        username: post.profile?.username!,
        account: {
          displayName: post.profile?.account.displayName!,
          avatarUrl: post.profile?.account.avatarUrl,
        },
      }"
    />
  </div>
</template>
