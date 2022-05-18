<template>
  <div class="scrolling-picker">
    <slot name="before" />
    <template v-for="option in selectOptions" :key="option.value">
      <button
        type="button"
        class="scrolling-picker__option"
        :tabindex="1"
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
  import { computed, onMounted, ref } from 'vue'
  import { isSelectOption, SelectModelValue, SelectOption } from '@/types/selectOption'

  const props = defineProps<{
    modelValue: string | number | null | undefined,
    options: (string | number | SelectOption)[],
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

  const optionElements = ref<HTMLElement[]>([])

  const classes = computed(() => ({
    option:(option: SelectOption) => ({
      'scrolling-picker__option--selected': option.value === internalValue.value,
    }),
  }))

  function handleOptionClick(option: SelectOption): void {
    internalValue.value = option.value
    scrollToOption(option.value)
  }

  function scrollToOption(value: SelectModelValue): HTMLElement | undefined {
    const element = optionElements.value.find(node => node.dataset.target === value?.toString())

    if (element) {
      element.scrollIntoView({ block: 'center' })
    }

    return element
  }

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
  hover:bg-gray-100
  focus:ring-prefect-600
  focus:outline-none
  focus:ring-2
  focus:ring-offset-2
}

.scrolling-picker__option--selected { @apply
  text-white
  bg-prefect-600
  hover:bg-prefect-800
}

.scrolling-picker__observer { @apply
  p-1
}
</style>