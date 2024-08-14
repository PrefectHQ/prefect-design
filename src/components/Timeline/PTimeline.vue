<template>
  <PVirtualScroller
    :items
    class="p-timeline"
    element="ol"
  >
    <template #default="{ item, index }">
      <slot v-bind="{ item, index }">
        <slot :name="getItemSlotName(item, index)" v-bind="{ item, index }">
          <PTimelineItem :layout="getItemLayout(item, index)">
            <template #date>
              <slot name="date" v-bind="{ item, index }">
                <slot :name="getDateSlotName(item, index)" v-bind="{ item, index }" />
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
              <slot name="content" v-bind="{ item, index }">
                <slot :name="getContentSlotName(item, index)" v-bind="{ item, index }" />
              </slot>
            </template>
          </PTimelineItem>
        </slot>
      </slot>
    </template>
  </PVirtualScroller>
</template>

<script lang="ts" setup generic="T extends TimelineItem">
  import { computed } from 'vue'
  import PTimelineItem from '@/components/Timeline/PTimelineItem.vue'
  import PTimelinePoint from '@/components/Timeline/PTimelinePoint.vue'
  import PVirtualScroller from '@/components/VirtualScroller/PVirtualScroller.vue'
  import { TimelineItem, TimelineLayout, TimelineLayoutFunction } from '@/types/timeline'
  import { kebabCase } from '@/utilities/strings'

  const props = defineProps<{
    items: T[],
    itemKey?: keyof T,
    layout?: TimelineLayout | TimelineLayoutFunction,
  }>()

  const internalLayout = computed(() => props.layout ?? 'date-left')

  function getItemId(item: T, index: number): string | number {
    return props.itemKey ? kebabCase(`${item[props.itemKey]}`) : index
  }

  function getItemSlotName(item: T, index: number): string {
    const base = getItemId(item, index)
    return `item-${base}`
  }

  function getPointSlotName(item: T, index: number): string {
    const base = getItemSlotName(item, index)
    return `${base}-point`
  }

  function getPointContentSlotName(item: T, index: number): string {
    const base = getItemSlotName(item, index)
    return `${base}-point-content`
  }

  function getDateSlotName(item: T, index: number): string {
    const base = getItemSlotName(item, index)
    return `${base}-date`
  }

  function getContentSlotName(item: T, index: number): string {
    const base = getItemSlotName(item, index)
    return `${base}-content`
  }

  function getItemLayout(item: T, index: number): TimelineLayout {
    if (typeof internalLayout.value === 'function') {
      return internalLayout.value(item, index)
    }

    return internalLayout.value
  }
</script>

<style>
.p-timeline { @apply
  list-none
  p-0
  m-0
}
</style>