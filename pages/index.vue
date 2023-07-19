<template>
  <div>
    <Head>
      <Title>Social</Title>
    </Head>

    <Body class="overscroll-x-none" />

    <UContainer
      :ui="{ constrained: 'max-w-lg' }"
      class="flex flex-col items-center gap-3 py-2"
    >
      <h1 class="text-2xl font-extrabold">Social</h1>

      <SkeletonPost v-for="i in 10" :key="i" />
    </UContainer>
  </div>
</template>
