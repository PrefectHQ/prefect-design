<template>
  <component :is="is" class="p-label">
    <template v-if="slots.label || isDefined(label) || slots.description || isDefined(description)">
      <div class="p-label__header">
        <div v-if="slots.label || isDefined(label)" class="p-label__text">
          <slot name="label">
            <span>
              {{ label }}
            </span>
          </slot>
        </div>
        <div v-if="slots.description || isDefined(description)" class="p-label__description">
          <slot name="description">
            <span>
              {{ description }}
            </span>
          </slot>
        </div>
      </div>
    </template>
    <div class="p-label__body">
      <slot />
    </div>
    <div v-if="slots.message || isDefined(message)" class="p-label__message" :class="classes">
      <slot name="message">
        <span>
          {{ message }}
        </span>
      </slot>
    </div>
  </component>
</template>

<script lang="ts" setup>
  import { computed, useSlots, withDefaults } from 'vue'
  import { State } from '@/types/state'

  const props = withDefaults(defineProps<{
    label?: string,
    message?: string,
    state?: State,
    description?: string,
    is?: string,
  }>(), {
    label: undefined,
    message: undefined,
    state: undefined,
    description: undefined,
    is: 'label',
  })

  const slots = useSlots()

  const failed = computed(() => !props.state.valid && props.state.validated && !props.state.pending)

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

.p-label__header { @apply
  flex
  flex-col
  gap-y-[0.125rem]
}

.p-label__description { @apply
  text-sm
  text-gray-500
  font-normal
}

.p-label__message { @apply
  text-sm
  text-gray-500
}

.p-label__message--failed { @apply
  text-red-800
}
</style>