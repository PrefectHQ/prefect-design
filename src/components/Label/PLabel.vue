<template>
  <label class="p-label">
    <div v-if="slots.label || label" class="p-label__text">
      <slot name="label">
        <span>
          {{ label }}
        </span>
      </slot>
    </div>
    <slot />
    <div v-if="slots.message || message" class="p-label__message">
      <slot name="message">
        <span>
          {{ message }}
        </span>
      </slot>
    </div>
  </label>
</template>

<script lang="ts" setup>
  import { useSlots } from 'vue'

  const slots = useSlots()

  defineProps<{
    label?: string,
    message?: string,
  }>()
</script>

<style>
.p-label { @apply
  w-full
  text-sm
  font-medium
  text-gray-700
  flex
  flex-col
  gap-y-1
}

.p-label__message { @apply
  text-sm
  text-gray-500
}
</style>