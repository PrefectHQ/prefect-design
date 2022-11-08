<template>
  <div class="p-key-value" :class="classes.container">
    <div class="p-key-value__label" :class="classes.label">
      <slot name="label">
        {{ label }}
      </slot>
    </div>
    <div class="p-key-value__value" :class="classes.value">
      <slot name="value">
        {{ value }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  const props = defineProps<{
    alternate?: boolean,
    label?: string,
    value?: unknown,
    emptyText?: string,
  }>()

  const emptyText = computed(()=> props.emptyText ?`'${props.emptyText}'` : '"None"')

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
.p-key-value__value:empty::after {
  content: v-bind(emptyText);
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