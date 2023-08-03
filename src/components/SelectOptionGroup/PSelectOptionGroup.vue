<template>
  <div class="p-select-option-group" role="group">
    <div class="p-select-option-group__label">
      <slot :group="group">
        {{ group.label }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { SelectOptionGroupNormalized } from '@/types'

  defineProps<{
    group: SelectOptionGroupNormalized,
  }>()
</script>

<style>
.p-select-option-group { @apply
  py-2
  border-t
  border-divider
  text-subdued
  text-sm
}

.p-select-option-group:first-child { @apply
  border-t-0
}

.p-select-option-group__label { @apply
  px-3
}
</style>