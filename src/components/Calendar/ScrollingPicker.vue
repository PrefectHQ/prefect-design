<template>
  <div ref="containerElement" class="scrolling-picker">
    <slot name="before" />
    <template v-for="option in selectOptions" :key="option.value">
      <p-button
        small
        flat
        type="button"
        class="scrolling-picker__option"
        :tabindex="1"
        :disabled="option.disabled"
        :class="classes.option(option)"
        @click="handleOptionClick(option)"
      >
        <span ref="optionElements" :data-target="option.value">{{ option.label }}</span>
      </p-button>
    </template>
    <slot name="after" />
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref, watchEffect } from 'vue'
  import { SelectModelValue, normalizeSelectOption, SelectOptionNormalized, SelectOption } from '@/types/selectOption'

  const props = defineProps<{
    modelValue: string | number | boolean | null | undefined,
    options: SelectOption[],
    preventFocus?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: SelectModelValue): void,
  }>()

  defineExpose({ scrollToOption })

  const modelValue = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value) {
      emits('update:modelValue', value)
    },
  })

  const selectOptions = computed(() => {
    return props.options.map(option => normalizeSelectOption(option))
  })

  const containerElement = ref<HTMLDivElement>()
  const optionElements = ref<HTMLElement[]>([])

  const classes = computed(() => ({
    option: (option: SelectOptionNormalized) => ({
      'scrolling-picker__option--selected': option.value === modelValue.value,
      'scrolling-picker__option--disabled': option.disabled,
    }),
  }))

  function handleOptionClick(option: SelectOptionNormalized): void {
    modelValue.value = option.value
  }

  function scrollToOption(value: SelectModelValue): HTMLElement | undefined {
    const element = optionElements.value.find(node => node.dataset.target === value?.toString())

    if (element && containerElement.value) {
      const buttonElement = element.closest('button')!
      const scrollTop = buttonElement.offsetTop - containerElement.value.clientHeight / 2 + buttonElement.clientHeight / 2

      containerElement.value.scrollTop = scrollTop
    }

    return element
  }

  watchEffect(() => {
    scrollToOption(modelValue.value)
  })

  onMounted(() => {
    const element = scrollToOption(modelValue.value)

    if (element && !props.preventFocus) {
      element.parentElement?.focus()
    }
  })
</script>

<style>
.scrolling-picker { @apply
  flex
  flex-col
  flex-grow
  items-center
  gap-2
  px-4
  py-3
  overflow-y-auto
}

.scrolling-picker__option--selected,
.scrolling-picker__option--selected:not(:disabled):hover,
.scrolling-picker__option--selected:not(:disabled):active { @apply
  cursor-default
  border-none
  bg-[var(--p-color-input-checked-bg)]
}

.scrolling-picker__option--disabled { @apply
  cursor-not-allowed
  opacity-50
}

.scrolling-picker__observer { @apply
  p-1
}
</style>