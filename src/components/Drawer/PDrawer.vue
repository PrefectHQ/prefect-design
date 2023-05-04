<template>
  <slot name="activator" v-bind="{ show, hide, toggle }" />

  <teleport to="body">
    <template v-if="modelValue">
      <aside class="p-drawer">
        <slot v-bind="{ show, hide, toggle }" />
      </aside>
    </template>
  </teleport>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'

  const props = defineProps<{
    modelValue?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: boolean): void,
  }>()

  const internalValue = ref(props.modelValue)
  const modelValue = computed<boolean>({
    get() {
      return props.modelValue && internalValue.value
    },
    set(value) {
      internalValue.value = value
      emit('update:modelValue', value)
    },
  })

  const hide = (): void => {
    internalValue.value = false
  }

  const toggle = (): void => {
    internalValue.value = !internalValue.value
  }

  const show = (): void => {
    internalValue.value = true
  }
</script>

<style>
.p-drawer { @apply
  h-full
  fixed
  top-0
  left-0
  z-50
}
</style>