<template>
  <component :is="element" ref="scrollerRef" class="p-virtual-scroller">
    <template v-for="(chunk, chunkIndex) in chunks" :key="chunkIndex">
      <VirtualScrollerChunk :id="getChunkId(chunkIndex)" :height="getChunkHeight(chunkIndex)" :force-visible="getChunkForceVisible(chunkIndex)" :observer-options>
        <template v-for="(item, itemChunkIndex) in chunk" :key="item[itemKey]">
          <slot :id="getItemId(item)" :item :index="getItemIndex(chunkIndex, itemChunkIndex)" />
        </template>
      </VirtualScrollerChunk>
    </template>
    <slot name="bottom" />
    <div ref="bottom" class="p-virtual-scroller__bottom" />
  </component>
</template>

<script lang="ts" setup generic="T extends Record<string, any>">
  import { useIntersectionObserver } from '@prefecthq/vue-compositions'
  import { computed, nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
  import VirtualScrollerChunk from '@/components/VirtualScroller/PVirtualScrollerChunk.vue'
  import { registerVirtualScroller, unregisterVirtualScroller } from '@/components/VirtualScroller/utilities'
  import { scrollIntoView } from '@/utilities/scrolling'

  const props = withDefaults(defineProps<{
    items: T[],
    itemEstimateHeight?: number,
    itemKey?: keyof T,
    chunkSize?: number,
    observerOptions?: IntersectionObserverInit,
    element?: string,
    name?: string,
  }>(), {
    itemEstimateHeight: 50,
    itemKey: 'id',
    chunkSize: 50,
    element: 'div',
    name: undefined,
    observerOptions: () => ({
      rootMargin: '200px',
    }),
  })

  const emit = defineEmits<{
    (event: 'bottom'): void,
  }>()

  defineExpose({
    scrollItemIntoView,
  })

  watch(() => props.name, (newName, oldName) => {
    if (oldName) {
      unregisterVirtualScroller(oldName)
    }

    if (newName) {
      registerVirtualScroller(newName, {
        makeItemVisible,
        scrollItemIntoView,
      })
    }
  }, { immediate: true })

  watch(() => props.items, () => check(bottom))

  onMounted(() => {
    observe(bottom)
  })

  onUnmounted(() => {
    if (props.name) {
      unregisterVirtualScroller(props.name)
    }
  })

  const scrollerRef = ref<HTMLElement>()
  const bottom = ref<HTMLDivElement>()
  const { observe, check } = useIntersectionObserver(intersect, props.observerOptions)
  const chunksForcedToBeVisible = reactive(new Set<number>())

  const chunks = computed(() => {
    const chunks = []
    const source = props.items

    for (let i = 0; i < source.length; i += props.chunkSize) {
      chunks.push(source.slice(i, i + props.chunkSize))
    }

    return chunks
  })

  function getItemChunkIndex(itemKey: unknown): number {
    return chunks.value.findIndex(chunk => chunk.some(item => item[props.itemKey] === itemKey))
  }

  function makeItemVisible(itemKey: unknown): () => void {
    const chunkIndex = getItemChunkIndex(itemKey)

    chunksForcedToBeVisible.add(chunkIndex)

    return () => chunksForcedToBeVisible.delete(chunkIndex)
  }

  function scrollItemIntoView(itemKey: unknown, options?: ScrollIntoViewOptions): Promise<void> {
    const hide = makeItemVisible(itemKey)
    const chunkIndex = getItemChunkIndex(itemKey)
    const { promise, resolve } = Promise.withResolvers<void>()

    nextTick(async () => {
      if (!scrollerRef.value) {
        return
      }

      const chunk = scrollerRef.value.querySelector(`#${getChunkId(chunkIndex)}`)

      if (!chunk) {
        return
      }

      await scrollIntoView(chunk, { ...options, block: 'nearest' })

      const item = scrollerRef.value.querySelector(`#${props.name}-${itemKey}`)

      if (!item) {
        return
      }

      await scrollIntoView(item, options)

      hide()
      resolve()
    })

    return promise
  }

  function intersect(entries: IntersectionObserverEntry[]): void {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        emit('bottom')
      }
    })
  }

  function getItemIndex(chunkIndex: number, itemChunkIndex: number): number {
    return props.chunkSize * chunkIndex + itemChunkIndex
  }

  function getChunkHeight(index: number): number {
    return props.itemEstimateHeight * chunks.value[index].length
  }

  function getChunkForceVisible(index: number): boolean {
    return chunksForcedToBeVisible.has(index)
  }

  function getItemId(item: T): string {
    return `${props.name}-${item[props.itemKey]}`
  }

  function getChunkId(index: number): string {
    return `${props.name}-chunk-${index}`
  }
</script>

<style>
  .p-virtual-scroller-chunk > *,
  .p-virtual-scroller-chunk:nth-last-child(2) > *:not(:last-child) {
    margin-bottom: var(--virtual-scroller-item-gap)
  }
</style>