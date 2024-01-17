<template>
  <div class="p-label" :class="classes.root">
    <template v-if="slots.label || isDefined(label) || slots.description || isDefined(description)">
      <div class="p-label__header">
        <template v-if="slots.label || isDefined(label)">
          <label :for="id" class="p-label__label">
            <slot :id="id" name="label">
              <span>
                {{ label }}
              </span>
            </slot>
          </label>
        </template>
        <div v-if="slots.description || isDefined(description)" class="p-label__description">
          <slot :id="id" name="description">
            <span>
              {{ description }}
            </span>
          </slot>
        </div>
      </div>
    </template>
    <div class="p-label__body">
      <slot :id="id" />
    </div>
    <div v-if="slots.message || isDefined(message)" class="p-label__message" :class="classes.message">
      <slot :id="id" name="message">
        <span>
          {{ message }}
        </span>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, useSlots } from 'vue'
  import { State } from '@/types/state'
  import { randomId } from '@/utilities/id'

  const props = defineProps<{
    label?: string,
    message?: string,
    state?: State,
    description?: string,
    for?: string,
  }>()

  const slots = useSlots()

  const failed = computed(() => props.state && !props.state.valid && props.state.validated && !props.state.pending)

  const id = computed(() => props.for ?? randomId())

  const classes = computed(() => ({
    root: {
      'p-label--failed': failed.value,
    },
    message: {
      'p-label__message--failed': failed.value,
    },
  }))

  function isDefined(value: string | undefined): boolean {
    return typeof value === 'string' && value.length > 0
  }
</script>

<style>
.p-label { @apply
  w-full
  flex
  flex-col
  gap-y-1
}

.p-label--failed {
  scroll-margin: var(--prefect-scroll-margin);
}

.p-label__header { @apply
  flex
  flex-col
  items-start
  gap-y-[0.125rem]
}

.p-label__label { @apply
  text-sm
  font-medium
}

.p-label__description { @apply
  text-sm
  text-subdued
  font-normal
}

.p-label__message { @apply
  text-sm
  font-normal
  text-subdued
}

.p-label__message--failed { @apply
  text-invalid
}
</style>