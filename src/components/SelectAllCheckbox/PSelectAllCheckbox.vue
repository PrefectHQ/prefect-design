<template>
  <p-tooltip :text="checkboxModel ? 'Deselect all' : 'Select all'">
    <p-checkbox
      v-model="checkboxModel"
      :indeterminate="selectedModel.length && selectedModel.length < selectable.length"
      :aria-label="label"
      v-bind="attrs"
    >
      <template v-if="$slots.label" #label>
        <slot name="label" :label="label" />
      </template>
    </p-checkbox>
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

  const label = computed(() => checkboxModel.value
    ? `Deselect all ${selectedModel.value.length} ${toPluralString(props.itemName, selectedModel.value.length)}`
    : `Select all ${props.selectable.length} ${toPluralString(props.itemName, props.selectable.length)}`)
</script>