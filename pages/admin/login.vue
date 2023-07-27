<script setup lang="ts">
useHead({ title: "Login | Admin" });
definePageMeta({ layout: "steps" });

const isLoading = ref(false);
const secret = ref("");
const adminSecret = useAdminSecret();
const errorMessage = ref("");

const onSubmit = async () => {
  isLoading.value = true;

  try {
    await $fetch("/api/admin/login", {
      method: "POST",
      body: { secret: secret.value },
    });

    adminSecret.value = secret.value;
    navigateTo("/admin");
  } catch (error) {
    errorMessage.value = "Invalid secret key provided";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="flex h-screen w-full flex-col items-center justify-center px-3">
    <UCard class="px-5 py-2 sm:w-[470px]">
      <div class="text-center">
        <h1 class="mb-2 text-2xl font-bold">Admin</h1>
        <h2 class="mb-10 text-xl">Login into to continue</h2>
      </div>

      <form type="post" @submit.prevent="onSubmit">
        <UFormGroup name="secret" :error="errorMessage">
          <UInput
            v-model="secret"
            icon="i-heroicons-key"
            placeholder="Administration secret key"
            size="xl"
            color="white"
            :trailing="false"
            class="py-4"
            type="password"
          />
        </UFormGroup>

        <div class="mt-7 flex items-center justify-end">
          <UButton
            label="Log in"
            class="ms-5 basis-2/5"
            size="xl"
            block
            type="submit"
            trailing-icon="i-heroicons-arrow-right-20-solid"
            :loading="isLoading"
          />
        </div>
      </form>
    </UCard>
  </div>
</template>
