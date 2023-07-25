<script setup lang="ts">
import { useQuery } from "@urql/vue";
import { graphql } from "~/gql";

definePageMeta({
  layoutWidth: "xl",
});

const route = useRoute();

const { data, fetching } = useQuery({
  query: graphql(`
    query GetProfile($username: String) {
      profiles(where: { username: { _eq: $username } }) {
        id
        account {
          displayName
          avatarUrl
        }
        description
        is_private
        followers_aggregate {
          aggregate {
            count
          }
        }
        following_aggregate {
          aggregate {
            count
          }
        }
        posts_aggregate {
          aggregate {
            count
          }
        }
        posts {
          id
          media_id
        }
      }
    }
  `),
  variables: { username: route.params.username },
});

const profile = computed(() => data.value?.profiles.at(0));
</script>

<template>
  <div>
    <div
      class="my-6 flex items-center justify-between gap-8 sm:my-16 md:mx-16 md:gap-16"
    >
      <UAvatar
        size="3xl"
        :src="profile?.account.avatarUrl"
        :alt="profile?.account.displayName"
        :ui="{ size: { '3xl': 'h-24 w-24 md:h-48 md:w-48 text-6xl' } }"
      />

      <div class="flex grow flex-col gap-4">
        <h1 class="text-2xl font-bold">
          {{ profile?.account.displayName ?? `@${$route.params.username}` }}

          <UBadge v-if="profile?.account.displayName" color="black">
            @{{ $route.params.username }}
          </UBadge>
        </h1>

        <div class="mb-2 flex justify-between">
          <ProfileStat
            :name="'Posts'"
            :value="profile?.posts_aggregate.aggregate?.count ?? '0'"
          />
          <ProfileStat
            :name="'Followers'"
            :value="profile?.followers_aggregate.aggregate?.count ?? '0'"
          />
          <ProfileStat
            :name="'Following'"
            :value="profile?.following_aggregate.aggregate?.count ?? '0'"
          />
        </div>

        <h2 v-if="profile?.description" class="text-lg">
          {{ profile?.description }}
        </h2>
        <div v-else class="flex flex-col gap-2">
          <USkeleton class="h-3 w-[225px]" />
          <USkeleton class="h-3 w-[275px]" />
        </div>
      </div>
    </div>

    <div class="grid gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-2">
      <template v-if="fetching">
        <template v-for="x in 6" :key="x">
          <SkeletonPost :details="false" />
        </template>
      </template>
      <template v-else>
        <NuxtLink
          v-for="post in profile?.posts"
          :key="post.id"
          :to="`/@${$route.params.username}/${post.id}`"
        >
          <Post
            :post="{ media_id: post.media_id }"
            :profile="{
              username: $route.params.username,
              account: {
                displayName: profile?.account.displayName!,
                avatarUrl: profile?.account.avatarUrl,
              },
            }"
            :details="false"
          />
        </NuxtLink>
      </template>
    </div>

    <NuxtPage :foobar="123" />
  </div>
</template>
