<template>
  <PVirtualScroller
    v-bind="{ items, itemKey }"
    class="p-timeline"
    element="ol"
  >
    <template #default="{ item, index }: { item: TimelineItem, index: number }">
      <slot v-bind="{ item, index }">
        <slot :name="getListItemSlotName(item, index)" v-bind="{ item, index }">
          <PTimelineItem v-bind="{ align, layout }">
            <template #left>
              <slot name="left" v-bind="{ item, index }">
                <slot :name="getListItemLeftSlotName(item, index)" v-bind="{ item, index }" />
              </slot>
            </template>

            <template #node>
              <slot name="node" v-bind="{ item, index }">
                <slot :name="getListItemNodeSlotName(item, index)" v-bind="{ item, index }">
                  <PTimelinePoint>
                    <slot :name="getListItemNodeContentSlotName(item, index)" v-bind="{ item, index }">
                      <slot name="node-content" v-bind="{ item, index }">
                        <p-icon v-if="item.icon" :icon="item.icon" solid />
                      </slot>
                    </slot>
                  </PTimelinePoint>
                </slot>
              </slot>
            </template>

            <template #right>
              <slot name="right" v-bind="{ item, index }">
                <slot :name="getListItemRightSlotName(item, index)" v-bind="{ item, index }" />
              </slot>
            </template>
          </PTimelineItem>
        </slot>
      </slot>
    </template>
  </PVirtualScroller>
</template>

<script lang="ts" setup>
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

  function getListItemSlotName(item: TimelineItem, index: number): string {
    const base = getItemId(item, index)
    return `item-${base}`
  }

  function getListItemNodeSlotName(item: TimelineItem, index: number): string {
    const base = getListItemSlotName(item, index)
    return `${base}-node`
  }

  function getListItemNodeContentSlotName(item: TimelineItem, index: number): string {
    const base = getListItemSlotName(item, index)
    return `${base}-node-content`
  }

  function getListItemLeftSlotName(item: TimelineItem, index: number): string {
    const base = getListItemSlotName(item, index)
    return `${base}-left`
  }

  function getListItemRightSlotName(item: TimelineItem, index: number): string {
    const base = getListItemSlotName(item, index)
    return `${base}-right`
  }
</script>

<style>
.p-timeline { @apply
  list-none
  p-0
  m-0
}
</style>