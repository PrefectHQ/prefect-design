<template>
  <div ref="container" class="tag-wrapper">
    <slot />
    <p-tag v-show="hasOverflowChildren" class="tag-wrapper__tag-overflow">
      +{{ overflowChildren }}
    </p-tag>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, Ref, onMounted, onUnmounted } from 'vue'

  const container: Ref<HTMLDivElement | undefined> = ref()
  const overflowChildren = ref(0)

  let resizeObserver: ResizeObserver | null = null
  const hasOverflowChildren = computed(() => overflowChildren.value > 0)

  let count = 0
  function setChild(child: HTMLElement): void {
    const containerWidth = container.value?.parentElement?.offsetWidth ?? 0
    /*
    note: overflowTagWidth is a fixed width of the tag that displays the overflow number e.g. (+13)
    This should be replaced with the calculation of the overflow tag
    */
    const overflowTagWidth = 55

    if (child.classList.contains('tag-wrapper__tag--hidden')) {
      child.classList.add('tag-wrapper__tag--invisible')
      child.classList.remove('tag-wrapper__tag--hidden')
    }

    if (!child.offsetLeft && !child.offsetWidth) {
      return
    }
    const overflow = child.offsetLeft + child.offsetWidth  > containerWidth - overflowTagWidth


    if (overflow) {
      count++
      child.classList.add('tag-wrapper__tag--hidden')
    }  else {
      child.classList.remove('tag-wrapper__tag--hidden')
    }
    child.classList.remove('tag-wrapper__tag--invisible')
  }

  function setOverflow(entries: ResizeObserverEntry[]): void {
    count = 0
    entries.forEach(entry => {
      Array.from(entry.target.children)
        .filter(child => !child.classList.contains('tag-wrapper__tag-overflow'))
        .forEach((child) => {
          setChild(child as HTMLElement)
        })
    })
    overflowChildren.value = count
  }

  function createObserver(): void {
    resizeObserver = new ResizeObserver(setOverflow)

    if (container.value) {
      resizeObserver.observe(container.value)
    }
  }

  onMounted(() => {
    createObserver()
  })

  onUnmounted(() => {
    resizeObserver?.disconnect()
  })
</script>


<style>
.tag-wrapper {
  position:relative;
  display: block;
  white-space: nowrap;
}

.tag-wrapper__tag--hidden {
  display: none !important;
}

.tag-wrapper__tag--invisible {
  visibility: hidden !important;
}
</style>