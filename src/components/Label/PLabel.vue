<template>
  <label class="p-label">
    <div v-if="slots.label || isDefined(label)" class="p-label__text">
      <slot name="label">
        <span>
          {{ label }}
        </span>
      </slot>
    </div>
    <slot />
    <div v-if="slots.message || isDefined(message)" class="p-label__message" :class="classes">
      <slot name="message">
        <span>
          {{ message }}
        </span>
      </slot>
    </div>
  </label>
</template>

<script lang="ts" setup>
  import { computed, useSlots } from 'vue'
  import { State } from '@/types/state'

  const slots = useSlots()

  const props = defineProps<{
    label?: string,
    message?: string,
    state?: State,
  }>()

  const failed = computed(() => props.state?.valid === false && props.state.validated && !props.state.pending)

  const classes = computed(() => ({
    'p-label__message--failed': failed.value,
  }))

  function isDefined(value: string | undefined): boolean {
    return typeof value === 'string' && value.length > 0
  }
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

.p-label__message--failed { @apply
  text-red-800
}
</style>