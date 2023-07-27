<template>
  <NuxtLink to="/">
    <UCard
      :ui="{
        body: { padding: 'p-3', base: 'flex items-center gap-5' },
        background:
          'bg-white dark:bg-zinc-800 hover:bg-primary-500 dark:hover:bg-primary-500 text-zinc-500 hover:text-white transition-all',
        ring: '',
        shadow: '',
      }"
    >
      <UAvatar src="https://github.com/RihanArfan.png" alt="Avatar" size="md" />
      <p class="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
        Rihan Arfan
      </p>
      <p class="hidden truncate lg:block">@rihanarfan</p>
    </UCard>
  </NuxtLink>
</template>
