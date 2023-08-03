<template>
  <div ref="root" class="p-select-options" :class="classes.root" role="listbox">
    <slot name="pre-options" />
    <template v-if="options.length">
      <PVirtualScroller :items="flattened" item-key="label" class="p-select-options__options">
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
  import { UseVisibilityObserverOptions, useVisibilityObserver } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import PSelectOption from '@/components/SelectOption/PSelectOption.vue'
  import PSelectOptionGroup from '@/components/SelectOptionGroup/PSelectOptionGroup.vue'
  import PVirtualScroller from '@/components/VirtualScroller/PVirtualScroller.vue'
  import { isSelectOptionGroup, SelectModelValue, SelectOptionGroupNormalized, SelectOptionNormalized } from '@/types/selectOption'

  const props = defineProps<{
    modelValue: string | number | boolean | null | SelectModelValue[] | undefined,
    options: (SelectOptionNormalized | SelectOptionGroupNormalized)[],
    highlightedValue: string | number | boolean | null | symbol,
    multiple?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: SelectModelValue | SelectModelValue[]): void,
    (event: 'update:highlightedValue', value: SelectModelValue | symbol): void,
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

  const highlightedValue = computed({
    get() {
      return props.highlightedValue
    },
    set(value) {
      emit('update:highlightedValue', value)
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

  const flattened = computed(() => props.options.flatMap(option => flattenGroupsAndOptions(option)))
</script>

<style>
.p-select-options { @apply
  relative
  my-1
  bg-floating
  overflow-hidden
  rounded-md
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