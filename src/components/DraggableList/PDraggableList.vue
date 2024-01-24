<template>
  <div class="p-draggable-list" :class="classes.root">
    <template v-for="(item, i) in modelValue" :key="i">
      <div
        ref="items"
        class="p-draggable-list__item"
        :class="classes.item(i)"
        :draggable="itemIsDraggable(i)"
        tabindex="0"
        @dragover="handleDragOver($event, i)"
        @dragleave="handleDragLeave(i)"
        @dragstart="handleDragStart"
        @dragend="handleDragEnd"
        @drop="drop"
        @keydown="handleKeydown($event, i)"
      >
        <div class="p-draggable-list__item-handle" @mousedown="handleMouseDown(i)" @mouseup="handleMouseUp">
          <slot name="handle" v-bind="{ item, index: i }">
            <PIcon icon="DragHandle" />
          </slot>
        </div>
        <div class="p-draggable-list__item-content">
          <slot v-bind="{ item, index: i }" />
        </div>
      </div>
    </template>

    <template v-if="allowCreate">
      <slot name="create">
        <PButton small icon="PlusIcon" class="p-draggable-list__create-button" @click="createItem">
          Add item
        </PButton>
      </slot>
    </template>
  </div>
</template>

<script lang="ts" setup generic="T extends unknown">
  import { computed, nextTick, ref } from 'vue'
  import PIcon from '@/components/Icon/PIcon.vue'

  // Enumerated type for boolean attributes: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/draggable
  type Booleanish = 'true' | 'false'

  const props = defineProps<{
    modelValue: T[],
    generator?: () => T,
    allowCreate?: boolean,
    allowDelete?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: unknown[]): void,
    (event: 'create', value: T | undefined): void,
  }>()

  const items = ref<HTMLElement[]>([])
  const dragging = ref(false)
  const overIndex = ref<number | null>(null)
  const draggingIndex = ref<number | null>(null)

  const classes = computed(() => ({
    root: {
      'p-draggable-list--dragging': dragging.value,
    },
    item: (index: number) => ({
      'p-draggable-list__item--over': dragging.value && overIndex.value === index,
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

  const createItem = (index?: number): void => {
    if (!props.generator) {
      emit('create', undefined)
      return
    }

    const newItems = [...props.modelValue]
    const newItem = props.generator()
    const newIndex = index ?? newItems.length
    newItems.splice(newIndex, 0, props.generator())

    emit('update:modelValue', newItems)
    emit('create', newItem)
  }

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


    if (draggingIndex.value === null || overIndex.value === index) {
      return
    }

    overIndex.value = index
  }

  const handleDragLeave = (index: number): void => {
    if (draggingIndex.value === null || overIndex.value !== index) {
      return
    }

    overIndex.value = null
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
    const shiftKeyIsPressed = event.shiftKey

    const handledKeys = ['Enter', 'Delete', 'ArrowUp', 'ArrowDown']
    const shouldPreventDefault = handledKeys.includes(event.key)

    if (shouldPreventDefault) {
      event.preventDefault()
    }

    if (event.key === 'Enter') {
      const newIndex = index + 1

      if (newIndex === props.modelValue.length && props.allowCreate) {
        createItem(newIndex)
      }

      // Wait for the new item to be rendered before focusing it
      nextTick(() => {
        focusItemAtIndex(newIndex)
      })

      return
    }

    if (event.key === 'Delete') {
      if (!props.allowDelete) {
        return
      }

      deleteItemAtIndex(index)

      return
    }

    if (event.key === 'ArrowUp') {
      const newIndex = shiftKeyIsPressed ? 0 : index - 1

      if (newIndex < 0) {
        return
      }

      if (altKeyIsPressed) {
        moveItemTo(index, newIndex)
      }

      focusItemAtIndex(newIndex)

      return
    }

    if (event.key === 'ArrowDown') {
      const newIndex = shiftKeyIsPressed ? props.modelValue.length - 1 : index + 1

      if (newIndex >= props.modelValue.length) {
        return
      }

      if (altKeyIsPressed) {
        moveItemTo(index, newIndex)
      }

      focusItemAtIndex(newIndex)


    }
  }
</script>

<style>
.p-draggable-list__item { @apply
  flex
  items-center
  border-2
  border-transparent
}

.p-draggable-list__item-handle { @apply
  flex
  items-center
  justify-center
  w-4
  h-4
  mr-2
  cursor-grab
}

.p-draggable-list--dragging .p-draggable-list__item--over { @apply
  rounded-md
  shadow-inner
  border-dashed
  border-default
}

.p-draggable-list--dragging .p-draggable-list__item { @apply
  opacity-50
}

.p-draggable-list__item[draggable = 'true'] { @apply
  select-none
}

.p-draggable-list__create-button { @apply
  mt-2
}
</style>