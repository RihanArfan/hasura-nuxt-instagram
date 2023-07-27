<script setup lang="ts">
import { useQuery, useMutation } from "@urql/vue";
import { graphql } from "~/gql";

definePageMeta({ layout: "admin", middleware: ["admin"] });
const route = useRoute();
const adminSecret = useAdminSecret();

const context = {
  fetchOptions: { headers: { "x-hasura-admin-secret": adminSecret.value } },
};

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
        is_admin_approved
        is_following
        is_requested_following
        followers_aggregate(where: { is_accepted: { _eq: true } }) {
          aggregate {
            count
          }
        }
        following_aggregate(where: { is_accepted: { _eq: true } }) {
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
  variables: { username: route.params.username! },
  context,
});

const profile = computed(() => data.value?.profiles.at(0));
const username = computed(() => route.params.username);

// approve
const approveProfileResult = useMutation(
  graphql(`
    mutation ApproveProfile($id: uuid!) {
      update_profiles_by_pk(
        pk_columns: { id: $id }
        _set: { is_admin_approved: true }
      ) {
        is_admin_approved
      }
    }
  `),
);

const isApproved = ref(false);
const followProfile = async () => {
  const variables = { id: profile.value?.id };
  const { data, error } = await approveProfileResult.executeMutation(variables);
  if (error) useErrorToast({ id: error?.name, description: error?.message });
  isApproved.value = !!data?.update_profiles_by_pk?.is_admin_approved;
};

const isFetching = computed(() => approveProfileResult.fetching.value);
</script>

<template>
  <div>
    <div class="my-6 flex items-center justify-between gap-8 sm:my-16">
      <UAvatar
        size="3xl"
        :alt="profile?.account.displayName"
        :ui="{ size: { '3xl': 'h-24 w-24 md:h-48 md:w-48 text-6xl' } }"
      />

      <div class="flex grow flex-col gap-4">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold">
            {{ profile?.account.displayName ?? `@${username}` }}
          </h1>

          <UButton
            v-if="!profile?.is_admin_approved && !isApproved"
            class="px-6"
            :loading="isFetching"
            @click="followProfile"
          >
            Approve
          </UButton>
          <UButton v-else class="px-6" color="gray" disabled>Approved</UButton>
        </div>

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
        <Post
          v-for="post in profile?.posts"
          :key="post.id"
          :post="{ media_id: post.media_id }"
          :profile="{
            username: username,
            account: {
              displayName: profile?.account.displayName!,
              avatarUrl: profile?.account.avatarUrl,
            },
          }"
          :details="false"
          :link="false"
        />
      </template>
    </div>
  </div>
</template>
