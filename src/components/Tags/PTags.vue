<template>
  <div class="p-tags">
    <PTag v-for="tag in tags" :key="tag.label" :dismissible="dismissible" :small="small">
      <slot :tag="tag">
        {{ tag.label }}
      </slot>
    </PTag>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PTag from '@/components/Tag/PTag.vue'
  import { TagValue, normalize } from '@/types/tag'

  const props = defineProps<{
    tags: (string | TagValue)[],
    dismissible?: boolean,
    small?: boolean,
  }>()

  const tags = computed(() => props.tags.map(normalize))
</script>

<style>
.p-tags { @apply
  flex
  flex-wrap
  gap-1
}
</style>