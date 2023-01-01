<template>
  <div ref="containerElement" class="scrolling-picker">
    <slot name="before" />
    <template v-for="option in selectOptions" :key="option.value">
      <button
        type="button"
        class="scrolling-picker__option"
        :tabindex="1"
        :disabled="option.disabled"
        :class="classes.option(option)"
        @click="handleOptionClick(option)"
      >
        <span ref="optionElements" :data-target="option.value">{{ option.label }}</span>
      </button>
    </template>
    <slot name="after" />
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref, watchEffect } from 'vue'
  import { isSelectOption, SelectModelValue, SelectOption } from '@/types/selectOption'

  const props = defineProps<{
    modelValue: string | number | boolean | null | undefined,
    options: (string | number | boolean | SelectOption)[],
    preventFocus?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: SelectModelValue): void,
  }>()

  defineExpose({ scrollToOption })

  const internalValue = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value: SelectModelValue) {
      emits('update:modelValue', value)
    },
  })

  const selectOptions = computed<SelectOption[]>(() => props.options.map(option => {
    if (isSelectOption(option)) {
      return option
    }

    return { label: option.toLocaleString(), value: option }
  }))

  const containerElement = ref<HTMLDivElement>()
  const optionElements = ref<HTMLElement[]>([])

  const classes = computed(() => ({
    option: (option: SelectOption) => ({
      'scrolling-picker__option--selected': option.value === internalValue.value,
      'scrolling-picker__option--disabled': option.disabled,
    }),
  }))

  function handleOptionClick(option: SelectOption): void {
    internalValue.value = option.value
  }

  function scrollToOption(value: SelectModelValue): HTMLElement | undefined {
    const element = optionElements.value.find(node => node.dataset.target === value?.toString())

    if (element && containerElement.value) {
      const buttonElement = element.parentNode as HTMLButtonElement
      const scrollTop = buttonElement.offsetTop - containerElement.value.clientHeight / 2 + buttonElement.clientHeight / 2

      containerElement.value.scrollTop = scrollTop
    }

    return element
  }

  watchEffect(() => {
    scrollToOption(internalValue.value)
  })

  onMounted(() => {
    const element = scrollToOption(internalValue.value)

    if (element && !props.preventFocus) {
      element.parentElement?.focus()
    }
  })
</script>

<style>
.scrolling-picker { @apply
  flex
  flex-col
  gap-2
  px-4
  py-3
  overflow-y-auto
}

.scrolling-picker__option { @apply
  text-center
  py-1
  px-2
  text-sm
  cursor-pointer
  rounded
  text-foreground
  focus:ring-primary-600
  focus:outline-none
  focus:ring-2
  focus:ring-offset-2
}

.scrolling-picker__option:not(.scrolling-picker__option--disabled) { @apply
  hover:bg-background-400
}

.scrolling-picker__option--selected { @apply
  text-white
  bg-primary-500
}

.scrolling-picker__option--selected:not(.scrolling-picker__option--disabled) { @apply
  hover:bg-primary-600
}

.scrolling-picker__option--disabled { @apply
  cursor-not-allowed
  opacity-50
}

.scrolling-picker__observer { @apply
  p-1
}
</style>