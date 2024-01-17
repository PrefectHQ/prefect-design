<template>
  <PBaseInput class="p-textarea">
    <template v-for="(index, name) in $slots" #[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
    <template #control="{ attrs }">
      <textarea ref="el" v-model="value" class="p-textarea__control" v-bind="attrs" />
    </template>
  </PBaseInput>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import PBaseInput from '@/components/BaseInput/PBaseInput.vue'

  const props = defineProps<{
    modelValue: string | null | undefined,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: string | null): void,
  }>()

  const el = ref<HTMLTextAreaElement>()

  defineExpose({ el })

  const value = computed({
    get() {
      return props.modelValue ?? ''
    },
    set(value) {
      emits('update:modelValue', value)
    },
  })
</script>

<style>
.p-textarea__control { @apply
  cursor-text
}

.p-textarea__control:disabled { @apply
  cursor-not-allowed
}

.p-textarea__control { @apply
  bg-transparent
  block
  w-full
  rounded-default
  border-0
  focus:ring-0
  min-h-[2.5rem]
}
</style>