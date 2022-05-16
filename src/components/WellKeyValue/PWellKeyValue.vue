<template>
  <div>
    <div class="p-well-key-value__key">
      {{ wellKey }}
      <slot name="well-key" />
    </div>
    <div class="p-well-key-value__value">
      {{ wellValue }}
      <slot name="well-value" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    wellKey?: string,
    wellValue?: string,
  }>()
</script>

<style>
.p-well-key-value__key {
  @apply
  text-xs
  leading-4
  font-semibold
  text-slate-400
}

.p-well-key-value__value {
  @apply
  text-xs
  leading-4
  font-normal
}
</style>