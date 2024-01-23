<template>
  <div class="p-draggable-list">
    <template v-for="(item, i) in modelValue" :key="i">
      <div
        class="p-draggable-list__item"
        :class="classes.item(i)"
        draggable="true"
        @dragover="($event) => handleDragOver($event, i)"
        @dragstart="handleDragStart(i)"
        @dragend="handleDragEnd"
        @dragleave="handleDragLeave"
        @drop="drop"
      >
        <div class="p-draggable-list__item-handle">
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

  const props = defineProps<{
    modelValue: unknown[],
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: unknown[]): void,
  }>()

  const dragging = ref(false)
  const overIndex = ref<number | null>(null)
  const draggingIndex = ref<number | null>(null)

  const classes = computed(() => ({
    item: (index: number) => ({
      'p-draggable-list__item--slot': dragging.value && overIndex.value !== index,
      'p-draggable-list__item--dragging': dragging.value && draggingIndex.value === index,
    }),
  }))

  const handleDragStart = (index: number): void => {
    dragging.value = true
    draggingIndex.value = index

    console.log('dragStart', {
      index: draggingIndex.value,
    })
  }

  const handleDragEnd = (): void => {
    dragging.value = false
    draggingIndex.value = null

    console.log('dragEnd', {
      index: draggingIndex.value,
    })
  }

  const handleDragOver = (event: DragEvent, index: number): void => {
    event.preventDefault()

    if (draggingIndex.value === null) {
      return
    }

    overIndex.value = index

    console.log('dragOver', {
      overIndex: overIndex.value,
    })
  }

  const handleDragLeave = (): void => {
    overIndex.value = null

    console.log('dragLeave', {
      overIndex: overIndex.value,
    })
  }

  const drop = (event: DragEvent): void => {
    console.log('drop', {
      draggingIndex: draggingIndex.value,
      overIndex: overIndex.value,
      event: event,
    })

    if (draggingIndex.value === null) {
      return
    }

    event.preventDefault()

    console.log(event)
    const overIndexValue = overIndex.value ?? 0
    const itemToMove = props.modelValue[draggingIndex.value]
    const newItems = [...props.modelValue]

    newItems.splice(draggingIndex.value, 1)
    newItems.splice(overIndexValue, 0, itemToMove)

    emit('update:modelValue', newItems)
  }

  // on drag end emit new array
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

[draggable] { @apply
  select-none
}
</style>