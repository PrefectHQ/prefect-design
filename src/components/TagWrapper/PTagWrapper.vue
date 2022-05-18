<template>
  <div ref="container" class="p-tag-wrapper">
    <div class="p-tag-wrapper__tag-container" :class="classes.tagContainer">
      <slot>
        <template v-for="tag in tags">
          <slot name="tag" :tag="tag">
            <p-tag class="p-tag-wrapper__tag" :class="classes.tag">
              {{ tag }}
            </p-tag>
          </slot>
        </template>
      </slot>


      <div v-show="hasOverflowChildren" ref="overflowTag" class="p-tag-wrapper__tag-overflow">
        <slot name="overflow-tags" :overflowed-children="overflowChildren">
          <p-tag>
            +{{ overflowChildren }}
          </p-tag>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, Ref, onMounted, onUnmounted } from 'vue'
  import { PTag } from '@/components/Tag'

  const props = defineProps<{
    tags?: string[],
    justify?: 'left' | 'center' | 'right',
  }>()
  const container: Ref<HTMLDivElement | undefined> = ref()
  const overflowChildren = ref(1)
  const overflowTag = ref()

  const classes = computed(() => {
    return {
      tag: [`p-tag-wrapper__tag--${props.justify ?? 'left'}`],
      tagContainer:
        [`p-tag-wrapper__tag-container--${props.justify ?? 'left'}`],

    }
  })

  let resizeObserver: ResizeObserver | null = null
  const hasOverflowChildren = computed(() => overflowChildren.value > 0)
  function setChildIsVisible(child: HTMLElement): boolean {
    const containerWidth = container.value?.offsetWidth ?? 0

    const overflowTagWidth = overflowTag.value.offsetWidth ?? 55

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
    const children = Array.from(entries[0]?.target?.querySelector('.p-tag-wrapper__tag-container')?.children ?? []) as HTMLElement[]
    let largestChildHeight = 0
    overflowChildren.value = children.reduce((sum, entry) => {
      largestChildHeight = Math.max(largestChildHeight, entry.offsetHeight)
      return sum + getChildOverflow([entry])
    }, 0)

    if (container.value) {
      container.value.style.height = `${largestChildHeight}px`
    }
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
.p-tag-wrapper { @apply
  relative
  block
  whitespace-nowrap;
}

.p-tag-wrapper__tag--hidden { @apply
  !hidden;
}

.p-tag-wrapper__tag--invisible {
  visibility: hidden !important;
}

.p-tag-wrapper__tag--right { @apply
  ml-1;
}

.p-tag-wrapper__tag--center { @apply
  mx-[0.125rem];
}

.p-tag-wrapper__tag--left { @apply
  mr-1;
}

.p-tag-wrapper__tag-overflow {
  display: inline-block;
}

.p-tag-wrapper__tag-container { @apply
  absolute
  left-0
  top-0
  w-full
  h-full;
}

.p-tag-wrapper__tag-container--right { @apply
  text-right
}

.p-tag-wrapper__tag-container--center { @apply
  text-center
}

.p-tag-wrapper__tag-container--left { @apply
  text-left
}
</style>