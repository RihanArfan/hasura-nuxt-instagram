<script setup lang="ts"></script>

<template>
  <div
    class="flex h-screen w-full flex-col items-center justify-center px-3 text-center"
  >
    <UCard class="px-5 py-2 sm:w-[470px]">
      <h1 class="mb-2 text-2xl font-bold">Rihan Social</h1>
      <h2 class="mb-10 text-xl">Login into to continue</h2>

      <UInput
        icon="i-heroicons-user"
        placeholder="Username"
        size="xl"
        color="white"
        :trailing="false"
        class="mb-6 py-4"
      />

      <div class="mt-7 flex items-center justify-end">
        <UButton color="gray" variant="link">Create an account</UButton>
        <UButton class="ms-5 basis-2/5" size="xl" block label="Log in">
          <template #trailing>
            <UIcon name="i-heroicons-arrow-right-20-solid" />
          </template>
        </UButton>
      </div>
    </UCard>
  </div>
</template>
