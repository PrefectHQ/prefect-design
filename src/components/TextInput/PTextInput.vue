<template>
  <div class="p-text-input" :class="classes" @click="control?.focus()">
    <div v-if="prepend" class="p-text-input__prepend">
      {{ prepend }}
    </div>
    <slot name="prepend" />
    <input ref="control" v-model="internalValue" type="text" class="p-text-input__control" v-bind="$attrs">
    <div v-if="append" class="p-text-input__append">
      {{ append }}
    </div>
    <slot name="append" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, ref } from 'vue'

  export default defineComponent({
    name: 'PTextInput',
    expose: [],
    inheritAttrs: false,
  })
</script>

<script lang="ts" setup>
  import { State } from '@/types/state'

  const props = defineProps<{
    modelValue: string,
    state?: State,
    prepend?: string,
    append?: string,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: string): void,
  }>()

  const control = ref<HTMLInputElement>()

  const internalValue = computed({
    get() {
      return props.modelValue
    },
    set(value: string) {
      emits('update:modelValue', value)
    },
  })

  const classes = computed(() => ({
    'p-text-input--valid': props.state?.valid,
    'p-text-input--invalid': props.state?.invalid,
    'p-text-input--changed': props.state?.changed,
    'p-text-input--touched': props.state?.touched,
    'p-text-input--untouched': props.state?.untouched,
    'p-text-input--pristine': props.state?.pristine,
    'p-text-input--dirty': props.state?.dirty,
    'p-text-input--pending': props.state?.pending,
    'p-text-input--required': props.state?.required,
    'p-text-input--validated': props.state?.validated,
    'p-text-input--passed': props.state?.passed,
    'p-text-input--failed': props.state?.failed,
  }))
</script>

<style>
.p-text-input { @apply
  w-full
  border
  flex
  items-center
  focus-within:ring-1
  focus-within:border-prefect-600
  focus-within:ring-prefect-600
  border-gray-300
  shadow-sm
  rounded-md
}

.p-text-input--disabled { @apply
  cursor-not-allowed
  opacity-50
}

.p-text-input__control { @apply
  block
  w-full
  rounded-md
}

.p-text-input__prepend,
.p-text-input__append { @apply
  px-2
  flex
  flex-col
  whitespace-nowrap
  justify-center
  self-stretch
  text-sm
  border-gray-300
}

.p-text-input__prepend { @apply
  border-r
}

.p-text-input__append { @apply
  border-l
}

.p-text-input--failed { @apply
  border-red-600
  focus-within:border-red-600
  focus-within:ring-red-600
}
</style>