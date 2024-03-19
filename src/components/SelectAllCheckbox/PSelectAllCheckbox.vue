<template>
  <p-tooltip :text="checkboxModel ? 'Deselect all' : 'Select all'">
    <p-checkbox
      v-model="checkboxModel"
      :indeterminate="selectedModel.length && selectedModel.length < selectable.length"
      :aria-label="checkboxModel ? `Deselect all ${selectedModel.length} ${toPluralString(itemName, selectedModel.length)}` : `Select all ${selectable.length} ${toPluralString(itemName, selectable.length)}`"
      v-bind="attrs"
    />
  </p-tooltip>
</template>

<script setup lang="ts" generic="T">
  import { computed, useAttrs } from 'vue'
  import { toPluralString } from '@/utilities'

  const selectedModel = defineModel<T[]>({ required: true })
  const props = withDefaults(defineProps<{
    selectable: T[],
    itemName?: string,
  }>(), { itemName: 'item' })

  const attrs = useAttrs()

  const checkboxModel = computed({
    get: () => selectedModel.value.length > 0,
    set: (value: boolean) => {
      if (value) {
        selectedModel.value = props.selectable
      } else {
        selectedModel.value = []
      }
    },
  })
</script>