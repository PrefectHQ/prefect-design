<template>
  <div class="p-button-group__container">
    <p-button
      class="p-button-group p-button-group__left"
      :inset="secondaryLeft"
      :size="size"
      :icon="leftIcon"
      :disabled="disabled"
      @click="clickLeft"
    >
      {{ leftValue }}
    </p-button>
    <p-button
      class="p-button-group p-button-group__right"
      :inset="secondaryRight"
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
  import { onMounted, ref, withDefaults } from 'vue'
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

  const secondaryRight = ref<boolean>(true)
  const secondaryLeft = ref<boolean>(false)

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void,
  }>()

  const clickLeft = (): void => {
    secondaryRight.value = true
    secondaryLeft.value = false
    emit('update:modelValue', props.leftValue)
  }

  const clickRight = (): void => {
    secondaryRight.value = false
    secondaryLeft.value = true
    emit('update:modelValue', props.rightValue)
  }

  onMounted(() => {
    emit('update:modelValue', props.leftValue)
  })
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