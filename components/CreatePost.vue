<script setup lang="ts">
import { useFileUpload } from "@nhost/vue";
import { useMutation } from "@urql/vue";
import { graphql } from "~/gql";

const isOpen = defineModel<boolean>("open", { default: false });

const file = ref<File>();
const caption = ref("");

// file picker handler
const {
  files,
  open,
  reset: resetDialog,
} = useFileDialog({
  multiple: false,
  accept: "image/*",
});

watchEffect(() => {
  if (!files.value?.length) return;
  file.value = files.value[0];
});

// drag and drop handler
const dropZoneRef = ref<HTMLDivElement>();

const onDrop = (files: File[] | null) => {
  if (!files?.length || !files[0].type.startsWith("image/")) {
    return useErrorToast({
      id: "invalid-file-type",
      title: "Invalid file type.",
      description: "Please upload an image.",
    });
  }

  resetDialog(); // reset file dialog file
  if (!files?.length) return;

  file.value = files[0];
};

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop);

// reset
const reset = () => {
  resetDialog();
  setTimeout(() => (file.value = undefined), 1000); // delay to prevent flickering
};

watchEffect(() => {
  if (!isOpen.value) reset();
});

// preview
const imagePreview = computed(() => {
  if (!file.value) return;
  return URL.createObjectURL(file.value);
});

// create
const { upload, isUploaded, isUploading, isError } = useFileUpload();

watchEffect(() => {
  if (!isError) return;
  useErrorToast({
    id: "upload-error",
    title: "Upload error.",
    description: "Please try again.",
  });
});

const createPostResult = useMutation(
  graphql(`
    mutation InsertPost($media_id: uuid, $caption: String) {
      insert_posts_one(object: { media_id: $media_id, caption: $caption }) {
        id
        profile {
          username
        }
      }
    }
  `),
);

const createPost = async () => {
  if (isLoading.value) return;
  if (!file.value) {
    return useErrorToast({
      id: "missing-file",
      title: "Please upload an image.",
    });
  }

  // upload file
  const fileResult = await upload({
    file: file.value,
    bucketId: "posts",
  });

  // create record
  const variables = { media_id: fileResult.id, caption: caption.value };
  const { error } = await createPostResult.executeMutation(variables);
  if (error) {
    return useErrorToast({
      id: error?.name,
      title: "Something went wrong",
      description: error?.message,
    });
  }

  // go to post
  const username =
    createPostResult.data.value?.insert_posts_one?.profile?.username;
  const postId = createPostResult.data.value?.insert_posts_one?.id;

  isOpen.value = false;
  navigateTo(`@${username}/${postId}`);
};

const isLoading = computed(
  () => isUploading || createPostResult.fetching.value,
);
</script>

<template>
  <UModal v-model="isOpen" z>
    <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <h2 class="text-2xl font-semibold">Create post</h2>
      </template>

      <UCard
        ref="dropZoneRef"
        :ui="{
          body: {
            base: ' h-full absolute w-full',
            padding: 'p-0',
          },
        }"
        class="relative mb-5 h-0 cursor-pointer pb-[100%] text-gray-400"
        :class="{
          'ring-offset-2 ring-offset-lime-300': isOverDropZone,
        }"
        @click="open"
      >
        <div
          v-if="!file"
          class="flex h-full flex-col items-center justify-center text-center"
          style="object-position: 50% 50%"
        >
          <UIcon name="i-heroicons-arrow-up-tray" class="mb-2 text-4xl" />
          <p class="text-lg">Drag an image or click to upload</p>
        </div>
        <template v-else>
          <img
            :src="imagePreview"
            class="absolute left-0 h-full w-full object-cover"
            style="object-position: 50% 50%"
          />
        </template>
      </UCard>

      <UInput
        v-model="caption"
        icon="i-heroicons-pencil-square"
        placeholder="Add a caption (optional)"
        size="xl"
        color="white"
        :trailing="false"
        class="py-4"
      />

      <template #footer>
        <div class="flex items-center justify-end">
          <UButton
            label="Create post"
            class="ms-5 basis-2/5"
            size="xl"
            block
            type="submit"
            trailing-icon="i-heroicons-arrow-right-20-solid"
            :loading="isLoading"
            @click="createPost"
          />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
