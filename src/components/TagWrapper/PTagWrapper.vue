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
    const tags = Array.from(container.value.children)
      .filter(child => !child.classList.contains('p-tag-wrapper__tag-overflow')) as HTMLElement[]

    setTagVisibility(overflowTag.value, 'hidden')
    setAllTagsInvisible(tags)

    if (props.inline) {
      setInlineContainerWidth(tags)
    }

    tags.forEach(tag => {
      const overflowing = elementOverflowsContainer(tag, container.value!)

      if (overflowing) {
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

      let overflowing = elementOverflowsContainer(overflowTag.value, container.value!)
      const visibleTags = tags.filter(child => !child.classList.contains(hiddenTagClass)).reverse()

      while (overflowing) {
        const tag = visibleTags.pop()

        if (!tag) {
          break
        }

        setTagVisibility(tag, 'hidden')
        overflowCount.value++
        if (tag.textContent) {
          hiddenTags.unshift(tag.textContent)
        }

        overflowing = elementOverflowsContainer(overflowTag.value, container.value!)
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
  gap-1
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
  !hidden;
}

.p-tag-wrapper__tag--invisible {
  visibility: hidden !important;
}

.p-tag-wrapper__tag-overflow { @apply
  inline-block
}
</style>