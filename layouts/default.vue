<script setup lang="ts">
import { useAuthenticated, useUserData } from "@nhost/vue";
import { useQuery } from "@urql/vue";
import { graphql } from "~/gql";

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Social` : "Social";
  },
});

const isDark = useDark();
const toggleDark = useToggle(isDark);

const isAuthenticated = useAuthenticated();
const userData = useUserData();
const adminSecret = useAdminSecret();

// get my profile
const { data: profileQueryResponse, fetching: isFetchingProfile } = useQuery({
  query: graphql(`
    query GetProfileById($id: uuid!) {
      profiles_by_pk(id: $id) {
        id
        username
      }
    }
  `),
  variables: { id: userData.value!?.id },
  pause: !isAuthenticated.value,
});

const myProfile = computed(() => {
  return profileQueryResponse.value?.profiles_by_pk;
});

// if no profile, redirect to onboarding
watchEffect(() => {
  if (!myProfile.value && isAuthenticated.value && !isFetchingProfile.value)
    navigateTo("/onboarding/profile");
});

// navigation links
const links = computed(() => [
  {
    icon: "i-heroicons-home",
    to: "/",
  },
  {
    icon: "i-heroicons-user-group",
    to: "/following",
  },
  {
    icon: "i-heroicons-magnifying-glass-20-solid",
    click: () => (isSearchOpen.value = true),
  },
  {
    icon: "i-heroicons-plus",
    click: () => (isCreatePostOpen.value = true),
  },
  {
    avatar: {
      // src: userData.value?.avatarUrl,
      alt: userData.value?.displayName,
    },
    to: `/@${myProfile.value?.username}`,
  },
]);

const adminButton = computed(() => {
  if (!adminSecret.value) return {};
  return {
    icon: "i-heroicons-cog-8-tooth",
    to: "/admin",
  };
});

const extra = computed(() => [
  adminButton.value,
  {
    icon: isDark.value ? "i-heroicons-sun" : "i-heroicons-moon",
    click: () => toggleDark(),
  },
  {
    icon: "i-fa6-brands-github",
    to: "https://github.com/RihanArfan/hasura-nuxt-instagram",
  },
]);

// modal handlers
const isCreatePostOpen = useCreatePostOpen();
const isSearchOpen = useSearchOpen();

// drag and drop handler
const dropZoneRef = ref<HTMLDivElement>();
const { isOverDropZone } = useDropZone(dropZoneRef);
watchEffect(() => {
  if (isOverDropZone.value) isCreatePostOpen.value = isOverDropZone.value;
});

// page width
const route = useRoute();

const containerWidth = computed(() => {
  const layoutWidth = route.meta.layoutWidth;
  if (layoutWidth === "xl") return "max-w-4xl";
  return "max-w-2xl md:px-4";
});

const navSpacing = computed(() => {
  const layoutWidth = route.meta.layoutWidth;
  if (layoutWidth === "xl") return "ml-3 border-l  pl-2";
  return "ml-2";
});
</script>

<template>
  <div ref="dropZoneRef">
    <Body class="overscroll-x-none" />

    <UContainer
      :ui="{
        padding: 'pl-4 pr-2 sm:px-6 ',
        constrained: containerWidth,
      }"
      class="flex transition-all"
    >
      <div class="grow py-3">
        <slot />
      </div>

      <div
        class="sticky top-0 flex h-screen flex-col border-l-gray-200 transition-all dark:border-l-gray-800"
        :class="navSpacing"
      >
        <NuxtLink to="/">
          <h1
            class="mb-2 mt-6 rounded-full text-center text-4xl font-bold"
            title="Social"
          >
            S
          </h1>
        </NuxtLink>

        <UVerticalNavigation
          :links="links"
          :ui="{
            padding: 'p-2 my-3',
            icon: { base: 'flex-shrink-0 w-8 h-8 mx-2 my-1 font-bolder' },
            avatar: { size: 'lg' },
          }"
        />

        <UVerticalNavigation
          class="mt-auto"
          :links="extra"
          :ui="{
            padding: 'p-2 my-3',
            icon: { base: 'flex-shrink-0 w-8 h-8 mx-2 my-1' },
          }"
        />
      </div>
    </UContainer>

    <CreatePost v-model:open="isCreatePostOpen" />
    <Search v-model:open="isSearchOpen" />
  </div>
</template>

<style>
body {
  scrollbar-gutter: stable both-edges;
}
</style>
