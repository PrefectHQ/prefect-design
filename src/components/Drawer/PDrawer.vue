<template>
  <slot name="activator" v-bind="{ show, hide, toggle }" />

  <teleport to="body">
    <template v-if="modelValue">
      <aside class="p-drawer" :style="styles" :class="attrClasses" v-bind="{ ...listeners, ...attrs }">
        <slot v-bind="{ show, hide, toggle }" />
      </aside>
    </template>
  </teleport>
</template>

<script lang="ts">
  export default {
    name: 'PDrawer',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { useAttrsStylesClassesAndListeners } from '@/compositions'

  const props = defineProps<{
    modelValue?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: boolean): void,
  }>()

  const { classes: attrClasses, listeners, styles, attrs } = useAttrsStylesClassesAndListeners()

  const internalValue = ref(props.modelValue)
  const modelValue = computed<boolean>({
    get() {
      return props.modelValue || internalValue.value
    },
    set(value) {
      internalValue.value = value
      emit('update:modelValue', value)
    },
  })

  const hide = (): void => {
    modelValue.value = false
  }

  const toggle = (): void => {
    modelValue.value = !modelValue.value
  }

  const show = (): void => {
    modelValue.value = true
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