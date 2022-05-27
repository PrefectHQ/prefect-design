<template>
  <div class="p-key-value">
    <div class="p-key-value__label">
      <slot name="label">
        {{ label }}
      </slot>
    </div>
    <div v-if="value || slots.value" class="p-key-value__value">
      <slot name="value">
        {{ value }}
      </slot>
    </div>
    <div v-else class="p-key-value__empty">
      <slot name="empty">
        None
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useSlots } from 'vue'

  const slots = useSlots()

  defineProps<{
    label?: string,
    value?: unknown,
  }>()
</script>

<style>
.p-key-value {
  @apply
  text-xs
  leading-4
  font-normal
}

.p-key-value__label {
  @apply
  font-semibold
  text-slate-400
}

.p-key-value__empty {
  @apply
  text-slate-400
}
</style>