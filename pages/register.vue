<script setup lang="ts">
import { useAuthenticated } from "@nhost/vue";
import { z } from "zod";

useHead({ title: "Create Account" });

const authEmail = useState<string | undefined>("authEmail", () => "");

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);
const schema = toTypedSchema(
  z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().regex(phoneRegex, "Invalid phone number"),
  }),
);

const { values, errors, handleSubmit, defineComponentBinds } = useForm({
  validationSchema: schema,
  initialValues: { email: authEmail.value },
});

const name = defineComponentBinds("name");
const email = defineComponentBinds("email");
const phone = defineComponentBinds("phone");

// preserve email switching between login and register
watch(values, (newValues) => (authEmail.value = newValues.email));

const { isLoading, error, signUpSecurityKey } = useSignUpSecurityKey();

const onSubmit = handleSubmit(async (values) => {
  await signUpSecurityKey({
    name: values.name,
    email: values.email,
    phone: values.phone,
  });
});

const isAuthenticated = useAuthenticated();
watchEffect(() => {
  if (isAuthenticated.value) navigateTo("/onboarding/profile");
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
        <h2 class="mb-10 text-xl">Create a new account</h2>
      </div>

      <form @submit="onSubmit">
        <div class="flex flex-col gap-5">
          <UFormGroup name="name" label="Full name" :error="errors.name">
            <UInput
              v-bind="name"
              icon="i-heroicons-face-smile"
              placeholder="John Doe"
              size="xl"
              color="white"
              :trailing="false"
            />
          </UFormGroup>

          <UFormGroup name="email" label="Email" :error="errors.email">
            <UInput
              v-bind="email"
              icon="i-heroicons-envelope"
              placeholder="example@example.com"
              size="xl"
              color="white"
              :trailing="false"
            />
          </UFormGroup>

          <UFormGroup name="phone" label="Phone number" :error="errors.phone">
            <UInput
              v-bind="phone"
              icon="i-heroicons-phone"
              placeholder="+44 0000000000"
              size="xl"
              color="white"
              :trailing="false"
            />
          </UFormGroup>
        </div>

        <div class="mt-7 flex items-center justify-end">
          <NuxtLink to="/login">
            <UButton color="gray" variant="link">Log in with existing</UButton>
          </NuxtLink>

          <UButton
            label="Sign up"
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
