<template>
  <teleport to="body">
    <transition name="p-drawer__slide" :duration="350">
      <keep-alive>
        <PLayoutResizable v-if="open" :disabled="!resizable" class="p-drawer" :class="classes.root" :placement="placement">
          <template #aside>
            <div class="p-drawer__aside" v-bind="attrs">
              <slot v-bind="drawerScope" />
            </div>
          </template>

          <slot name="overlay" v-bind="drawerScope">
            <div class="p-drawer__overlay" @click="drawerScope.close" />
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
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { computed, useAttrs, ref } from 'vue'
  import { useDrawer, useGlobalEventListener } from '@/compositions'
  import { PLayoutResizable } from '@/layouts'
  import { DrawerPlacement, keys } from '@/types'
  import { isKeyEvent } from '@/utilities'

  const props = defineProps<{
    open?: boolean,
    resizable?: boolean,
    placement?: DrawerPlacement,
  }>()

  const emit = defineEmits<{
    (event: 'update:open', value: boolean): void,
  }>()

  const placement = computed(() => props.placement ?? 'left')

  const attrs = useAttrs()

  const internalOpen = ref<boolean>(false)
  const open = computed<boolean>({
    get() {
      return props.open || internalOpen.value
    },
    set(value) {
      internalOpen.value = value
      emit('update:open', value)
    },
  })

  const drawerScope = useDrawer(open)
  function closeOnEscape(event: KeyboardEvent): void {
    if (isKeyEvent(keys.escape, event)) {
      drawerScope.close()
    }
  }
  useGlobalEventListener('keyup', closeOnEscape)

  const classes = computed(() => ({
    root: `p-drawer--${placement.value}`,
  }))
</script>

<style>
.p-drawer {
  --p-layout-resizable-aside-size: var(--p-drawer-size, 256px);
  --p-layout-resizable-aside-max-size: var(--p-drawer-max-size, 512px);
  --p-layout-resizable-aside-min-size: var(--p-drawer-min-size, 256px);
}

.p-drawer--top {
  --p-drawer-slide-transform: translate3d(0, -100%, 0);
}

.p-drawer--left {
  --p-drawer-slide-transform: translate3d(-100%, 0, 0);
}

.p-drawer--right {
  --p-drawer-slide-transform: translate3d(100%, 0, 0);
}

.p-drawer--bottom {
  --p-drawer-slide-transform: translate3d(0, 100%, 0);
}

.p-drawer { @apply
  h-full
  fixed
  w-full
  z-50
}

.p-drawer--top,
.p-drawer--left { @apply
  left-0
  top-0
}

.p-drawer--right { @apply
  right-0
  top-0
}

.p-drawer--bottom { @apply
  left-0
  bottom-0
}

.p-drawer::before {
  content: '';
}

.p-drawer::before { @apply
  bg-overlay
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

.p-drawer__slide-enter-active .p-layout-resizable__aside,
.p-drawer__slide-leave-active .p-layout-resizable__aside { @apply
  overflow-hidden
}

.p-drawer__slide-enter-from .p-drawer__aside,
.p-drawer__slide-leave-to .p-drawer__aside {
  transform: var(--p-drawer-slide-transform);
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