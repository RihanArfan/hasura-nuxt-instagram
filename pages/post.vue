<script setup lang="ts">
onMounted(() => {
  const isCreatePostOpen = useCreatePostOpen();
  isCreatePostOpen.value = true;

  watchEffect(() => {
    if (!isCreatePostOpen.value) navigateTo("/");
  });
});
</script>

<template>
  <div class="flex h-screen w-full items-center justify-center">
    <UButton
      :loading="true"
      :square="true"
      size="xl"
      variant="link"
      color="black"
    />
  </div>
</template>
