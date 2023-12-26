<template>
  <div
    ref="root"
    class="p-select-options"
    :class="classes.root"
    role="listbox"
    @mouseleave="setHighlightedValueUnselected"
  >
    <slot name="pre-options" />
    <PVirtualScroller :items="flattenedOptionsAndGroups" item-key="label" class="p-select-options__options" @bottom="emit('bottom')">
      <template #default="{ item: option, index }">
        <template v-if="isSelectOptionGroup(option)">
          <PSelectOptionGroup :group="option">
            <template #default="scope">
              <slot name="group" v-bind="scope" />
            </template>
          </PSelectOptionGroup>
        </template>

        <template v-else>
          <PSelectOption
            v-model="internalValue"
            v-model:highlightedValue="highlightedValue"
            :option="option"
            :multiple="multiple"
          >
            <template #default="scope">
              <slot name="option" v-bind="{ ...scope, index }" />
            </template>
          </PSelectOption>
        </template>
      </template>
      <template #bottom>
        <div ref="end" />
        <template v-if="!options.length">
          <slot name="options-empty">
            <div class="p-select-options__options--empty">
              No options
            </div>
          </slot>
        </template>
      </template>
    </PVirtualScroller>
    <slot name="post-options" />
  </div>
</template>

<script lang="ts" setup>
  import { UseVisibilityObserverOptions, useKeyDown, useVisibilityObserver } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import PSelectOption from '@/components/SelectOption/PSelectOption.vue'
  import PSelectOptionGroup from '@/components/SelectOptionGroup/PSelectOptionGroup.vue'
  import PVirtualScroller from '@/components/VirtualScroller/PVirtualScroller.vue'
  import { useHighlightedValue } from '@/compositions/useHighlightedValue'
  import { MaybeReadonly } from '@/types'
  import { isAlphaNumeric, keys } from '@/types/keyEvent'
  import { flattenSelectOptions, isSelectOptionGroup, normalizeSelectOption, SelectModelValue, SelectOption, SelectOptionGroup, SelectOptionGroupNormalized, SelectOptionNormalized } from '@/types/selectOption'
  import { toggleArrayValue } from '@/utilities'

  const props = defineProps<{
    modelValue: string | number | boolean | null | SelectModelValue[] | undefined,
    options: MaybeReadonly<(SelectOption | SelectOptionGroup)[]>,
    multiple?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: SelectModelValue | SelectModelValue[]): void,
    (event: 'bottom'): void,
  }>()

  const internalValue = computed({
    get() {
      if (props.multiple) {
        return props.modelValue ?? []
      }

      return props.modelValue ?? null
    },
    set(value) {
      emit('update:modelValue', value)
    },
  })

  const root = ref<HTMLDivElement>()
  const end = ref<HTMLDivElement>()
  const visibilityOptions = computed<UseVisibilityObserverOptions>(() => ({
    root: root.value,
    disconnectWhenVisible: false,
  }))

  const { visible: endVisible } = useVisibilityObserver(end, visibilityOptions)

  const classes = computed(() => {
    return {
      root: {
        'p-select-options--end': endVisible.value || props.options.length === 0,
      },
    }
  })

  function flattenGroupsAndOptions(value: SelectOptionNormalized | SelectOptionGroupNormalized): (SelectOptionNormalized | SelectOptionGroupNormalized)[] {
    if (isSelectOptionGroup(value)) {
      return [
        value,
        ...value.options.flatMap(option => flattenGroupsAndOptions(option)),
      ]
    }

    return [value]
  }

  function toggleValue(newValue: SelectModelValue): void {
    if (Array.isArray(internalValue.value)) {
      toggleArrayValue(internalValue.value, newValue)
      return
    }

    internalValue.value = newValue
  }

  const normalized = computed(() => props.options.map(option => normalizeSelectOption(option)))
  const flattenedOptionsAndGroups = computed(() => normalized.value.flatMap(option => flattenGroupsAndOptions(option)))
  const flattenedOptions = computed(() => flattenSelectOptions(normalized.value))
  const { highlightedValue, isUnselected, setHighlightedValueUnselected, setNextHighlightedValue, setPreviousHighlightedValue } = useHighlightedValue(flattenedOptions)

  useKeyDown(['ArrowDown', 'ArrowUp', ' ', 'Enter'], onKeyDown)

  function onKeyDown(event: KeyboardEvent): void {
    if (isAlphaNumeric(event.key)) {
      return
    }

    switch (event.key) {
      case keys.upArrow:
        setPreviousHighlightedValue()
        event.preventDefault()
        break
      case keys.downArrow:
        setNextHighlightedValue()
        event.preventDefault()
        break
      case keys.space:
      case keys.enter:
        if (isUnselected(highlightedValue.value)) {
          return
        }

        toggleValue(highlightedValue.value)
        event.preventDefault()
        break
    }
  }
</script>

<style>
.p-select-options { @apply
  relative
  my-1
  bg-floating
  overflow-hidden
  rounded-default
  shadow-lg
  focus:outline-none
}

.p-select-options::after { @apply
  transition-opacity
  opacity-100
  absolute
  bottom-0
  left-0
  right-0
  h-12
  pointer-events-none;
  content: '';
  background-image: linear-gradient(transparent, var(--p-color-bg-floating));
}

.p-select-options--end::after { @apply
  opacity-0
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
  text-subdued
}

@media (hover: hover) {
  .p-select-options__options { @apply
    block
  }
}
</style>