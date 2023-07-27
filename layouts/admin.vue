<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Admin` : "Admin";
  },
});
</script>

<template>
  <div class="flex text-zinc-100">
    <div class="flex h-screen bg-neutral-900 md:w-1/3">
      <UContainer
        :ui="{
          base: 'ml-auto',
          padding: 'py-5 px-2 lg:pl-0 pr-5',
          constrained: 'max-w-2xl',
        }"
        class="justify-self-end"
      >
        <h1 class="mb-2 text-2xl">Social Administration</h1>
        <h2 class="text-xl font-bold">Pending Accounts</h2>

        <div class="flex flex-col gap-3 py-4">
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
      </UContainer>
    </div>

    <UContainer
      :ui="{ padding: 'p-5 ', constrained: 'max-w-xl px-3 lg:px-0 pt-5 grow' }"
    >
      <slot />
    </UContainer>
  </div>
</template>
