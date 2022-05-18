<template>
  <div ref="container" class="p-tag-wrapper">
    <div class="p-tag-wrapper__tag-container" :class="classes.tagContainer">
      <slot>
        <template v-for="tag in tags" :key="tag">
          <div class="p-tag-wrapper__tag" :class="classes.tag">
            <slot name="tag" :tag="tag">
              <p-tag>
                {{ tag }}
              </p-tag>
            </slot>
          </div>
        </template>
      </slot>


      <div ref="overflowTag" class="p-tag-wrapper__tag-overflow" :class="classes.overflowTag">
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
  const ready = ref(false)
  const overflowChildren = ref(0)
  const overflowTag = ref()

  const classes = computed(() => {
    return {
      overflowTag: [
        `p-tag-wrapper__tag--${props.justify ?? 'left'}`,
        { 'p-tag-wrapper__tag--hidden': !hasOverflowChildren.value },
      ],
      tag: [`p-tag-wrapper__tag--${props.justify ?? 'left'}`],
      tagContainer:
        [
          `p-tag-wrapper__tag-container--${props.justify ?? 'left'}`,
          { 'p-tag-wrapper__tag-container--invisible': !ready.value },
        ],

    }
  })

  let resizeObserver: ResizeObserver | null = null
  const hasOverflowChildren = computed(() => overflowChildren.value > 0)

  const calculateOverflow = (entries: ResizeObserverEntry[]): void => {
    const children = Array.from(
      entries[0]?.target?.querySelector('.p-tag-wrapper__tag-container')?.children ?? [])
      .filter(child => !child.classList.contains('p-tag-wrapper__tag-overflow'),
      ) as HTMLElement[]

    const containerBoundingBox = container.value!.getBoundingClientRect()

    let overflowed = false

    overflowChildren.value = children.length
    let tagsWidth = 0
    let largestChildHeight = overflowTag.value.offsetHeight

    const invisibleClass = 'p-tag-wrapper__tag--invisible'
    const hiddenClass = 'p-tag-wrapper__tag--hidden'

    for (const child of children) {
      child.classList.add(invisibleClass)
      child.classList.remove(hiddenClass)

      if (overflowed) {
        child.classList.add(hiddenClass)
        child.classList.remove(invisibleClass)
      } else {
        const boundingBox = child.getBoundingClientRect()
        overflowed = tagsWidth + boundingBox.width >= containerBoundingBox.width

        if (overflowed) {
          child.classList.add(hiddenClass)
          child.classList.remove(invisibleClass)
        } else {
          child.classList.remove(invisibleClass)
          child.classList.remove(hiddenClass)

          tagsWidth += boundingBox.width
          largestChildHeight = Math.max(largestChildHeight, boundingBox.height)
          overflowChildren.value--
        }
      }
    }

    if (overflowChildren.value > 0) {
      if (tagsWidth + overflowTag.value.offsetWidth > containerBoundingBox.width) {
        const child = children.reverse().find(child => !child.classList.contains(hiddenClass))
        if (child) {
          child.classList.add(hiddenClass)
          overflowChildren.value++
        }
      }
    }

    if (container.value) {
      container.value.style.height = `${largestChildHeight}px`
    }

    ready.value = true
  }

  function createObserver(): void {
    resizeObserver = new ResizeObserver(calculateOverflow)

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

.p-tag-wrapper__tag { @apply
  inline-block;
}

.p-tag-wrapper__tag--right { @apply
  pl-1;
}

.p-tag-wrapper__tag--center { @apply
  px-[0.125rem];
}

.p-tag-wrapper__tag--left { @apply
  pr-1;
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

.p-tag-wrapper__tag-container--invisible {
  visibility: hidden !important;
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