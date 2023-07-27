<script setup lang="ts">
import { useQuery } from "@urql/vue";
import { graphql } from "~/gql";

useHead({
  title: "Approve accounts",
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Admin` : "Admin";
  },
});

const isDark = useDark();
const toggleDark = useToggle(isDark);
const config = useRuntimeConfig();
const adminSecret = useAdminSecret();

const extra = computed(() => [
  {
    label: "Toggle dark mode",
    icon: isDark.value ? "i-heroicons-sun" : "i-heroicons-moon",
    click: () => toggleDark(),
  },
  {
    label: "Back to Social",
    icon: "i-heroicons-arrow-long-left-20-solid",
    to: "/",
  },
]);

const { data: profilesQueryResponse, fetching: isFetchingProfiles } = useQuery({
  query: graphql(`
    query GetPendingProfiles {
      profiles(where: { is_admin_approved: { _eq: false } }) {
        id
        ...PendingListItem_ProfileFragment
      }
    }
  `),
  context: {
    fetchOptions: { headers: { "x-hasura-admin-secret": adminSecret.value } },
  },
});
</script>

<template>
  <div class="flex text-zinc-900 dark:text-zinc-100">
    <div class="flex h-screen bg-neutral-100 dark:bg-neutral-900 md:w-1/3">
      <UContainer
        :ui="{
          base: 'ml-auto flex flex-col',
          padding: 'py-5 px-2 lg:pl-0 pr-5',
          constrained: 'max-w-2xl ',
        }"
        class="justify-self-end"
      >
        <h1 class="mb-2 text-2xl">Social Administration</h1>
        <h2 class="text-xl font-bold">Pending Accounts</h2>

        <div class="flex w-[320px] grow flex-col gap-3 py-4">
          <template v-if="profilesQueryResponse?.profiles">
            <AdminPendingAccountLink
              v-for="profile in profilesQueryResponse?.profiles"
              :key="profile.id"
              :profile="profile"
            />
          </template>

          <p v-else>No Pending Profiles</p>
        </div>

        <UVerticalNavigation :links="extra" />
      </UContainer>
    </div>

    <UContainer
      :ui="{ padding: 'p-5 ', constrained: 'max-w-xl px-3 lg:px-0 pt-5 grow' }"
    >
      <slot />
    </UContainer>
  </div>
</template>
