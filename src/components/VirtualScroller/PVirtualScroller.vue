<template>
  <component :is="element" class="p-virtual-scroller">
    <template v-for="(chunk, chunkIndex) in chunks" :key="chunkIndex">
      <VirtualScrollerChunk :height="itemEstimateHeight * chunk.length" v-bind="{ observerOptions }">
        <template v-for="(item, itemChunkIndex) in chunk" :key="item[itemKey]">
          <slot :item="item" :index="getItemIndex(chunkIndex, itemChunkIndex)" />
        </template>
      </VirtualScrollerChunk>
    </template>
    <slot name="bottom" />
    <div ref="bottom" class="p-virtual-scroller__bottom" />
  </component>
</template>

<script lang="ts" setup generic="T extends Record<string, any>">
  import { useIntersectionObserver } from '@prefecthq/vue-compositions'
  import { computed, onMounted, ref, watch } from 'vue'
  import VirtualScrollerChunk from '@/components/VirtualScroller/PVirtualScrollerChunk.vue'

  const props = withDefaults(defineProps<{
    items: T[],
    itemEstimateHeight?: number,
    itemKey?: keyof T,
    chunkSize?: number,
    observerOptions?: IntersectionObserverInit,
    element?: string,
  }>(), {
    itemEstimateHeight: 50,
    itemKey: 'id',
    chunkSize: 50,
    element: 'div',
    observerOptions: () => ({
      rootMargin: '200px',
    }),
  })

  const emit = defineEmits<{
    (event: 'bottom'): void,
  }>()

  const bottom = ref<HTMLDivElement>()
  const { observe, check } = useIntersectionObserver(intersect, props.observerOptions)

  const chunks = computed(() => {
    const chunks = []
    const source = props.items

    for (let i = 0; i < source.length; i += props.chunkSize) {
      chunks.push(source.slice(i, i + props.chunkSize))
    }

    return chunks
  })

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

  watch(() => props.items, () => check(bottom))

  onMounted(() => {
    observe(bottom)
  })
</script>

<style>
  .p-virtual-scroller-chunk > *,
  .p-virtual-scroller-chunk:nth-last-child(2) > *:not(:last-child) {
    margin-bottom: var(--virtual-scroller-item-gap)
  }
</style>