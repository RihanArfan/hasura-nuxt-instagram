<script setup lang="ts">
defineProps<{ name: string | number; value: string | number }>();
</script>

<template>
  <p class="text-md">
    <span class="text-xl font-bold">
      {{ value }}
    </span>
    {{ name }}
  </p>
</template>
