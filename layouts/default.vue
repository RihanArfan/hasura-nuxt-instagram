<script setup lang="ts">
import { useUserAvatarUrl, useUserDisplayName } from "@nhost/vue";

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Social` : "Social";
  },
});

const isDark = useDark();
const toggleDark = useToggle(isDark);

const userAvatarUrl = useUserAvatarUrl();
const userDisplayName = useUserDisplayName();

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
    to: "/search",
  },
  {
    icon: "i-heroicons-plus",
    to: "/post",
  },
  {
    avatar: {
      src: userAvatarUrl.value,
      alt: userDisplayName.value,
    },
    to: "/profile",
  },
]);

const extra = computed(() => [
  {
    icon: isDark.value ? "i-heroicons-sun" : "i-heroicons-moon",
    click: () => toggleDark(),
  },
  {
    icon: "i-fa6-brands-github",
    to: "https://github.com/RihanArfan/hasura-nuxt-instagram",
  },
]);
</script>

<template>
  <div>
    <Body class="overscroll-x-none" />

    <UContainer
      :ui="{
        padding: 'pl-4 pr-2 sm:px-6',
        constrained: 'max-w-xl xl:max-w-2xl',
      }"
      class="flex"
    >
      <div class="grow py-3">
        <slot />
      </div>

      <div class="sticky top-0 ml-2 flex h-screen flex-col py-3">
        <NuxtLink to="/">
          <h1
            class="mb-2 rounded-full text-center text-4xl font-bold"
            title="Social"
          >
            S
          </h1>
        </NuxtLink>

        <UVerticalNavigation
          :links="links"
          :ui="{
            padding: 'p-2',
            icon: { base: 'flex-shrink-0 w-8 h-8 mx-2 my-1 font-bolder' },
            avatar: { size: 'lg' },
          }"
        />

        <UVerticalNavigation
          class="mt-auto"
          :links="extra"
          :ui="{
            padding: 'p-2',
            icon: { base: 'flex-shrink-0 w-8 h-8 mx-2 my-1' },
          }"
        />
      </div>
    </UContainer>
  </div>
</template>
