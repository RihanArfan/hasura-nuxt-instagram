<script setup lang="ts">
defineProps({
  details: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <UCard
    :ui="{
      body: { padding: '' },
      footer: { padding: 'p-2' },
    }"
    class="w-full"
  >
    <USkeleton :ui="{ rounded: '' }" class="pb-[100%]" />
  </UCard>
</template>
