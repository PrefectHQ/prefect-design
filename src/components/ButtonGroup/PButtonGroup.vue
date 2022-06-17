<template>
  <div class="p-button-group__container">
    <p-button
      class="p-button-group p-button-group__left"
      :inset="activeLeft"
      :size="size"
      :icon="leftIcon"
      :disabled="disabled"
      @click="clickLeft"
    >
      {{ leftValue }}
    </p-button>
    <p-button
      class="p-button-group p-button-group__right"
      :inset="activeRight"
      :size="size"
      :icon="rightIcon"
      :disabled="disabled"
      @click="clickRight"
    >
      {{ rightValue }}
    </p-button>
  </div>
</template>

<script lang="ts" setup>
  import { ref, withDefaults } from 'vue'
  import { Icon, Size } from '@/types'

  const props = withDefaults(defineProps<{
    leftValue: string,
    rightValue: string,
    size?: Size,
    leftIcon?: Icon,
    rightIcon?: Icon,
    disabled?: boolean,
  }>(), {
    size: 'md',
    leftIcon: undefined,
    rightIcon: undefined,
  })

  const activeRight = ref<boolean>(true)
  const activeLeft = ref<boolean>(false)

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void,
  }>()

  const clickLeft = (): void => {
    activeRight.value = true
    activeLeft.value = false
    emit('update:modelValue', props.leftValue)
  }

  const clickRight = (): void => {
    activeRight.value = false
    activeLeft.value = true
    emit('update:modelValue', props.rightValue)
  }
</script>

<style>
  .p-button-group__container {
    @apply
    inline-flex
  }

  .p-button-group {
    @apply
    focus:z-10
  }

  .p-button-group__left {
    @apply
    rounded-r-none
  }

  .p-button-group__right {
    @apply
    rounded-l-none
  }
</style>