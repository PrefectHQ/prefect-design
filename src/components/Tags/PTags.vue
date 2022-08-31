<template>
  <div class="p-tags">
    <p-tag v-for="tag in sortStringArray(tags)" :key="tag">
      {{ tag }}
    </p-tag>
  </div>
</template>

<script lang="ts" setup>
  import { sortStringArray } from '@/utilities/arrays'

  defineProps<{
    tags: string[],
  }>()
</script>

<style>
.p-tags { @apply
  flex
  flex-wrap
  gap-1
}
</style>