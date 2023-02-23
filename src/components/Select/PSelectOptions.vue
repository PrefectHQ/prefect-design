<template>
  <div class="p-select-options" role="listbox">
    <slot name="pre-options" />
    <template v-if="options.length">
      <PVirtualScroller :items="flattened" item-key="label" class="p-select-options__options">
        <template #default="{ item: option, index }: { item: SelectOptionNormalized | SelectOptionGroupNormalized, index:number }">
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
  import { computed } from 'vue'
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
  my-1
  bg-background
  border
  border-background-400
  overflow-hidden
  rounded-md
  shadow-lg
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