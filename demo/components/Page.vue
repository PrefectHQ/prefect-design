<template>
  <div class="page">
    <header>
      <div>
        <h1 class="text-3xl font-bold leading-tight text-gray-900">
          {{ heading }}
        </h1>
      </div>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    heading: string,
  }>()
</script>