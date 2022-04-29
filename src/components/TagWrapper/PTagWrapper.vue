<template>
  <div ref="container" style="position:relative; display: block; white-space: nowrap;">
    <slot />

    <p-tag v-if="overflowChildren > 0" class="overflow">
      +{{ overflowChildren }}
    </p-tag>
  </div>
</template>

<script lang="ts" setup>
  import { computed, PropType, ref, Ref, onMounted } from 'vue'

  const container: Ref<HTMLDivElement | undefined> = ref()
  // get parent of ref of "container "
  // create intersection observor

  const overflowChildren = ref(0)
  onMounted(() => {
    const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      const width = container.value?.parentElement?.offsetWidth

      console.log(width)
      entries.forEach(entry => {
        let _overflowChildren = 0

        for (const child of entry.target.children) {
          if (child.classList.contains('overflow')) {
            continue
          }

          if (child.classList.contains('hidden')) {
            child.classList.add('invisible')
            child.classList.remove('hidden')
          }

          if (child.offsetLeft + child.offsetWidth  > width - 35) {
            _overflowChildren++

            child.classList.add('hidden')
          } else {
            child.classList.remove('hidden')
          }

          child.classList.remove('invisible')
        }
        overflowChildren.value = _overflowChildren

      })
    })


    if (container.value) {
      observer.observe(container.value)
    }

  })

  const props = defineProps({
    tags: {
      type: Array as PropType<string[]>,
      default: function() {
        return []
      },
    },
    limit: {
      type: Number,
      default: 4,
    },
  })
  const hiddenTagsSlice = computed(() => props.tags.slice(props.limit))
  const hiddenTagsNumber = computed(() => hiddenTagsSlice.value.length)
  const tagAmountLimit = computed(() => props.tags.length > props.limit)
  const visibleTags = computed(() => props.tags.slice(0, props.limit))
</script>


<style>
.hidden {
  display: none !important;
}

.invisible {
  visibility: hidden !important;
}
</style>