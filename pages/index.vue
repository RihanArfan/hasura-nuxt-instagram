<template>
  <div class="flex flex-col items-center gap-3">
      <SkeletonPost v-for="i in 10" :key="i" />
  </div>
</template>
