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

const post = computed(() => data.value?.posts_by_pk);
const isLoading = computed(() => fetching.value);
</script>

<template>
  <UModal v-model="isOpen">
    <Head>
      <Title v-if="!post?.profile?.account.displayName">View Post</Title>
      <Title v-else>{{ post?.profile?.account.displayName }}'s post</Title>
    </Head>

    <SkeletonPost v-if="isLoading" :details="true" />
    <Post
      v-else-if="post?.media_id"
      :profile="{
        username: post?.profile?.username!,
        account: {
          displayName: post?.profile?.account.displayName!,
          avatarUrl: post?.profile?.account.avatarUrl,
        },
      }"
      :post="{
        media_id: post?.media_id,
        caption: post?.caption,
        created_at: post?.created_at,
      }"
    />
    <div v-else>Could not load post</div>
  </UModal>
</template>
