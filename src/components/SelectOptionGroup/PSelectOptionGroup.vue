<template>
  <div class="p-select-option-group" :class="classes" role="group">
    <div class="p-select-option-group__label">
      <slot :group="group">
        {{ group.label }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { defineProps, computed } from 'vue'
  import { SelectOptionGroupNormalized } from '@/types'

  const props = defineProps<{
    group: SelectOptionGroupNormalized,
    small?: boolean,
  }>()

  const classes = computed(() => {
    return {
      'p-select-option-group--small': props.small,
    }
  })
</script>

<style>
.p-select-option-group { @apply
  py-2
  border-t
  border-divider
  text-subdued
  text-sm
}

.p-select-option-group--small { @apply
  text-xs
  py-1
}

.p-select-option-group:first-child { @apply
  border-t-0
}

.p-select-option-group__label { @apply
  px-3
}

.p-select-option-group--small .p-select-option-group__label { @apply
  px-2
}
</style>