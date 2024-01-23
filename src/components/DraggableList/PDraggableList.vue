<template>
  <div class="p-draggable-list">
    <template v-for="(item, i) in modelValue" :key="i">
      <div class="p-draggable-list__item" :class="classes.item(i)">
        <div class="p-draggable-list__item-handle" @dragstart="handleDragStart(i)" @dragend="handleDragEnd">
          <slot name="handle">
            <PIcon icon="DragHandle" />
          </slot>
        </div>
        <div class="p-draggable-list__item-content">
          <slot :item="item" />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import PIcon from '@/components/Icon/PIcon.vue'

  defineProps<{
    modelValue: unknown[],
  }>()


  defineEmits<{
    (event: 'update:modelValue', value: unknown[]): void,
  }>()

  const dragging = ref(false)
  const draggingIndex = ref<unknown>(null)

  const classes = computed(() => ({
    item: (index: number) => ({
      'p-draggable-list__item--dragging': dragging.value && draggingIndex.value === index,
    }),
  }))


  const handleDragStart = (index: number): void => {
    dragging.value = true
    draggingIndex.value = index
  }

  const handleDragEnd = (): void => {
    dragging.value = false
    draggingIndex.value = null
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
</style>