<script setup lang="ts">
import { useAuthenticated } from "@nhost/vue";
import { z } from "zod";

useHead({ title: "Login" });

const authEmail = useState<string | undefined>("authEmail", () => "");
const schema = toTypedSchema(z.object({ email: z.string().email() }));

const { values, errors, handleSubmit, defineComponentBinds } = useForm({
  validationSchema: schema,
  initialValues: { email: authEmail.value },
});

const email = defineComponentBinds("email");

// preserve email switching between login and register
watch(values, (newValues) => (authEmail.value = newValues.email));

const { isLoading, error, signInSecurityKey } = useSignInSecurityKey();

const onSubmit = handleSubmit(async (values) => {
  await signInSecurityKey(values.email);
});

const isAuthenticated = useAuthenticated();
watchEffect(() => {
  if (isAuthenticated.value) navigateTo("/");
});
const toast = useToast();
watch(error, (newError) => {
  if (!newError) return;
  toast.add({
    id: newError.error,
    title: "Something went wrong",
    description: newError.message,
    color: "red",
    icon: "i-heroicons-exclamation-circle",
  });
});
</script>

<template>
  <div class="flex h-screen w-full flex-col items-center justify-center px-3">
    <UCard class="px-5 py-2 sm:w-[470px]">
      <div class="text-center">
        <h1 class="mb-2 text-2xl font-bold">Social</h1>
        <h2 class="mb-10 text-xl">Login into to continue</h2>
      </div>

      <form @submit="onSubmit">
        <UFormGroup name="email" :error="errors.email">
          <UInput
            v-bind="email"
            icon="i-heroicons-envelope"
            placeholder="Email"
            size="xl"
            color="white"
            :trailing="false"
            class="py-4"
          />
        </UFormGroup>

        <div class="mt-7 flex items-center justify-end">
          <NuxtLink to="/register">
            <UButton color="gray" variant="link">Create an account</UButton>
          </NuxtLink>

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
