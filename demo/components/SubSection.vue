<template>
  <div class="mb-5">
    <p class="text-xl mb-3">
      {{ heading }}
    </p>
    <slot />
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    heading: string,
  }>()
</script>
