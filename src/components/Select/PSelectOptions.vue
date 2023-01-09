<template>
  <div
    class="p-select-options"
    role="listbox"
    @mouseleave="highlightedIndex = 0"
  >
    <slot name="pre-options" />
    <template v-if="options.length">
      <PVirtualScroller :items="options" item-key="label" class="p-select-options__options">
        <template #default="{ item: option, index }: { item: SelectOptionOrGroup, index: number }">
          <template v-if="option.isGroup">
            <div class="p-select-options__group">
              {{ option.label }}
            </div>
          </template>

          <template v-else>
            <PSelectOption
              :label="option.label"
              :multiple="multiple"
              class="p-select-options__option"
              :disabled="option.disabled"
              :selected="isSelected(option)"
              :highlighted="highlightedIndex === index"
              @mouseenter="highlightedIndex = index"
              @click.stop="handleOptionClick(option)"
            >
              <slot
                name="option"
                :option="option"
                :selected="isSelected(option)"
                :highlighted="highlightedIndex === index"
              />
            </PSelectOption>
          </template>
        </template>
      </PVirtualScroller>
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
  import { computed, toRefs } from 'vue'
  import PSelectOption from '@/components/SelectOption/PSelectOption.vue'
  import PVirtualScroller from '@/components/VirtualScroller/PVirtualScroller.vue'
  import { SelectModelValue, SelectOption, SelectOptionOrGroup } from '@/types/selectOption'

  const props = defineProps<{
    modelValue: SelectModelValue | SelectModelValue[] | undefined,
    options: SelectOptionOrGroup[],
    highlightedIndex: number | undefined,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: SelectModelValue | SelectModelValue[]): void,
    (event: 'update:highlightedIndex', value: number | undefined): void,
  }>()

  const { options } = toRefs(props)

  const internalValue = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value) {
      emit('update:modelValue', value)
    },
  })

  const multiple = computed(() => Array.isArray(internalValue.value))

  const highlightedIndex = computed({
    get() {
      return props.highlightedIndex
    },
    set(value) {
      emit('update:highlightedIndex', value)
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

    if (Array.isArray(internalValue.value)) {
      const index = internalValue.value.indexOf(option.value)

      if (index > -1) {
        internalValue.value = [...internalValue.value.slice(0, index), ...internalValue.value.slice(index + 1)]
      } else {
        internalValue.value = [...internalValue.value, option.value]
      }
    } else {
      internalValue.value = option.value
    }
  }
</script>

<style>
.p-select-options { @apply
  my-1
  bg-background
  shadow-lg
  overflow-hidden
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

.p-select-options__group { @apply
  border-t
  mt-2
  pb-1
  px-3
  border-foreground/50
  text-foreground/50
}

.p-select-options__group:first-child { @apply
  border-t-0
}
</style>