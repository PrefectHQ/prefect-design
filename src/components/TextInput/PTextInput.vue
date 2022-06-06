<template>
  <PBaseInput class="p-text-input">
    <template v-for="(index, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope" />
    </template>
    <template #control="{ attrs }">
      <input v-model="value" type="text" class="p-text-input__control" v-bind="attrs">
    </template>
  </PBaseInput>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PBaseInput from '@/components/BaseInput/PBaseInput.vue'

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
.p-text-input__control { @apply
  cursor-text
}

.p-text-input__control:disabled { @apply
  cursor-not-allowed
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