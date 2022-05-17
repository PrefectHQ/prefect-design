<template>
  <div class="scrolling-picker">
    <div ref="topElement" class="scrolling-picker__observer" data-target="top" />
    <template v-for="option in selectOptions" :key="option.value">
      <button
        type="button"
        class="scrolling-picker__option"
        :tabindex="1"
        :class="classes.option(option)"
        @click="internalValue = option.value"
      >
        <span ref="optionElements" :data-target="option.value">{{ option.label }}</span>
      </button>
    </template>
    <div ref="bottomElement" class="scrolling-picker__observer" data-target="bottom" />
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, onUnmounted, ref } from 'vue'
  import { isSelectOption, SelectModelValue, SelectOption } from '@/types/selectOption'

  const props = defineProps<{
    modelValue: string | number | null | undefined,
    options: (string | number | SelectOption)[],
    preventFocus?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: SelectModelValue): void,
    (event: 'scroll-top' | 'scroll-bottom'): void,
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
  const topElement = ref<HTMLElement>()
  const bottomElement = ref<HTMLElement>()

  const classes = computed(() => ({
    option:(option: SelectOption) => ({
      'scrolling-picker__option--selected': option.value === internalValue.value,
    }),
  }))

  function handleIntersection([entry]: IntersectionObserverEntry[]): void {
    if (entry.isIntersecting) {
      const target = entry.target as HTMLElement

      if (target.dataset.target === 'top') {
        emits('scroll-top')
      } else {
        emits('scroll-bottom')
      }
    }
  }

  function scrollToOption(value: SelectModelValue): HTMLElement | undefined {
    const element = optionElements.value.find(node => node.dataset.target === value?.toString())

    if (element) {
      element.scrollIntoView({ block: 'center' })
    }

    return element
  }

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    observer = new IntersectionObserver(handleIntersection)

    const element = scrollToOption(internalValue.value)

    if (topElement.value && bottomElement.value) {
      observer.observe(topElement.value)
      observer.observe(bottomElement.value)
    }

    if (element && !props.preventFocus) {
      element.parentElement?.focus()
    }
  })

  onUnmounted(() => observer?.disconnect())
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