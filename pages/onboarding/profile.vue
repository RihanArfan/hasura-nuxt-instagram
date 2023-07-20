<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { z } from "zod";
import { graphql } from "~/gql";

useHead({ title: "Create Profile" });
const toast = useToast();

const schema = toTypedSchema(
  z.object({
    username: z.string().min(3).max(20).toLowerCase(),
    description: z.string().max(100).optional(),
    isPrivate: z.boolean().optional(),
  }),
);

const { errors, handleSubmit, defineComponentBinds } = useForm({
  validationSchema: schema,
});

const username = defineComponentBinds("username");
const description = defineComponentBinds("description");
const isPrivate = defineComponentBinds("isPrivate");

const createProfileResult = useMutation(
  graphql(`
    mutation InsertProfile(
      $username: String
      $description: String
      $is_private: Boolean
    ) {
      insert_profiles_one(
        object: {
          username: $username
          description: $description
          is_private: $is_private
        }
      ) {
        id
      }
    }
  `),
);

const createProfile = async ({
  username,
  description,
  isPrivate,
}: {
  username: string;
  description?: string;
  isPrivate?: boolean;
}) => {
  const variables = { username, description, is_private: isPrivate };
  const { error } = await createProfileResult.executeMutation(variables);
  if (error) {
    return toast.add({
      id: error?.name,
      title: "Something went wrong",
      description: error?.message,
      color: "red",
      icon: "i-heroicons-exclamation-circle",
    });
  }

  navigateTo("/onboarding/complete");
};

const onSubmit = handleSubmit(async (values) => createProfile(values));
</script>

<template>
  <div class="flex h-screen w-full flex-col items-center justify-center px-3">
    <UCard class="px-5 py-2 sm:w-[470px]">
      <div class="text-center">
        <h1 class="mb-2 text-2xl font-bold">Social</h1>
        <h2 class="mb-10 text-xl">Create your social profile</h2>
      </div>

      <form @submit="onSubmit">
        <div class="flex flex-col gap-5">
          <UFormGroup name="name" label="Username" :error="errors.username">
            <UInput
              v-bind="username"
              icon="i-heroicons-at-symbol"
              placeholder="johndoe"
              size="xl"
              color="white"
              :trailing="false"
              autocomplete="username"
              maxlength="20"
            />
          </UFormGroup>

          <UFormGroup
            name="email"
            label="Description"
            :error="errors.description"
          >
            <UTextarea
              v-bind="description"
              placeholder="Hi there! I'm John Doe."
              size="xl"
              color="white"
              :trailing="false"
            />
          </UFormGroup>

          <UFormGroup name="private" label="Private">
            <UToggle v-bind="isPrivate" />
          </UFormGroup>
        </div>

        <div class="mt-7 flex items-center justify-end">
          <UButton
            label="Create"
            class="ms-5 basis-2/5"
            size="xl"
            block
            type="submit"
            trailing-icon="i-heroicons-arrow-right-20-solid"
            :loading="createProfileResult.fetching.value"
          />
        </div>
      </form>
    </UCard>
  </div>
</template>
