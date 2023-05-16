<template>
  <transition
    name="expand"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
  >
    <slot />
  </transition>
</template>

<script lang="ts" setup>
  import { isHtmlElement } from '@/utilities'

  function enter(element: Element): void {
    if (!isHtmlElement(element)) {
      return
    }

    const { width } = getComputedStyle(element)

    element.style.width = width
    element.style.position = 'absolute'
    element.style.visibility = 'hidden'
    element.style.height = 'auto'

    const { height } = getComputedStyle(element)

    element.style.width = ''
    element.style.position = ''
    element.style.visibility = ''
    element.style.height = '0'

    forceRepaint(element)
    setHeightAfterAnimation(element, height)
  }

  function afterEnter(element: Element): void {
    if (!isHtmlElement(element)) {
      return
    }

    element.style.height = 'auto'
  }

  function leave(element: Element): void {
    if (!isHtmlElement(element)) {
      return
    }

    const { height } = getComputedStyle(element)

    element.style.height = height

    forceRepaint(element)
    setHeightAfterAnimation(element, '0')
  }

  function setHeightAfterAnimation(element: HTMLElement, height: string): void {
    requestAnimationFrame(() => {
      element.style.height = height
    })
  }

  function forceRepaint(element: HTMLElement): string {
    return getComputedStyle(element).height
  }
</script>

<style scoped>
* {
  will-change: height;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

.expand-enter-active,
.expand-leave-active {
  transition: height 0.3s ease-in-out;
  overflow: hidden;
}

.expand-enter,
.expand-leave-to {
  height: 0;
}
</style>