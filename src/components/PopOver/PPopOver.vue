<template>
  <div ref="target" class="p-pop-over" v-bind="attrs">
    <slot name="target" v-bind="{ open, close, toggle, visible }" />
  </div>
  <teleport v-if="visible" :to="container">
    <div ref="content" class="p-pop-over-content" :style="styles">
      <slot v-bind="{ close }" />
    </div>
  </teleport>
</template>

<script lang="ts">
  export default {
    name: 'PPopOver',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { ref, watch, computed, useAttrs, onMounted, onUnmounted } from 'vue'
  import { useMostVisiblePositionStyles } from '@/compositions/position'
  import { usePopOverGroup } from '@/compositions/usePopOverGroup'
  import { PositionMethod } from '@/types/position'
  import { randomId } from '@/utilities'
  import { left, right, bottom, top } from '@/utilities/position'

  const props = withDefaults(defineProps<{
    placement?: PositionMethod | PositionMethod[],
    autoClose?: boolean,
    to?: string | Element,
    group?: string,
  }>(), {
    placement: () => [right, bottom, top, left],
    to: 'body',
    group: () => randomId(),
  })

  const emit = defineEmits<{
    (event: 'open', value: boolean): void,
  }>()

  const visible = ref(false)
  const attrs = useAttrs()
  const container = ref<Element>()
  const { open: setGroupCloseMethod } = usePopOverGroup(props.group)

  const placements = computed(() => Array.isArray(props.placement) ? props.placement : [props.placement])
  const { target, content, styles } = useMostVisiblePositionStyles(placements, { container })

  defineExpose({
    open,
    close,
    toggle,
    visible,
    target,
    content,
  })

  onMounted(() => {
    if (props.autoClose) {
      document.addEventListener('click', eventHandler)
      document.addEventListener('focusin', eventHandler)
    }
  })

  onUnmounted(() => {
    document.removeEventListener('click', eventHandler)
    document.removeEventListener('focusin', eventHandler)
  })

  function getContainer(): Element | undefined {
    if (typeof props.to === 'string') {
      return target.value!.closest(props.to) ?? undefined
    }

    return props.to
  }

  function eventHandler(event: MouseEvent | FocusEvent): void {
    if (target.value?.contains(event.target as Node) || content.value?.contains(event.target as Node)) {
      return
    }

    close()
  }

  function open(): void {
    setGroupCloseMethod(close)

    container.value = getContainer()
    visible.value = true
  }

  function close(): void {
    visible.value = false
  }

  function toggle(): void {
    if (!visible.value) {
      open()
    } else {
      close()
    }
  }

  watch(visible, value => emit('open', value))
</script>

<style>
.p-pop-over-content {
  z-index: var(--p-pop-over-content-z-index, 100)
}
</style>