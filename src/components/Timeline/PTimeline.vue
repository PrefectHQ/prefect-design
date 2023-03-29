<template>
  <PVirtualScroller
    v-bind="{ items, itemKey }"
    class="p-timeline"
    element="ol"
  >
    <template #default="{ item, index }: { item: TimelineItem, index: number }">
      <slot v-bind="{ item, index }">
        <slot :name="getItemSlotName(item, index)" v-bind="{ item, index }">
          <PTimelineItem v-bind="{ align }" :stacked="layout == 'stacked'">
            <template #date>
              <slot :name="getDateOuterSlotName(index)" v-bind="{ item, index }">
                <slot :name="getDateInnerSlotName(item, index)" v-bind="{ item, index }" />
              </slot>
            </template>

            <template #point>
              <slot name="point" v-bind="{ item, index }">
                <slot :name="getPointSlotName(item, index)" v-bind="{ item, index }">
                  <PTimelinePoint>
                    <slot :name="getPointContentSlotName(item, index)" v-bind="{ item, index }">
                      <slot name="point-content" v-bind="{ item, index }">
                        <p-icon v-if="item.icon" :icon="item.icon" solid />
                      </slot>
                    </slot>
                  </PTimelinePoint>
                </slot>
              </slot>
            </template>

            <template #content>
              <slot :name="getContentOuterSlotName(index)" v-bind="{ item, index }">
                <slot :name="getContentInnerSlotName(item, index)" v-bind="{ item, index }" />
              </slot>
            </template>
          </PTimelineItem>
        </slot>
      </slot>
    </template>
  </PVirtualScroller>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PTimelineItem from '@/components/Timeline/PTimelineItem.vue'
  import PTimelinePoint from '@/components/Timeline/PTimelinePoint.vue'
  import PVirtualScroller from '@/components/VirtualScroller/PVirtualScroller.vue'
  import { TimelineAlignment, TimelineItem, TimelineLayout } from '@/types/timeline'
  import { kebabCase } from '@/utilities/strings'

  const props = defineProps<{
    items: TimelineItem[],
    itemKey?: string,
    align?: TimelineAlignment,
    layout?: TimelineLayout,
  }>()

  function getItemId(item: TimelineItem, index: number): string | number {
    return props.itemKey ? kebabCase(`${item[props.itemKey]}`) : index
  }

  function getItemSlotName(item: TimelineItem, index: number): string {
    const base = getItemId(item, index)
    return `item-${base}`
  }

  function getPointSlotName(item: TimelineItem, index: number): string {
    const base = getItemSlotName(item, index)
    return `${base}-point`
  }

  function getPointContentSlotName(item: TimelineItem, index: number): string {
    const base = getItemSlotName(item, index)
    return `${base}-point-content`
  }

  function getDateSlotName(item: TimelineItem, index: number): string {
    const base = getItemSlotName(item, index)
    return `${base}-date`
  }

  function getContentSlotName(item: TimelineItem, index: number): string {
    const base = getItemSlotName(item, index)
    return `${base}-content`
  }

  const alternate = computed(() => props.layout === 'alternate')

  function getDateInnerSlotName(item: TimelineItem, index: number): string {
    const even = index % 2 !== 0
    if (alternate.value && !even) {
      return getContentSlotName(item, index)
    }

    return getDateSlotName(item, index)
  }

  function getDateOuterSlotName(index: number): string {
    const odd = index % 2 !== 0
    if (alternate.value && odd) {
      return 'content'
    }

    return 'date'
  }

  function getContentInnerSlotName(item: TimelineItem, index: number): string {
    const odd = index % 2 !== 0
    if (alternate.value && odd) {
      return getDateSlotName(item, index)
    }

    return getContentSlotName(item, index)
  }

  function getContentOuterSlotName(index: number): string {
    const odd = index % 2 !== 0
    if (alternate.value && odd) {
      return 'date'
    }

    return 'content'
  }
</script>

<style>
.p-timeline { @apply
  list-none
  p-0
  m-0
}
</style>