<template>
  <div ref="container" class="p-tag-wrapper">
    <div class="p-tag-wrapper__tag-container" :class="classes.tagContainer">
      <slot>
        <template v-for="tag in tags" :key="tag">
          <div class="p-tag-wrapper__tag" :class="classes.tag">
            <slot name="tag" :tag="tag">
              <PTag :value="tag" />
            </slot>
          </div>
        </template>
      </slot>


      <div ref="overflowTag" class="p-tag-wrapper__tag-overflow" :class="classes.overflowTag" :title="hiddenText">
        <slot name="overflow-tags" :overflowed-children="overflowChildren">
          <PTag>
            +{{ overflowChildren }}
          </PTag>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, Ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
  import PTag from '@/components/Tag/PTag.vue'
  import { TagValue, normalize } from '@/types/tag'

  const props = defineProps<{
    tags?: (string | TagValue)[],
    justify?: 'left' | 'center' | 'right',
    inline?: boolean,
  }>()

  const container: Ref<HTMLDivElement | undefined> = ref()
  const ready = ref(false)
  const overflowChildren = ref(0)
  const overflowTag: Ref<HTMLDivElement | undefined> = ref()
  const hiddenText = ref('')

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

  const tags = computed(() => {
    const value = props.tags ?? []

    return value.map(normalize)
  })

  let resizeObserver: ResizeObserver | null = null
  const hasOverflowChildren = computed(() => overflowChildren.value > 0)

  const invisibleTagClass = 'p-tag-wrapper__tag--invisible'
  const hiddenTagClass = 'p-tag-wrapper__tag--hidden'

  const calculateOverflow = (): void => {
    const hiddenChildTexts = []
    const overflowBoundingBox = overflowTag.value!.getBoundingClientRect()
    let largestChildHeight = overflowBoundingBox.height
    let overflowed = false
    let tagsWidth = 0

    const children = Array.from(
      container.value?.querySelector('.p-tag-wrapper__tag-container')?.children ?? [],
    ).filter(child => !child.classList.contains('p-tag-wrapper__tag-overflow')) as HTMLElement[]

    overflowChildren.value = children.length

    if (props.inline) {
      setInlineContainerWidth(children)
    }

    const containerBoundingBox = container.value!.getBoundingClientRect()

    for (const child of children) {
      setTagVisibility(child, 'invisible')

      if (overflowed) {
        setTagVisibility(child, 'hidden')
        hiddenChildTexts.push(child.innerText)
      } else {
        const boundingBox = child.getBoundingClientRect()
        overflowed = tagsWidth + boundingBox.width >= containerBoundingBox.width

        if (overflowed) {
          setTagVisibility(child, 'hidden')
          hiddenChildTexts.push(child.innerText)
        } else {
          setTagVisibility(child, 'visible')

          tagsWidth += boundingBox.width
          largestChildHeight = Math.max(largestChildHeight, boundingBox.height)
          overflowChildren.value--
        }
      }
    }

    if (overflowChildren.value > 0) {
      let overflowBoundingBox = overflowTag.value!.getBoundingClientRect()
      let totalWidth = tagsWidth + overflowBoundingBox.width

      if (totalWidth > containerBoundingBox.width) {
        const visibleChildren = children.filter(child => !child.classList.contains(hiddenTagClass)).reverse()

        reverse: for (const child of visibleChildren) {
          overflowChildren.value++
          const boundingBox = child.getBoundingClientRect()
          tagsWidth -= boundingBox.width
          overflowBoundingBox = overflowTag.value!.getBoundingClientRect()

          totalWidth = tagsWidth + overflowBoundingBox.width
          const overflow = totalWidth > containerBoundingBox.width

          child.classList.add(hiddenTagClass)
          hiddenChildTexts.unshift(child.innerText)

          if (overflow) {
            continue reverse
          } else {
            break reverse
          }
        }
      }
    }

    if (container.value && largestChildHeight) {
      container.value.style.height = `${largestChildHeight}px`
    }

    hiddenText.value = hiddenChildTexts.join(', ')

    ready.value = true
  }

  function setTagVisibility(child: HTMLElement, visibility: 'invisible' | 'hidden' | 'visible'): void {
    switch (visibility) {
      case 'invisible':
        child.classList.remove(hiddenTagClass)
        child.classList.add(invisibleTagClass)
        break
      case 'hidden':
        child.classList.remove(invisibleTagClass)
        child.classList.add(hiddenTagClass)
        break
      case 'visible':
        child.classList.remove(hiddenTagClass)
        child.classList.remove(invisibleTagClass)
        break
    }
  }

  function setInlineContainerWidth(children: HTMLElement[]): void {
    const totalTagsWidth = children.reduce((acc, child) => {
      setTagVisibility(child, 'invisible')
      const boundingBox = child.getBoundingClientRect()

      return acc + Math.ceil(boundingBox.width)
    }, 0)

    container.value!.style.width = `${totalTagsWidth}px`
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

  watch(() => props.tags, () => {
    nextTick(() => calculateOverflow())
  }, { deep: true })
</script>


<style>
.p-tag-wrapper { @apply
  relative
  block
  whitespace-nowrap
  align-middle
  max-w-full
}

.p-tag-wrapper__tag--hidden { @apply
  !hidden;
}

.p-tag-wrapper__tag--invisible {
  visibility: hidden !important;
}

.p-tag-wrapper__tag { @apply
  inline-flex
  items-center
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
  h-full
  flex
  items-center
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