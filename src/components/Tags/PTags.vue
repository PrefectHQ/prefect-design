<template>
  <div class="p-tags">
    <PTag v-for="tag in sortStringArray(tags)" :key="tag">
      {{ tag }}
    </PTag>
  </div>
</template>

<script lang="ts" setup>
  import PTag from '@/components/Tag/PTag.vue'
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