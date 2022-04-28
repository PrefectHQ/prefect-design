<template>
  <BaseInput class="p-textarea">
    <template v-for="(index, name) in $slots" #[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
    <template #control="{ attrs }">
      <textarea v-model="value" class="p-textarea__control" v-bind="attrs" />
    </template>
  </BaseInput>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import BaseInput from '@/components/BaseInput'

  const props = defineProps<{
    modelValue: string | null,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: string | null): void,
  }>()

  const value = computed({
    get() {
      return props.modelValue
    },
    set(value: string | null) {
      emits('update:modelValue', value)
    },
  })
</script>

<style>
.p-textarea__control {
  cursor: inherit;
}

.p-textarea__control { @apply
  block
  w-full
  rounded-md
}
</style>