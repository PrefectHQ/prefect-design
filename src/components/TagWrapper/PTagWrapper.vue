<template>
  <div ref="container" class="p-tag-wrapper" :class="classes.tagContainer">
    <slot>
      <template v-for="tag in tags" :key="tag">
        <div class="p-tag-wrapper__tag" :class="classes.tag">
          <slot name="tag" :tag="tag">
            <PTag :value="tag" />
          </slot>
        </div>
      </template>
    </slot>


    <div ref="overflowTag" class="p-tag-wrapper__tag-overflow" :class="classes.overflowTag">
      <PTooltip :text="hiddenText">
        <slot name="overflow-tags" :overflowed-children="overflowCount">
          <PTag>
            +{{ overflowCount }}
          </PTag>
        </slot>
      </PTooltip>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, Ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
  import PTag from '@/components/Tag/PTag.vue'
  import PTooltip from '@/components/Tooltip/PTooltip.vue'
  import { TagValue, normalize } from '@/types/tag'

  const props = defineProps<{
    tags?: (string | TagValue)[],
    justify?: 'left' | 'center' | 'right',
    inline?: boolean,
  }>()

  const container: Ref<HTMLDivElement | undefined> = ref()
  const ready = ref(false)
  const overflowCount = ref(0)
  const overflowTag: Ref<HTMLDivElement | undefined> = ref()
  const hiddenText = ref('')

  const invisibleTagClass = 'p-tag-wrapper__tag--invisible'
  const hiddenTagClass = 'p-tag-wrapper__tag--hidden'
  const classes = computed(() => {
    return {
      tagContainer:
        [
          `p-tag-wrapper--${props.justify ?? 'left'}`,
          { 'p-tag-wrapper--invisible': !ready.value },
        ],
      overflowTag: [
        `p-tag-wrapper__tag--${props.justify ?? 'left'}`,
        { 'p-tag-wrapper__tag--hidden': !isOverflowing.value },
      ],
      tag: [`p-tag-wrapper__tag--${props.justify ?? 'left'}`],
    }
  })

  const tags = computed(() => {
    const value = props.tags ?? []

    return value.map(normalize)
  })

  let resizeObserver: ResizeObserver | null = null
  const isOverflowing = computed(() => overflowCount.value > 0)

  const calculateOverflow = (): void => {
    if (!container.value) {
      return
    }

    overflowCount.value = 0
    hiddenText.value = ''

    const hiddenTags = []
    const tags = Array.from(container.value.children)
      .filter(child => !child.classList.contains('p-tag-wrapper__tag-overflow')) as HTMLElement[]

    setTagVisibility(overflowTag.value!, 'hidden')

    setAllTagsInvisible(tags)

    if (props.inline) {
      setInlineContainerWidth(tags)
    }

    const containerRightEdge = container.value.getBoundingClientRect().right

    tags.forEach(tag => {
      const { right } = tag.getBoundingClientRect()

      if (right > containerRightEdge || overflowCount.value > 0) {
        setTagVisibility(tag, 'hidden')
        overflowCount.value++
        if (tag.textContent) {
          hiddenTags.push(tag.textContent)
        }
        return
      }

      setTagVisibility(tag, 'visible')
    })

    if (overflowCount.value > 0) {
      setTagVisibility(overflowTag.value!, 'visible')

      const {
        right: overflowTagRight,
        width: overflowTagWidth,
      } = overflowTag.value!.getBoundingClientRect()

      if (overflowTagRight > containerRightEdge) {
        const visibleTags = tags.filter(child => !child.classList.contains(hiddenTagClass)).reverse()

        for (const tag of visibleTags) {
          const { right } = tag.getBoundingClientRect()

          if (right + overflowTagWidth < containerRightEdge) {
            break
          }

          overflowCount.value++
          setTagVisibility(tag, 'hidden')
          if (tag.textContent) {
            hiddenTags.unshift(tag.textContent)
          }
        }
      }
    }

    hiddenText.value = hiddenTags.join(', ')
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

  function setAllTagsInvisible(tags: HTMLElement[]): void {
    for (const tag of tags) {
      setTagVisibility(tag, 'invisible')
    }
  }

  function setInlineContainerWidth(tags: HTMLElement[]): void {
    const totalTagsWidth = tags.reduce((acc, tag) => {
      const boundingBox = tag.getBoundingClientRect()

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
  whitespace-nowrap
  align-middle
  max-w-full
  flex
  items-center
}

.p-tag-wrapper--invisible {
  visibility: hidden !important;
}

.p-tag-wrapper--right { @apply
  text-right
}

.p-tag-wrapper--center { @apply
  text-center
}

.p-tag-wrapper--left { @apply
  text-left
}

.p-tag-wrapper__tag { @apply
  inline-flex
  items-center
}

.p-tag-wrapper__tag--hidden { @apply
  !hidden;
}

.p-tag-wrapper__tag--invisible {
  visibility: hidden !important;
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

.p-tag-wrapper__tag-overflow { @apply
  inline-block
}
</style>