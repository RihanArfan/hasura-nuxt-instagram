<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useQuery } from "@urql/vue";
import { graphql } from "~/gql";

const isOpen = defineModel<boolean>("open", { default: false });
const query = ref("");

const searchQuery = computed(() => `%${query.value}%`);

const { data, fetching } = useQuery({
  query: graphql(`
    query SearchProfiles($query: String) {
      profiles(
        where: {
          _or: {
            username: { _ilike: $query }
            account: { displayName: { _ilike: $query } }
          }
        }
      ) {
        id
        username
        account {
          displayName
        }
      }
    }
  `),
  variables: { query: searchQuery },
});
</script>

<template>
  <UModal v-model="isOpen">
    <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <h2 class="text-2xl font-semibold">Search profiles</h2>
      </template>

      <UInput
        v-model="query"
        icon="i-heroicons-magnifying-glass-20-solid"
        placeholder="Profile name"
        size="xl"
        color="white"
        :trailing="false"
        class="py-4"
      />

      <div
        v-if="!data?.profiles?.length && !fetching && query"
        class="my-10 flex h-16 flex-col items-center justify-center text-center text-xl"
      >
        <UIcon name="i-heroicons-question-mark-circle" class="mb-3 text-6xl" />
        <p>No profiles found</p>
      </div>

      <div v-if="query" class="mt-3">
        <NuxtLink
          v-for="profile in data?.profiles"
          :key="profile.id"
          :to="`/@${profile.username}`"
          @click="isOpen = false"
        >
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
              :alt="profile.account.displayName"
              size="md"
              :ui="{ background: 'bg-gray-100 dark:bg-zinc-900' }"
            />
            <p
              class="truncate text-xl font-semibold text-zinc-900 dark:text-zinc-100"
            >
              {{ profile.account.displayName }}
            </p>
            <p class="ml-auto truncate">@{{ profile.username }}</p>
          </UCard>
        </NuxtLink>
      </div>
    </UCard>
  </UModal>
</template>
