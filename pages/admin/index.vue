<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: ["admin"] });
</script>

<template>
  <div
    class="flex h-[calc(100vh-4rem)] flex-col items-center justify-center text-center text-xl"
  >
    <UIcon name="i-heroicons-information-circle" class="mb-5 text-6xl" />
    <p>Select a profile to review</p>
  </div>
</template>
