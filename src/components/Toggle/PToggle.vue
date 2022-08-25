<template>
  <div class="p-toggle">
    <div v-if="prepend" class="p-toggle__prepend" @click="handlePrependClick">
      {{ prepend }}
    </div>
    <slot name="prepend" />

    <template v-if="media.hover">
      <button
        type="button"
        class="p-toggle__control"
        :class="classes.control"
        :disabled="disabled"
        :state="state"
        aria-hidden="true"
        v-bind="$attrs"
        @click="toggle"
      >
        <div class="p-toggle__slider">
          <template v-if="state?.pending">
            <PLoadingIcon />
          </template>
        </div>
      </button>
    </template>

    <template v-else>
      <PCheckbox
        v-model="internalValue"
        :disabled="disabled"
        :state="state"
        v-bind="$attrs"
      />
    </template>

    <div v-if="append" class="p-toggle__append" @click="handleAppendClick">
      {{ append }}
    </div>
    <slot name="append" />
  </div>
</template>

<script lang="ts">
  export default {
    name: 'PToggle',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { computed, useSlots } from 'vue'
  import { PLoadingIcon } from '@/components/LoadingIcon'
  import { State } from '@/types/state'
  import { media } from '@/utilities/media'

  const props = defineProps<{
    modelValue: boolean | null,
    disabled?: boolean,
    state?: State,
    prepend?: string,
    append?: string,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: boolean): void,
  }>()

  const slots = useSlots()

  const internalValue = computed({
    get() {
      return props.modelValue
    },
    set(value: boolean | null) {
      emits('update:modelValue', !!value)
    },
  })

  const failed = computed(() => props.state?.valid === false && props.state.validated && !props.state.pending)

  const classes = computed(() => ({
    control: {
      'p-toggle__control--checked': internalValue.value,
      'p-toggle__control--disabled': props.disabled,
      'p-toggle__control--failed': failed.value,
      'p-toggle__control--pending': props.state?.pending,
    },
  }))

  function toggle(): void {
    internalValue.value = !internalValue.value
  }

  function handlePrependClick(): void {
    if (props.append || slots.append) {
      internalValue.value = false
    } else {
      toggle()
    }
  }

  function handleAppendClick(): void {
    if (props.prepend || slots.prepend) {
      internalValue.value = true
    } else {
      toggle()
    }
  }
</script>

<style>
.p-toggle { @apply
  flex
  items-center
  gap-2
  h-6
}

.p-toggle__control { @apply
  flex
  items-center
  border-2
  border-gray-300
  bg-gray-300
  w-11
  h-full
  rounded-full
  transition-colors
  ring-offset-2
  focus:ring-2
  focus:ring-prefect-600
  outline-none
}

.p-toggle__control--checked { @apply
  border-prefect-500
  bg-prefect-500
}

.p-toggle__control--failed { @apply
  ring-1
  ring-red-600
  focus-within:ring-red-600
}

.p-toggle__control--pending { @apply
  ring-1
  ring-prefect-300
  focus-within:ring-prefect-300
}

.p-toggle__control--disabled { @apply
  opacity-50
  cursor-not-allowed
}

.p-toggle__slider { @apply
  w-5
  h-5
  text-prefect-300
  relative
  rounded-full
  bg-white
  transition-all
}

.p-toggle__control--checked .p-toggle__slider { @apply
  translate-x-5
}

.p-toggle__prepend,
.p-toggle__append { @apply
  whitespace-nowrap
  text-sm
  cursor-pointer
}
</style>
