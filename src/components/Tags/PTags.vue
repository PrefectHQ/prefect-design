<template>
  <div class="p-tags">
    <PTag v-for="tag in tags" :key="tag.label">
      {{ tag.label }}
    </PTag>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PTag from '@/components/Tag/PTag.vue'
  import { TagValue, normalize } from '@/types/tag'

  const props = defineProps<{
    tags: (string | TagValue)[],
  }>()

  const tags = computed(() => props.tags.map(normalize).sort((tagA, tagB) => tagA.label.localeCompare(tagB.label)))
</script>

<style>
.p-tags { @apply
  flex
  flex-wrap
  gap-1
}
</style>