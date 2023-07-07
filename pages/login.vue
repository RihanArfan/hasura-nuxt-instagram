<script setup lang="ts"></script>

<template>
  <div class="w-full h-screen flex flex-col justify-center items-center px-3">
    <h1 class="font-bold text-2xl mb-5">Rihan Social</h1>

    <UCard class="w-full sm:w-2/3 md:w-1/3">
      <UInput
        icon="i-heroicons-user"
        placeholder="Username"
        size="lg"
        color="white"
        :trailing="false"
        class="mb-3"
      />

      <UInput
        icon="i-heroicons-lock-closed"
        placeholder="Password"
        size="lg"
        color="white"
        :trailing="false"
      />

      <div class="mt-4 flex items-center">
        <UButton class="basis-1/2" size="lg" block>
          Log in
          <template #trailing>
            <UIcon name="i-heroicons-arrow-right-20-solid" />
          </template>
        </UButton>

        <UButton color="gray" variant="link" class="ms-2">
          Reset password
        </UButton>
      </div>
    </UCard>

    <UButton color="gray" variant="link" class="mt-2">
      Create an account
    </UButton>
  </div>
</template>
