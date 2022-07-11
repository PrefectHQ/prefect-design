<template>
  <SwitchGroup as="div" class="p-toggle">
    <SwitchLabel v-if="$slots.prepend" as="span">
      <slot name="prepend" />
    </SwitchLabel>
    <Switch v-model="value" class="p-toggle__switch" :class="classes.toggle" :disabled="disabled || loading">
      <span aria-hidden="true" class="p-toggle__switch-aria" :class="classes.translate">
        <PLoadingIcon v-if="loading" class="p-toggle__switch-loader" />
      </span>
    </Switch>
    <SwitchLabel v-if="$slots.append" as="span">
      <slot name="append" />
    </SwitchLabel>
  </SwitchGroup>
</template>

<script lang="ts" setup>
  import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
  import { computed } from 'vue'
  import { PLoadingIcon } from '@/components'

  const props = defineProps<{
    modelValue: boolean,
    disabled?: boolean,
    loading?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: boolean): void,
  }>()

  const value = computed({
    get() {
      return props.modelValue
    },
    set(value: boolean) {
      emits('update:modelValue', value)
    },
  })


  const classes = computed(() => ({
    translate: {
      'translate-x-5': props.modelValue,
      'translate-x-0': !props.modelValue,
    },
    toggle: {
      'p-toggle__switch--disabled': props.disabled,
      'p-toggle__switch--enabled': props.modelValue,
      'p-toggle__switch--loading': props.loading,
    },
  }))
</script>

<style>
.p-toggle { @apply
  flex
  items-center
  gap-3
}

.p-toggle__switch { @apply
  relative
  inline-flex
  flex-shrink-0
  h-6 w-11
  border-2
  border-transparent
  rounded-full
  cursor-pointer
  transition-colors
  ease-in-out
  duration-200
  focus:outline-none
  focus:ring-2
  focus:ring-offset-2
  focus:ring-prefect-500
  bg-gray-200
}

.p-toggle__switch-aria { @apply
  pointer-events-none
  inline-block
  h-5
  w-5
  rounded-full
  bg-white
  overflow-hidden
  shadow
  transform
  ring-0
  transition
  ease-in-out
  duration-200
}

.p-toggle__switch--disabled { @apply
  cursor-not-allowed
  opacity-50
}

.p-toggle__switch--loading { @apply
  cursor-wait
}

.p-toggle__switch--enabled { @apply
  bg-prefect-500
}

.p-toggle__switch-loader {
  @apply
  absolute
  text-prefect-500
  w-full
  h-full
}
</style>
