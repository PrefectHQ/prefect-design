<template>
  <div class="p-draggable-list">
    <template v-for="(item, i) in modelValue" :key="i">
      <div
        ref="items"
        class="p-draggable-list__item"
        :class="classes.item(i)"
        :draggable="itemIsDraggable(i)"
        tabindex="0"
        @dragover="handleDragOver($event, i)"
        @dragstart="handleDragStart"
        @dragend="handleDragEnd"
        @drop="drop"
        @keydown="handleKeydown($event, i)"
      >
        <div class="p-draggable-list__item-handle" @mousedown="handleMouseDown(i)" @mouseup="handleMouseUp">
          <slot name="handle">
            <PIcon icon="DragHandle" />
          </slot>
        </div>
        <div class="p-draggable-list__item-content">
          <slot :item="item" />
        </div>
      </div>

      <div class="p-draggable-list__item-slot" />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import PIcon from '@/components/Icon/PIcon.vue'

  // Enumerated type for boolean attributes: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/draggable
  type Booleanish = 'true' | 'false'

  const props = defineProps<{
    modelValue: unknown[],
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: unknown[]): void,
  }>()

  const items = ref<HTMLElement[]>([])
  const dragging = ref(false)
  const overIndex = ref<number | null>(null)
  const draggingIndex = ref<number | null>(null)

  const classes = computed(() => ({
    item: (index: number) => ({
      'p-draggable-list__item--slot': dragging.value && overIndex.value !== index,
      'p-draggable-list__item--dragging': dragging.value && draggingIndex.value === index,
    }),
  }))

  const itemIsDraggable = (index: number): Booleanish => {
    return draggingIndex.value === index ? 'true' : 'false'
  }

  const moveItemTo = (index: number, newIndex: number): void => {
    const newItems = [...props.modelValue]
    newItems.splice(newIndex, 0, newItems.splice(index, 1)[0])
    emit('update:modelValue', newItems)
  }

  const deleteItemAtIndex = (index: number): void => {
    const newItems = [...props.modelValue]
    newItems.splice(index, 1)
    emit('update:modelValue', newItems)
  }

  const focusItemAtIndex = (index: number): void => items.value[index]?.focus()

  const handleMouseDown = (index: number): void => {
    draggingIndex.value = index
  }

  const handleMouseUp = (): void => {
    draggingIndex.value = null
  }

  const handleDragStart = (): void => {
    dragging.value = true
  }

  const handleDragEnd = (): void => {
    dragging.value = false
    draggingIndex.value = null
    overIndex.value = null
  }

  const handleDragOver = (event: DragEvent, index: number): void => {
    event.preventDefault()

    if (draggingIndex.value === null) {
      return
    }

    overIndex.value = index
  }

  const drop = (event: DragEvent): void => {
    if (draggingIndex.value === null) {
      return
    }

    event.preventDefault()

    const overIndexValue = overIndex.value ?? 0
    moveItemTo(draggingIndex.value, overIndexValue)
  }

  const handleKeydown = (event: KeyboardEvent, index: number): void => {
    const altKeyIsPressed = event.altKey

    const handledKeys = ['Backspace', 'Delete', 'ArrowUp', 'ArrowDown']
    const shouldPreventDefault = handledKeys.includes(event.key)

    if (shouldPreventDefault) {
      event.preventDefault()
    }

    if (event.key === 'Backspace' || event.key === 'Delete') {
      deleteItemAtIndex(index)

      return
    }

    if (event.key === 'ArrowUp') {
      const newIndex = index - 1

      if (newIndex < 0) {
        return
      }

      if (altKeyIsPressed) {
        moveItemTo(index, index - 1)
      }

      focusItemAtIndex(newIndex)

      return
    }

    if (event.key === 'ArrowDown') {
      const newIndex = index + 1

      if (newIndex >= props.modelValue.length) {
        return
      }

      if (altKeyIsPressed) {
        moveItemTo(index, index + 1)
      }

      focusItemAtIndex(newIndex)


    }
  }
</script>

<style>
.p-draggable-list__item { @apply
  flex
  items-center
}

.p-draggable-list__item-handle { @apply
  flex
  items-center
  justify-center
  w-4
  h-4
  mr-2
  cursor-ns-resize
}

.draggable-list__item-slot { @apply
  bg-gray-100
}

.draggable-list__item-slot--over { @apply
  bg-gray-200
}

.p-draggable-list__item[draggable = 'true'] { @apply
  select-none
  opacity-45
}
</style>