<script setup lang="ts">
import { useQuery } from "@urql/vue";
import { graphql } from "~/gql";

const isOpen = ref(true);

// when modal closed change route to /@username
watchEffect(() => {
  if (!isOpen.value) navigateTo(`/@${route.params.username}`);
});

const route = useRoute();

const { data, fetching } = useQuery({
  query: graphql(`
    query GetPost($id: uuid!) {
      posts_by_pk(id: $id) {
        media_id
        caption
        created_at
        likes_aggregate {
          aggregate {
            count
          }
        }
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
  variables: { id: route.params.post },
});

const isLoading = computed(() => fetching.value);
</script>

<template>
  <UModal v-model="isOpen">
    <SkeletonPost v-if="isLoading" :details="true" />
    <Post
      v-else-if="data?.posts_by_pk?.media_id"
      :profile="{
        username: data?.posts_by_pk?.profile?.username!,
        account: {
          displayName: data?.posts_by_pk?.profile?.account.displayName!,
          avatarUrl: data?.posts_by_pk?.profile?.account.avatarUrl,
        },
      }"
      :post="{
        media_id: data?.posts_by_pk?.media_id,
        caption: data?.posts_by_pk?.caption,
        created_at: data?.posts_by_pk?.created_at,
      }"
    />
    <div v-else>Could not load post</div>
  </UModal>
</template>
