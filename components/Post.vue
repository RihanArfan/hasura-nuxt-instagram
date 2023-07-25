<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useNhostClient } from "@nhost/vue";

interface Post {
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
    details: boolean;
    profile: Profile;
    post: Post;
  }>(),
  {
    details: true,
  },
);

const timeAgo = ref();
watchEffect(() => {
  if (!props.post.created_at) return;
  timeAgo.value = useTimeAgo(props.post.created_at);
});

const { nhost } = useNhostClient();
const { presignedUrl, error } = await nhost.storage.getPresignedUrl({
  fileId: props.post.media_id,
  height: 512,
  width: 512,
});
</script>

<template>
  <UCard
    :ui="{
      base: 'overflow-hidden w-full',
      background: 'bg-white/50 dark:bg-gray-900/50',
      ring: '',
      divider: '',
      body: { padding: '' },
      footer: { padding: 'p-2' },
    }"
  >
    <USkeleton v-if="!presignedUrl" :ui="{ rounded: '' }" class="pb-[100%]" />
    <img
      v-else
      :src="presignedUrl.url"
      class="w-full"
      width="500"
      height="500"
      :alt="`${profile.account.displayName}'s post'`"
      loading="lazy"
    />

    <template v-if="details" #footer>
      <div class="flex gap-2">
        <UAvatar
          :alt="`${profile.account.displayName}'s avatar`"
          size="md"
          class="aspect-square shrink-0"
        />

        <div class="flex flex-col">
          <div class="flex gap-2 text-xs text-gray-500">
            <span
              class="text-md font-bold text-neutral-700 dark:text-neutral-300"
            >
              {{ profile.username }}
            </span>
            <span>@{{ profile.username }}</span>
            <time :datetime="post.created_at">{{ timeAgo }}</time>
          </div>

          <p v-if="post.caption" class="text-neutral-900 dark:text-neutral-100">
            {{ post.caption }}
          </p>
        </div>
      </div>
    </template>
  </UCard>
</template>
