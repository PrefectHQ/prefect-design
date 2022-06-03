<template>
  <BaseInput class="p-text-input" v-bind="$attrs">
    <template v-for="(index, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope" />
    </template>
    <template #control="{ attrs }">
      <input v-model="value" type="text" class="p-text-input__control" v-bind="attrs">
    </template>
  </BaseInput>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'

  export default defineComponent({
    name: 'PTextInput',
    expose: [],
    inheritAttrs: false,
  })
</script>

<script lang="ts" setup>
  import BaseInput from '@/components/BaseInput/BaseInput.vue'

  const props = defineProps<{
    modelValue: string | null | undefined,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: string | null): void,
  }>()

  const value = computed({
    get() {
      return props.modelValue ?? ''
    },
    set(value: string | null) {
      emits('update:modelValue', value)
    },
  })
</script>

<style>
.p-text-input__control {
  cursor: text;
}

.p-text-input__control { @apply
  bg-transparent
  block
  w-full
  rounded-md
  border-0
  focus:ring-0
}
</style>