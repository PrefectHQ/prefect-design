<template>
  <BaseInput ref="wrapperElement" class="p-select-button">
    <template v-for="(index, name) in $slots" #[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
    <template #control="{ attrs }">
      <button
        ref="buttonElement"
        type="button"
        class="p-select-button__control"
        aria-hidden="true"
        v-bind="attrs"
      >
        <template v-if="multiple && valueAsArray.length">
          <PTagWrapper class="p-select-button__value" :tags="valueAsArray">
            <template #tag="{ tag }">
              <slot
                name="default"
                :selected-option="getSelectOption(tag)"
                :unselect-option="() => unselectOptionValue(tag)"
              >
                <PTag dismissible @dismiss="unselectOptionValue(tag)">
                  {{ getSelectOption(tag)?.label }}
                </PTag>
              </slot>
            </template>

            <template #overflow-tags="{ overflowedChildren }">
              <span>+{{ overflowedChildren }}</span>
            </template>
          </PTagWrapper>
        </template>

        <template v-else-if="!multiple && selectedOption">
          <span class="p-select-button__value">
            <slot
              name="default"
              :selected-option="selectedOption"
              :unselect-option="() => internalValue = null"
            >
              {{ selectedOption.label }}
            </slot>
          </span>
        </template>

        <template v-else>
          <div class="p-select-button__value p-select-button__value--empty">
            {{ emptyMessage }}
          </div>
        </template>
      </button>
    </template>
    <template #append>
      <span class="p-select-button__icon">
        <PIcon icon="SelectorIcon" />
      </span>
    </template>
  </BaseInput>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import BaseInput from '@/components/BaseInput'
  import PTag from '@/components/Tag/PTag.vue'
  import PTagWrapper from '@/components/TagWrapper/PTagWrapper.vue'
  import { SelectModelValue, SelectOption } from '@/types/selectOption'

  const props = defineProps<{
    modelValue: string | number | null | SelectModelValue[] | undefined,
    options: SelectOption[],
    emptyMessage?: string,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: SelectModelValue | SelectModelValue[]): void,
  }>()

  const wrapperElement = ref<typeof BaseInput>()
  const wrapper = computed(() => wrapperElement.value?.el)
  const buttonElement = ref<HTMLButtonElement>()
  const el = computed(() => buttonElement.value)

  defineExpose({ el, wrapper })

  const internalValue = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value: SelectModelValue | SelectModelValue[]) {
      emits('update:modelValue', value)
    },
  })

  const multiple = computed(() => Array.isArray(internalValue.value))

  const valueAsArray = computed(() => {
    if (!internalValue.value) {
      return []
    }

    if (Array.isArray(internalValue.value)) {
      return internalValue.value.map(option => option? option.toString() : '')
    }

    return [internalValue.value.toString()]
  })

  const selectedOption = computed(() => {
    if (multiple.value) {
      return null
    }

    return props.options.find(x => x.value === internalValue.value)
  })

  function getSelectOption(value: SelectModelValue): SelectOption | undefined {
    return props.options.find(x => x.value === value)
  }

  function unselectOptionValue(tag: SelectModelValue): void {
    const value = valueAsArray.value.filter(x => x !== tag)

    internalValue.value = value
  }
</script>

<style>
.p-select-button__control { @apply
  w-full
  h-full
  pl-3
  pr-10
  py-2
  text-left
  cursor-default
  outline-none
  border-none
  ring-0
  focus:ring-0
}

.p-select-button__value { @apply
  truncate
  flex
  items-center
}

.p-select-button__value:empty:before {
  content: "\200b";
}

.p-select-button__icon { @apply
  pr-2
  flex
  items-center
}

.p-select-button__icon .p-icon { @apply
  w-4
  h-4
}
</style>