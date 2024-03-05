<template>
  <div class="p-draggable-list" :class="classes.root">
    <template v-for="(item, index) in modelValue" :key="index">
      <div
        ref="items"
        class="p-draggable-list__item"
        :class="classes.item(index)"
        :draggable="itemIsDraggable(index)"
        tabindex="0"
        @dragover="handleDragOver($event, index)"
        @dragleave="handleDragLeave(index)"
        @dragend="handleDragEnd"
        @drop="drop"
      >
        <slot
          name="item"
          v-bind="{
            item,
            index,
            handleDown: () => handleMouseDown(index),
            handleUp: handleMouseUp,
            moveUp: moveUp(index),
            moveToTop: moveToTop(index),
            moveDown: moveDown(index),
            moveToBottom: moveToBottom(index),
            deleteItem: () => deleteItemAtIndex(index),
          }"
        >
          <div
            class="p-draggable-list__item-handle"
            @mousedown="handleMouseDown(index)"
            @touchstart="handleMouseDown(index)"
            @touchend="handleMouseUp"
            @mouseup="handleMouseUp"
          >
            <slot name="handle" v-bind="{ item, index }">
              <PIcon icon="DragHandle" />
            </slot>
          </div>

          <div class="p-draggable-list__item-content">
            <slot
              v-bind="{
                item,
                index,
                moveUp: moveUp(index),
                moveToTop: moveToTop(index),
                moveDown: moveDown(index),
                moveToBottom: moveToBottom(index),
                deleteItem: () => deleteItemAtIndex(index),
              }"
            />
          </div>
        </slot>
      </div>
    </template>

    <template v-if="allowCreate">
      <slot name="create">
        <PButton small icon="PlusIcon" class="p-draggable-list__create-button" @click="createItem(undefined)">
          Add item
        </PButton>
      </slot>
    </template>
  </div>
</template>

<script lang="ts" setup generic="T extends unknown">
  import { computed, ref } from 'vue'
  import PIcon from '@/components/Icon/PIcon.vue'
  import { isNotNullish } from '@/utilities'

  // Enumerated type for boolean attributes: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/draggable
  type Booleanish = 'true' | 'false'

  const props = defineProps<{
    modelValue: T[],
    generator?: () => T,
    allowCreate?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: unknown[]): void,
    (event: 'create', value: T | undefined): void,
  }>()

  const items = ref<HTMLElement[]>([])
  const overIndex = ref<number | null>(null)
  const draggingIndex = ref<number | null>(null)
  const dragging = computed(() => isNotNullish(draggingIndex.value))

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

  const moveUp = (index: number): (() => void) => {
    return () => {
      const newIndex = index - 1

      if (newIndex < 0) {
        return
      }

      moveItemTo(index, newIndex)
      focusItemAtIndex(newIndex)
    }
  }

  const moveDown = (index: number): (() => void) => {
    return () => {
      const newIndex = index + 1

      if (newIndex >= props.modelValue.length) {
        return
      }

      moveItemTo(index, newIndex)
    }
  }

  const moveToTop = (index: number): (() => void) => {
    return () => {
      moveItemTo(index, 0)
    }
  }

  const moveToBottom = (index: number): (() => void) => {
    return () => {
      moveItemTo(index, props.modelValue.length - 1)
    }
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

  const handleDragEnd = (): void => {
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