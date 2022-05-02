<template>
  <div ref="container" class="tag-wrapper">
    <slot />

    <p-tag v-show="hasOverflowChildren" class="overflow">
      +{{ overflowChildren }}
    </p-tag>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, Ref, onMounted } from 'vue'

  const container: Ref<HTMLDivElement | undefined> = ref()
  const overflowChildren = ref(0)

  const hasOverflowChildren = computed(() => overflowChildren.value > 0)

  let count = 0
  function setChild(child: HTMLElement): void {
    // todo: get width or magic of overflow tag
    const containerWidth = container.value?.parentElement?.offsetWidth ?? 0
    const overflowTagWidth = 55
    if (!child.offsetLeft && !child.offsetWidth) {
      return
    }

    const overflow = child.offsetLeft + child.offsetWidth  > containerWidth - overflowTagWidth

    if (child.classList.contains('hidden')) {
      child.classList.add('invisible')
      child.classList.remove('hidden')
    }

    if (overflow) {
      count++
      child.classList.add('hidden')
    } else {
      child.classList.remove('hidden')
    }

    child.classList.remove('invisible')
  }

  function setOverflow(entries: ResizeObserverEntry[]): void {

    const { children } = entries[0].target
    // count = 0
    Array.from(children).filter(child => !child.classList.contains('overflow')).forEach((child) => {
      setChild(child as HTMLElement)
    })
    overflowChildren.value = count
  }
  onMounted(() => {
    if (container.value) {
      new ResizeObserver(setOverflow).observe(container.value)
    }
  })
</script>


<style>
.tag-wrapper {
  position:relative;
  display: block;
  white-space: nowrap;
}
.hidden {
  display: none !important;
}

.invisible {
  visibility: hidden !important;
}
</style>