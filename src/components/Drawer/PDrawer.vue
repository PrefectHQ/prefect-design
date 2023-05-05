<template>
  <slot name="activator" v-bind="{ show, hide, toggle }" />

  <teleport to="body">
    <keep-alive>
      <template v-if="modelValue">
        <PLayoutResizable class="p-drawer">
          <template #aside>
            <div class="p-drawer__aside" :style="styles" :class="attrClasses" v-bind="{ ...listeners, ...attrs }">
              <slot v-bind="{ show, hide, toggle }" />
            </div>
          </template>

          <slot name="overlay" v-bind="{ show, hide, toggle }">
            <div class="p-drawer__overlay" @click="toggle" />
          </slot>
        </PLayoutResizable>
      </template>
    </keep-alive>
  </teleport>
</template>

<script lang="ts">
  export default {
    name: 'PDrawer',
    expose: [],
    components: { PLayoutResizable },
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { useAttrsStylesClassesAndListeners } from '@/compositions'
  import { PLayoutResizable } from '@/layouts'

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
.p-drawer {
  --p-layout-resizable-aside-width: var(--p-drawer-width, 256px);
  --p-layout-resizable-aside-max-width: var(--p-drawer-max-width, 512px);
  --p-layout-resizable-aside-min-width: var(--p-drawer-min-width, 256px);
}

.p-drawer { @apply
  h-full
  fixed
  top-0
  left-0
  w-full
}

.p-drawer::before {
  content: '';
}

.p-drawer::before { @apply
  bg-black
  absolute
  top-0
  left-0
  right-0
  bottom-0
  opacity-50
}

.p-drawer__aside { @apply
  h-full
  z-50
}

.p-drawer__overlay { @apply
  top-0
  left-0
  w-full
  h-full
  z-40
}
</style>