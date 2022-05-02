<template>
  <div ref="container" class="tag-wrapper">
    <slot />
    <p-tag v-if="hasOverflowChildren" class="tag-wrapper__tag-overflow">
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
    const containerWidth = container.value?.parentElement?.offsetWidth ?? 0
    const overflowTagWidth = 55

    if (!child.offsetLeft && !child.offsetWidth) {
      return
    }

    const overflow = child.offsetLeft + child.offsetWidth  > containerWidth - overflowTagWidth

    if (child.classList.contains('tag-wrapper__tag-hidden')) {
      child.classList.add('tag-wrapper__tag-invisible')
      child.classList.remove('tag-wrapper__tag-hidden')
    }

    if (overflow) {
      count++
      child.classList.add('tag-wrapper__tag-hidden')
    }
  }

  function setOverflow(entries: ResizeObserverEntry[]): void {
    entries.forEach(entry => {
      Array.from(entry.target.children)
        .filter(child => !child.classList.contains('tag-wrapper__tag-overflow'))
        .forEach((child) => {
          setChild(child as HTMLElement)
        })
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
.tag-wrapper__tag-hidden {
  display: none !important;
}
.tag-wrapper__tag-invisible {
  visibility: hidden !important;
}
</style>