<script setup lang="ts">
import { useUserData } from "@nhost/vue";
import { useQuery, useMutation } from "@urql/vue";
import { graphql } from "~/gql";

definePageMeta({
  layoutWidth: "xl",
});

const route = useRoute();
const userData = useUserData();

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
});

const profile = computed(() => data.value?.profiles.at(0));
const username = computed(() => route.params.username);
const isMyProfile = computed(() => profile.value?.id === userData.value?.id);

// follow
const createFollowerResult = useMutation(
  graphql(`
    mutation FollowProfile($profile: uuid!) {
      insert_following_one(object: { following_profile_id: $profile }) {
        is_accepted
      }
    }
  `),
);

const isRequested = ref(false);
const isAccepted = ref(false);
const followProfile = async () => {
  isRequested.value = true;

  const variables = { profile: profile.value?.id };
  const { data, error } = await createFollowerResult.executeMutation(variables);
  if (error) useErrorToast({ id: error?.name, description: error?.message });

  if (!data?.insert_following_one?.is_accepted) return;
  isAccepted.value = true;
  isRequested.value = false;
};

// unfollow or cancel request
const deleteFollowerResult = useMutation(
  graphql(`
    mutation UnfollowProfile($profile: uuid!, $myProfile: uuid!) {
      delete_following_by_pk(
        follower_profile_id: $myProfile
        following_profile_id: $profile
      ) {
        created_at
      }
    }
  `),
);

const isUnfollowed = ref(false);
const unfollowProfile = async () => {
  isUnfollowed.value = true;
  isRequested.value = false;
  isAccepted.value = false;

  const variables = {
    profile: profile.value?.id,
    myProfile: userData.value?.id,
  };
  const { error } = await deleteFollowerResult.executeMutation(variables);
  if (error) useErrorToast({ id: error?.name, description: error?.message });
};
</script>

<template>
  <div>
    <Head>
      <Title>{{ profile?.account.displayName ?? `@${username}` }}</Title>
    </Head>

    <UNotification
      v-if="isMyProfile && !profile?.is_admin_approved"
      icon="i-heroicons-information-circle"
      title="Profile pending approval"
      description="Your profile will be visible after admin approval. You can still upload posts and follow other users."
      class="mb-3"
      :close-button="false"
      timeout="0"
    />

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
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-bold">
              {{ profile?.account.displayName ?? `@${username}` }}
            </h1>

            <p
              v-if="profile?.account.displayName"
              class="pt-1 text-xs font-semibold"
            >
              @{{ username }}
            </p>
          </div>

          <template v-if="!isMyProfile">
            <UButtonGroup
              v-if="(profile?.is_following && !isUnfollowed) || isAccepted"
              size="sm"
            >
              <UButton label="Following" color="gray" disabled />
              <UButton
                icon="i-heroicons-x-mark-20-solid"
                color="gray"
                @click="unfollowProfile"
              />
            </UButtonGroup>

            <UButtonGroup
              v-else-if="profile?.is_requested_following || isRequested"
              size="sm"
            >
              <UButton label="Requested" color="white" disabled />
              <UButton
                icon="i-heroicons-x-mark-20-solid"
                color="gray"
                @click="unfollowProfile"
              />
            </UButtonGroup>

            <UButton
              v-else-if="
                (!profile?.is_following && !profile?.is_requested_following) ||
                isUnfollowed
              "
              class="px-6"
              @click="followProfile"
            >
              Follow
            </UButton>
          </template>
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

    <div
      v-if="!profile && !fetching"
      class="flex h-32 flex-col items-center justify-center text-center text-xl"
    >
      <UIcon name="i-heroicons-question-mark-circle" class="mb-2 text-6xl" />
      <p>Profile does not exist</p>
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
          :to="`/@${username}/${post.id}`"
        >
          <Post
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
        </NuxtLink>
      </template>
    </div>

    <NuxtPage :foobar="123" />
  </div>
</template>
