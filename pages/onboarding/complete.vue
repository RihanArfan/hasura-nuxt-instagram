<script setup lang="ts">
import { useUserDisplayName } from "@nhost/vue";

useHead({ title: "Welcome" });
definePageMeta({ layout: "steps" });

const userDisplayName = useUserDisplayName();
const firstName = computed(() => userDisplayName.value?.split(" ")[0]);
</script>

<template>
  <div class="flex h-screen w-full flex-col items-center justify-center px-3">
    <UCard class="px-5 py-2 sm:w-[470px]">
      <div class="text-center">
        <h1 class="mb-2 text-2xl font-bold">Social</h1>
        <h2 class="mb-8 text-xl">
          Welcome to Social<template v-if="userDisplayName"
            >, {{ firstName }} </template
          >!
        </h2>

        <UIcon name="i-heroicons-check-circle" class="mb-5 text-9xl" />

        <p class="mb-10 text-neutral-600 dark:text-neutral-400">
          Your profile will be visible after admin approval. <br />You can still
          upload posts and follow other users.
        </p>
      </div>

      <div class="mt-7 flex items-center justify-end">
        <NuxtLink to="/">
          <UButton color="gray" variant="link">Go to feed</UButton>
        </NuxtLink>

        <NuxtLink to="/post">
          <UButton
            label="Create post"
            class="ms-5 basis-2/5"
            size="xl"
            block
            type="submit"
            trailing-icon="i-heroicons-arrow-right-20-solid"
            :loading="false"
          />
        </NuxtLink>
      </div>
    </UCard>
  </div>
</template>
