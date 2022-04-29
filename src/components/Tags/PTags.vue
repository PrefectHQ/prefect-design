<template>
  <p-tag v-for="tag in visibleTags" :key="tag" class="mr-1">
    {{ tag }}
  </p-tag>

  <p-tag v-if="tagAmountLimit">
    +{{ hiddenTagsNumber }}
  </p-tag>
</template>

<script lang="ts" setup>
  import { computed, PropType } from 'vue'

  const props = defineProps({
    tags: {
      type: Array as PropType<string[]>,
      default: function() {
        return []
      },
    },
    limit: {
      type: Number,
      default: 4,
    },
  })
  const hiddenTagsSlice = computed(() => props.tags.slice(props.limit))
  const hiddenTagsNumber = computed(() => hiddenTagsSlice.value.length)
  const tagAmountLimit = computed(() => props.tags.length > props.limit)
  const visibleTags = computed(() => props.tags.slice(0, props.limit))
</script>
