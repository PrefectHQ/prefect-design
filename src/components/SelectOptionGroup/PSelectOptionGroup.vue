<template>
  <div class="p-select-option-group" role="group">
    <div class="p-select-option-group__label">
      <slot :group="group">
        {{ group.label }}
      </slot>
    </div>
    <PSelectOptions v-model="modelValue" v-model:highlightedValue="highlightedValue" :options="group.options" />
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PSelectOptions from '@/components/Select/PSelectOptions.vue'
  import { SelectModelValue, SelectOptionGroup } from '@/types'

  const props = defineProps<{
    group: SelectOptionGroup,
    modelValue: SelectModelValue | SelectModelValue[],
    highlightedValue: SelectModelValue | symbol,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: SelectModelValue | SelectModelValue[]): void,
    (event: 'update:highlightedValue', value: SelectModelValue | symbol): void,
  }>()

  const modelValue = computed({
    get() {
      return props.modelValue
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
</script>

<style>
.p-select-option-group { @apply
  border-t
  mt-1
  py-1
  border-foreground/50
  text-foreground/50
}

.p-select-option-group:first-child { @apply
  border-t-0
}

.p-select-option-group__label { @apply
  px-3
}
</style>