<script setup lang="ts">
onMounted(() => {
  const isSearchOpen = useSearchOpen();
  isSearchOpen.value = true;

  watchEffect(() => {
    if (!isSearchOpen.value) navigateTo("/");
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
