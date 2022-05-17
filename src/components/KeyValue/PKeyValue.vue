<template>
  <div class="p-key-value">
    <div class="p-key-value__label">
      <slot name="label">
        {{ label }}
      </slot>
    </div>
    <div class="p-key-value__value">
      <slot name="value">
        {{ value }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    label?: string,
    value?: string,
  }>()
</script>

<style>
.p-key-value__label {
  @apply
  text-xs
  leading-4
  font-semibold
  text-slate-400
}

.p-key-value__value {
  @apply
  text-xs
  leading-4
  font-normal
}
</style>