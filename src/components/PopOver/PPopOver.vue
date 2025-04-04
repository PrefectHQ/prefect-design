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

<script lang="ts" setup>
  import { useGlobalEventListener } from '@prefecthq/vue-compositions'
  import { ref, watch, computed, useAttrs } from 'vue'
  import { useMostVisiblePositionStyles } from '@/compositions/position'
  import { usePopOverGroup } from '@/compositions/usePopOverGroup'
  import { PositionMethod } from '@/types/position'
  import { randomId } from '@/utilities'
  import { left, right, bottom, top } from '@/utilities/position'

  defineOptions({
    inheritAttrs: false,
  })

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

  useGlobalEventListener('click', eventHandler)
  useGlobalEventListener('focusin', eventHandler)
  useGlobalEventListener('contextmenu', eventHandler)

  function getContainer(): Element | undefined {
    if (typeof props.to === 'string') {
      return target.value!.closest(props.to) ?? undefined
    }

    return props.to
  }

  function eventHandler(event: MouseEvent | FocusEvent): void {
    const eventTarget = event.target as Element
    const isMouseEvent = event instanceof MouseEvent

    /*
     * isEventInElement checks are backup checks for click events where the
     * click changes the content of the popover. The element clicked on may
     * no longer exist in the dom so the element.contains check will fail.
     * So falling back to checking if the event x,y originated within the element
     */
    if (
      !props.autoClose
      || target.value?.contains(eventTarget)
      || isMouseEvent && isEventInElement(event, target.value)
      || content.value?.contains(eventTarget)
      || isMouseEvent && isEventInElement(event, content.value)
      || eventTarget.closest('.p-pop-over-content') !== null
    ) {
      return
    }

    close()
  }

  function isEventInElement(event: MouseEvent, element: Element | undefined): boolean {
    if (!element) {
      return false
    }

    const rect = element.getBoundingClientRect()
    const { clientX, clientY } = event

    if (clientX < rect.left || clientX >= rect.right) {
      return false
    }

    if (clientY < rect.top || clientY >= rect.bottom) {
      return false
    }

    return true
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