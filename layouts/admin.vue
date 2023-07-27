<script setup lang="ts">
useHead({
  title: "Approve accounts",
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Admin` : "Admin";
  },
});

const isDark = useDark();
const toggleDark = useToggle(isDark);

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
</script>

<template>
  <div class="flex text-zinc-900 dark:text-zinc-100">
    <div class="flex h-screen bg-neutral-100 dark:bg-neutral-900 md:w-1/3">
      <UContainer
        :ui="{
          base: 'ml-auto flex flex-col',
          padding: 'py-5 px-2 lg:pl-0 pr-5',
          constrained: 'max-w-2xl',
        }"
        class="justify-self-end"
      >
        <h1 class="mb-2 text-2xl">Social Administration</h1>
        <h2 class="text-xl font-bold">Pending Accounts</h2>

        <div class="flex grow flex-col gap-3 py-4">
          <NuxtLink v-for="x in 5" :key="x" to="/">
            <UCard
              :ui="{
                body: { padding: 'p-3', base: 'flex items-center gap-5' },
              }"
            >
              <UAvatar
                src="https://github.com/RihanArfan.png"
                alt="Avatar"
                size="md"
              />
              <p class="text-xl font-semibold">Rihan Arfan</p>
              <p class="hidden truncate text-zinc-500 lg:block">@rihanarfan</p>
            </UCard>
          </NuxtLink>
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
