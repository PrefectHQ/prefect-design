<template>
  <div ref="container" class="p-tag-wrapper">
    <slot>
      <template v-for="tag in tags">
        <slot name="tag" :tag="tag">
          <p-tag>
            {{ tag }}
          </p-tag>
        </slot>
      </template>
    </slot>

    <p-tag v-show="hasOverflowChildren" class="p-tag-wrapper__tag-overflow">
      +{{ overflowChildren }}
    </p-tag>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, Ref, onMounted, onUnmounted } from 'vue'
  defineProps<{
    tags?: string[],
  }>()
  const container: Ref<HTMLDivElement | undefined> = ref()
  const overflowChildren = ref(0)

  let resizeObserver: ResizeObserver | null = null
  const hasOverflowChildren = computed(() => overflowChildren.value > 0)

  function setChild(child: HTMLElement): number {
    const containerWidth = container.value?.parentElement?.offsetWidth ?? 0
    /*
    note: overflowTagWidth is a fixed width for the tag that displays the overflow number e.g. (+13)
    This should be replaced with a calculated width instead
    The fixed width is used to account for the content in the overflow tag
    */
    const overflowTagWidth = 55
    if (child.classList.contains('p-tag-wrapper__tag--hidden')) {
      child.classList.add('p-tag-wrapper__tag--invisible')
      child.classList.remove('p-tag-wrapper__tag--hidden')
    }

    if (!child.offsetLeft && !child.offsetWidth) {
      return 0
    }
    const childOverflowsContainer = child.offsetLeft + child.offsetWidth  > containerWidth - overflowTagWidth


    if (childOverflowsContainer) {
      child.classList.add('p-tag-wrapper__tag--hidden')
      return 1
    }
    child.classList.remove('p-tag-wrapper__tag--hidden')
    child.classList.remove('p-tag-wrapper__tag--invisible')
    return 0
  }

  function setOverflow(entries: ResizeObserverEntry[]): void {
    let count = 0
    entries.forEach(entry => {
      Array.from(entry.target.children)
        .filter(child => !child.classList.contains('p-tag-wrapper__tag-overflow'))
        .forEach((child) => {
          count = count +  setChild(child as HTMLElement)
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
.p-tag-wrapper {
  position:relative;
  display: block;
  white-space: nowrap;
}

.p-tag-wrapper__tag--hidden {
  display: none !important;
}

.p-tag-wrapper__tag--invisible {
  visibility: hidden !important;
}
</style>