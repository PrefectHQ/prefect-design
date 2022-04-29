<template>
  <!--
    <p-tag v-for="tag in visibleTags" :key="tag" class="mr-1">
    {{ tag }}
    </p-tag>

    <p-tag v-if="tagAmountLimit">
    +{{ hiddenTagsNumber }}
    </p-tag>
  -->

  <div ref="container">
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { computed, getCurrentInstance, PropType, useSlots } from 'vue'

  // get parent of ref of "container "
  // create intersection observor

  const instance = getCurrentInstance()

  const slots = useSlots()
  console.log('slots', slots.default())
  console.log(instance?.parent)

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
