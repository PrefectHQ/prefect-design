<template>
  <teleport to="body">
    <transition name="p-drawer__slide" :duration="350">
      <keep-alive>
        <PLayoutResizable v-if="modelValue" :disabled="!resizable" class="p-drawer" :class="classes.root">
          <template #aside>
            <div class="p-drawer__aside" :style="styles" :class="attrClasses" v-bind="{ ...listeners, ...attrs }">
              <slot v-bind="{ show, hide, toggle }" />
            </div>
          </template>

          <slot name="overlay" v-bind="{ show, hide, toggle }">
            <div class="p-drawer__overlay" @click="toggle" />
          </slot>
        </PLayoutResizable>
      </keep-alive>
    </transition>
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

  export type PDrawerPlacement = 'left' | 'right' | 'top' | 'bottom'

  const props = defineProps<{
    modelValue?: boolean,
    resizable?: boolean,
    placement?: PDrawerPlacement,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: boolean): void,
  }>()

  const placement = computed(() => props.placement ?? 'left')

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

  const classes = computed(() => ({
    root: {
      [`p-drawer--${placement.value}`]: !!placement.value,
    },
  }))
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
  w-full
  z-50
}

.p-drawer--left { @apply
  left-0
  top-0
}

.p-drawer--right { @apply
  right-0
  top-0
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
}

.p-drawer__overlay { @apply
  w-full
  h-full
  z-0
}

.p-drawer__slide-enter-active .p-drawer__aside,
.p-drawer__slide-leave-active .p-drawer__aside {
  transition: all 150ms ease-in-out;
}

.p-drawer__slide-enter-from .p-drawer__aside,
.p-drawer__slide-leave-to .p-drawer__aside {
  transform: translateX(-100%);
}

.p-drawer__slide-enter-active::before ,
.p-drawer__slide-leave-active::before {
  transition: all 300ms 50ms ease-in-out;
}

.p-drawer__slide-enter-from::before ,
.p-drawer__slide-leave-to::before { @apply
  opacity-0
}
</style>