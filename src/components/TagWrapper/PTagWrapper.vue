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
      <slot name="overflow" v-bind="{ hiddenText, overflowCount }">
        <PTooltip :text="hiddenText">
          <slot name="overflow-tags" :overflowed-children="overflowCount">
            <PTag>
              +{{ overflowCount }}
            </PTag>
          </slot>
        </PTooltip>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { throttle } from 'lodash'
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

  const elementOverflowsContainer = (element: HTMLElement, container: HTMLElement): boolean => {
    const { left, right } = element.getBoundingClientRect()
    const { left: containerLeft, right: containerRight } = container.getBoundingClientRect()

    if (props.justify === 'right') {
      return left < containerLeft
    }

    if (props.justify === 'center') {
      return left < containerLeft || right > containerRight
    }

    return right > containerRight
  }

  const calculateOverflow = (): void => {
    if (!container.value || !overflowTag.value) {
      return
    }

    overflowCount.value = 0
    hiddenText.value = ''

    const hiddenTags: string[] = []
    const internalTags = Array.from(container.value.children) as HTMLElement[]
    const internalTagsWithoutOverflow = internalTags.filter(tag => !tag.isEqualNode(overflowTag.value!))
    setAllTagsInvisible(internalTags)

    let tagsArr = props.justify === 'right' ? internalTags.slice().reverse() : internalTags.slice()

    if (props.inline) {
      setInlineContainerWidth(internalTagsWithoutOverflow)
    }

    let overflowing = false

    while (tagsArr.length > 0) {
      const tag = tagsArr.pop()

      if (!tag) {
        break
      }

      overflowing = elementOverflowsContainer(tag, container.value)

      if (overflowing && !tag.isEqualNode(overflowTag.value)) {
        setTagVisibility(tag, 'hidden')
        overflowCount.value++

        if (tag.textContent) {
          hiddenTags.push(tag.textContent)
        }
      } else {
        setTagVisibility(tag, 'visible')
      }

      if (overflowCount.value >= internalTags.length - 1) {
        break
      }
    }

    overflowing = overflowCount.value > 0 && elementOverflowsContainer(overflowTag.value, container.value)


    if (overflowCount.value > 0) {
      setTagVisibility(overflowTag.value!, 'visible')
    } else {
      setTagVisibility(overflowTag.value!, 'hidden')
    }

    if (overflowing) {
      tagsArr = Array.from(container.value.children).filter(tag => !tag.isEqualNode(overflowTag.value!) && !tag.classList.contains(hiddenTagClass)) as HTMLElement[]
      while (overflowing) {
        const tag = tagsArr.pop()

        if (!tag) {
          break
        }

        setTagVisibility(tag, 'hidden')
        overflowCount.value++

        if (tag.textContent) {
          hiddenTags.push(tag.textContent)
        }

        overflowing = elementOverflowsContainer(overflowTag.value, container.value)
      }
    }

    hiddenText.value = hiddenTags.reverse().join(', ')

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
    if (!container.value) {
      return
    }

    const totalTagsWidth = getTotalTagsWidth(tags)
    const computedContainerStyle = getComputedStyle(container.value)
    const computedContainerGap = computedContainerStyle.getPropertyValue('column-gap')
    const containerGap = parseFloat(computedContainerGap)
    const padding = isNaN(containerGap) ? 0 : tags.length * containerGap

    const tagsWidthWithPadding = totalTagsWidth + padding
    container.value.style.width = `${tagsWidthWithPadding}px`
  }

  function getTotalTagsWidth(tags: HTMLElement[]): number {
    return Math.ceil(tags.reduce((acc, tag) => {
      const boundingBox = tag.getBoundingClientRect()

      return acc + boundingBox.width
    }, 0))
  }

  function createObserver(): void {
    const throttledCalculateOverflow = throttle(calculateOverflow, 100, { trailing: true })
    resizeObserver = new ResizeObserver(throttledCalculateOverflow)

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
  box-content
  overflow-hidden
}

.p-tag-wrapper--invisible {
  visibility: hidden !important;
}

.p-tag-wrapper--right { @apply
  justify-end
}

.p-tag-wrapper--center { @apply
  justify-center
}

.p-tag-wrapper--left { @apply
  justify-start
}

.p-tag-wrapper__tag { @apply
  inline-flex
  items-center
}

.p-tag-wrapper__tag--hidden { @apply
  !hidden
}

.p-tag-wrapper__tag--invisible {
  visibility: hidden !important;
}

.p-tag-wrapper__tag-overflow { @apply
  inline-block
}
</style>