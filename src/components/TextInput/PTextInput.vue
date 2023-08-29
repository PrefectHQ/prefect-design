<template>
  <PBaseInput ref="wrapperElement" class="p-text-input">
    <template v-for="(index, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope" />
    </template>
    <template #control="{ attrs }">
      <input
        ref="inputElement"
        v-model="value"
        type="text"
        class="p-text-input__control"
        v-bind="attrs"
        @focus="handleFocus"
      >
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
    (event: 'focus'): void,
  }>()

  const wrapperElement = ref<typeof PBaseInput>()
  const wrapper = computed(() => wrapperElement.value?.el)
  const inputElement = ref<HTMLInputElement>()
  const el = computed(() => inputElement.value)

  defineExpose({ el, wrapper })

  const value = computed({
    get() {
      return props.modelValue ?? ''
    },
    set(value) {
      emits('update:modelValue', value)
    },
  })

  const handleFocus = (): void => {
    emits('focus')
  }
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
  rounded-default
  border-0
  focus:ring-0
}
</style>