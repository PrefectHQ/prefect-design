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

    <div ref="overflowTag" class="p-tag-wrapper__tag-overflow">
      <slot name="overflow-tags" :overflowed-children="overflowChildren">
        <p-tag v-show="hasOverflowChildren">
          +{{ overflowChildren }}
        </p-tag>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, Ref, onMounted, onUnmounted } from 'vue'
  import { PTag } from '@/components/Tag'

  defineProps<{
    tags?: string[],
  }>()
  const container: Ref<HTMLDivElement | undefined> = ref()
  const overflowChildren = ref(0)
  const overflowTag = ref()

  let resizeObserver: ResizeObserver | null = null
  const hasOverflowChildren = computed(() => overflowChildren.value > 0)
  function setChildIsVisible(child: HTMLElement): boolean {
    const containerWidth = container.value?.offsetWidth ?? 0

    const overflowTagWidth = overflowTag.value.children[0].clientWidth ?? 55

    if (child.classList.contains('p-tag-wrapper__tag--hidden')) {
      child.classList.add('p-tag-wrapper__tag--invisible')
      child.classList.remove('p-tag-wrapper__tag--hidden')
    }

    const childOverflowsContainer = child.offsetLeft + child.offsetWidth  > containerWidth - overflowTagWidth


    if (childOverflowsContainer) {
      child.classList.add('p-tag-wrapper__tag--hidden')
    } else {
      child.classList.remove('p-tag-wrapper__tag--hidden')
    }
    child.classList.remove('p-tag-wrapper__tag--invisible')

    return childOverflowsContainer
  }

  function updateOverflownChildren(entries: ResizeObserverEntry[]): void {
    overflowChildren.value = entries.reduce((sum, entry) => {
      const children = Array.from(entry.target.children) as HTMLElement[]
      return sum + getChildOverflow(children)
    }, 0)
  }

  function getChildOverflow(children: HTMLElement[]): number {
    return children
      .filter(child => !child.classList.contains('p-tag-wrapper__tag-overflow'))
      .reduce((childSum, child) => {
        if (setChildIsVisible(child)) {
          childSum++
        }
        return childSum
      }, 0)
  }

  function createObserver(): void {
    resizeObserver = new ResizeObserver(updateOverflownChildren)

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

.p-tag-wrapper__tag-overflow {
  display: inline-block;
}
</style>