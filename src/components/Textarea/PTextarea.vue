<template>
  <BaseInput class="p-textarea" v-bind="$attrs">
    <template v-for="(index, name) in $slots" #[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
    <template #control="{ attrs }">
      <textarea v-model="value" class="p-textarea__control" v-bind="attrs" />
    </template>
  </BaseInput>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'

  export default defineComponent({
    name: 'PTextarea',
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
    set(value: string) {
      emits('update:modelValue', value)
    },
  })
</script>

<style>
.p-textarea__control {
  cursor: text;
}

.p-textarea__control { @apply
  bg-transparent
  block
  w-full
  rounded-md
  border-0
  focus:ring-0
}
</style>