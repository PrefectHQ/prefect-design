<template>
  <div class="p-draggable-list">
    <template v-for="(item, i) in modelValue" :key="i">
      <div class="p-draggable-list__item">
        <div class="p-draggable-list__item-handle">
          <slot name="handle">
            <PIcon icon="EllipsisVerticalIcon" />
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
  import PIcon from '@/components/Icon/PIcon.vue'

  defineProps<{
    modelValue: unknown[],
  }>()

  defineEmits<{
    (event: 'update:modelValue', value: unknown[]): void,
  }>()

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