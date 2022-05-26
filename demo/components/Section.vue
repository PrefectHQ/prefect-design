<template>
  <div class="max-w-full px-4 py-8 sm:px-0">
    <p class="text-2xl mb-3">
      {{ heading }}
    </p>
    <div class="max-w-full overflow-x-auto border-4 border-dashed border-gray-200 rounded-lg p-4">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    heading: string,
  }>()
</script>