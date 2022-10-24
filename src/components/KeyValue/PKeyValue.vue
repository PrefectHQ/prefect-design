<template>
  <div class="p-key-value" :class="classes.container">
    <div class="p-key-value__label" :class="classes.label">
      <slot name="label">
        {{ label }}
      </slot>
    </div>
    <div v-if="isDefined(value) || slots.value" class="p-key-value__value" :class="classes.value">
      <slot name="value">
        {{ value }}
      </slot>
    </div>
    <div v-else class="p-key-value__empty" :class="classes.empty">
      <slot name="empty">
        None
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { isDate, isValid } from 'date-fns'
  import { computed, useSlots } from 'vue'

  const slots = useSlots()

  const props = defineProps<{
    alternate?: boolean,
    label?: string,
    value?: unknown,
  }>()

  const isDefined = (val: unknown): boolean => {
    if (typeof val === 'object' && val !== null) {
      if (isDate(val)) {
        return isValid(val)
      }

      if (Array.isArray(val)) {
        return val.length > 0
      }

      return Object.keys(val).length > 0
    }

    return typeof val !== 'undefined' && val !== null && val !== ''
  }

  const classes = computed(() => {
    return {
      container: {
        'p-key-value--alt': props.alternate,
      },
      label: {
        'p-key-value__label--alt': props.alternate,
      },
      value: {
        'p-key-value__value--alt': props.alternate,
      },
      empty: {
        'p-key-value__empty--alt': props.alternate,
      },
    }
  })
</script>

<style>
.p-key-value {
  @apply
  w-full
  text-sm
  flex
  flex-col
  gap-y-1
  leading-6
}

.p-key-value__label {
  @apply
  font-semibold
  cursor-default
}

.p-key-value__value {
  overflow-wrap: anywhere;
}

.p-key-value__empty {
  @apply
  text-slate-400
}

.p-key-value--alt {
  @apply
  text-xs
  leading-4
  flex
  flex-col
  gap-y-1
  font-normal
}

.p-key-value__label--alt {
  @apply
  text-slate-800
}
</style>