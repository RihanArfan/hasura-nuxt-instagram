<script setup lang="ts">
import { graphql } from "~/gql";
import { type FragmentType, useFragment } from "~/gql/fragment-masking";

const PendingProfileListItemFragment = graphql(/* GraphQL */ `
  fragment PendingListItem_ProfileFragment on profiles {
    id
    username
    account {
      displayName
    }
  }
`);

const props = defineProps<{
  profile: FragmentType<typeof PendingProfileListItemFragment>;
}>();

const profileObj = useFragment(PendingProfileListItemFragment, props.profile);
</script>

<template>
  <NuxtLink :to="`/admin/@${profileObj.username}`">
    <UCard
      :ui="{
        body: { padding: 'p-3', base: 'flex items-center gap-5' },
        background:
          'bg-white dark:bg-zinc-800 hover:bg-primary-500 dark:hover:bg-primary-500 text-zinc-500 hover:text-white transition-all',
        ring: '',
        shadow: '',
      }"
    >
      <UAvatar
        :alt="profileObj.account.displayName"
        size="md"
        :ui="{ background: 'bg-gray-100 dark:bg-zinc-900' }"
      />
      <p
        class="truncate text-xl font-semibold text-zinc-900 dark:text-zinc-100"
      >
        {{ profileObj.account.displayName }}
      </p>
      <p class="ml-auto hidden truncate lg:block">@{{ profileObj.username }}</p>
    </UCard>
  </NuxtLink>
</template>
