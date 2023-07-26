<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useNhostClient } from "@nhost/vue";

interface Post {
  id?: string;
  media_id: string;
  created_at?: string;
  caption?: string | null;
}

interface Profile {
  username: string;
  account: {
    displayName: string;
    avatarUrl?: string;
  };
}

const props = withDefaults(
  defineProps<{
    details?: boolean;
    link?: boolean;
    profile: Profile;
    post: Post;
  }>(),
  {
    details: true,
    link: true,
  },
);

const timeAgo = ref();
watchEffect(() => {
  if (!props.post.created_at) return;
  timeAgo.value = unref(useTimeAgo(props.post.created_at));
});

const { nhost } = useNhostClient();
const { presignedUrl, error } = await nhost.storage.getPresignedUrl({
  fileId: props.post.media_id,
  height: 512,
  width: 512,
});

if (error) {
  useErrorToast({
    id: error?.name ?? "graphql-error",
    title: error?.name,
    description: error?.message,
  });
}
</script>

<template>
  <UCard
    :ui="{
      base: 'overflow-hidden w-full ',
      background: 'bg-white/50 dark:bg-gray-900/50',
      ring: '',
      divider: '',
      body: { padding: '', base: 'relative' },
      footer: { padding: 'p-2' },
    }"
  >
    <USkeleton v-if="!presignedUrl" :ui="{ rounded: '' }" class="pb-[100%]" />
    <NuxtLink v-else-if="link && post.id" :to="`/@${profile.username}/${post.id}`">
      <img
        :src="presignedUrl.url"
        class="w-full"
        width="500"
        height="500"
        :alt="`${profile.account.displayName}'s post'`"
        loading="lazy"
      />
    </NuxtLink>
    <img
      v-else
      :src="presignedUrl.url"
      class="w-full"
      width="500"
      height="500"
      :alt="`${profile.account.displayName}'s post'`"
      loading="lazy"
    />

    <div
      v-if="details"
      class="absolute bottom-0 right-0 flex min-h-[100px] w-full flex-col justify-end bg-gradient-to-t from-black px-3 py-4 text-neutral-100"
      style="--tw-gradient-from: rgba(0, 0, 0, 0.85)"
    >
      <div class="flex w-full gap-2">
        <NuxtLink :to="`/@${profile.username}`">
          <UAvatar
            :alt="`${profile.account.displayName}'s avatar`"
            size="xl"
            class="aspect-square shrink-0"
          />
        </NuxtLink>

        <div class="flex w-full grow flex-col">
          <div class="text- flex w-full grow items-center gap-2">
            <NuxtLink :to="`/@${profile.username}`" class="text-xl font-bold">
              {{ profile.account.displayName }}
            </NuxtLink>
            <time :datetime="post.created_at">{{ timeAgo }}</time>
          </div>

          <p v-if="post.caption">{{ post.caption }} </p>
        </div>
      </div>
    </div>
  </UCard>
</template>
