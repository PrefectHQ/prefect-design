<template>
  <div
    class="p-select-options"
    role="listbox"
    @mouseleave="indexValue = 0"
  >
    <slot name="pre-options" />
    <template v-if="options.length">
      <ul class="p-select-options__options">
        <template v-for="(option, index) in options" :key="index">
          <li
            ref="optionElements"
            @mouseenter="indexValue = index"
            @click.stop="handleOptionClick(option)"
          >
            <PSelectOption
              :label="option.label"
              :multiple="multiple"
              :disabled="option.disabled"
              :selected="isSelected(option)"
              :highlighted="indexValue === index"
            >
              <slot
                name="option"
                :option="option"
                :selected="isSelected(option)"
                :highlighted="indexValue === index"
              />
            </PSelectOption>
          </li>
        </template>
      </ul>
    </template>
    <template v-else>
      <slot name="options-empty">
        <div class="p-select-options__options--empty">
          No options
        </div>
      </slot>
    </template>
    <slot name="post-options" />
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, watch, watchEffect } from 'vue'
  import PSelectOption from '@/components/SelectOption/PSelectOption.vue'
  import { SelectModelValue, SelectOption } from '@/types/selectOption'

  const props = defineProps<{
    modelValue: string | number | null | SelectModelValue[] | undefined,
    options: SelectOption[],
    highlightedIndex: number,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: SelectModelValue): void,
    (event: 'update:highlightedIndex', value: number): void,
  }>()

  const internalValue = computed(() => props.modelValue ?? null)

  const multiple = computed(() => Array.isArray(internalValue.value))

  const optionElements = ref<HTMLLIElement[]>([])

  const indexValue = computed({
    get() {
      return props.highlightedIndex
    },
    set(value: number) {
      emits('update:highlightedIndex', value)
    },
  })

  function isSelected(option: SelectOption): boolean {
    if (Array.isArray(internalValue.value)) {
      return internalValue.value.includes(option.value)
    }

    return option.value === internalValue.value
  }

  function handleOptionClick(option: SelectOption): void {
    if (option.disabled) {
      return
    }

    emits('update:modelValue', option.value)
  }

  function getOptionElement(index: number): HTMLLIElement | undefined {
    return optionElements.value[index]
  }

  function scrollToOption(index: number): void {
    const element = getOptionElement(index)

    element?.scrollIntoView({ block: 'nearest' })
  }

  watch(() => props.highlightedIndex, (value, previous) => {
    const difference = value - previous

    if (props.options[props.highlightedIndex].disabled) {
      const newIndex = indexValue.value + difference
      console.log(newIndex)
      if (newIndex > 0 && newIndex < props.options.length) {
        indexValue.value += difference
      }
    } else {
      scrollToOption(value)
    }
  })

  watchEffect(() => {
    if (props.options.length <= indexValue.value) {
      indexValue.value = 0
    }
  })
</script>

<style>
.p-select-options { @apply
  my-1
  bg-white
  shadow-lg
  rounded-md
  ring-1
  ring-black
  ring-opacity-5
  focus:outline-none
}

.p-select-options__options { @apply
  max-h-64
  overflow-y-auto
}

.p-select-options__options--empty { @apply
  px-4
  py-2
  italic
  text-sm
}

@media (hover: hover) {
  .p-select-options__options { @apply
    block
  }
}
</style>