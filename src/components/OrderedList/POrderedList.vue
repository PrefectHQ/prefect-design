<template>
  <ol class="p-ordered-list">
    <PVirtualScroller
      :items="items"
      :item-key="itemKey"
      :item-estimate-height="itemEstimateHeight"
      :chunk-size="chunkSize"
      @bottom="emit('bottom')"
    >
      <template #default="{ item, index }: { item: OrderedListItem, index:number }">
        <slot v-bind="{ item, index }">
          <slot :name="getListItemSlotName(item, index)" v-bind="{ item, index }">
            <POrderedListItem v-bind="{ item }" class="p-ordered-list__item">
              <template #left>
                <slot name="left" v-bind="{ item, index }">
                  <slot :name="getListItemLeftSlotName(item, index)" v-bind="{ item, index }" />
                </slot>
              </template>

              <template #node>
                <slot name="node" v-bind="{ item, index }">
                  <slot :name="getListItemNodeSlotName(item, index)" v-bind="{ item, index }">
                    <POrderedListNode>
                      <slot :name="getListItemNodeContentSlotName(item, index)" v-bind="{ item, index }">
                        <slot name="node-content" v-bind="{ item, index }">
                          <p-icon v-if="item.icon" :icon="item.icon" solid />
                        </slot>
                      </slot>
                    </POrderedListNode>
                  </slot>
                </slot>
              </template>

              <template #right>
                <slot name="right" v-bind="{ item, index }">
                  <slot :name="getListItemRightSlotName(item, index)" v-bind="{ item, index }" />
                </slot>
              </template>
            </POrderedListItem>
          </slot>
        </slot>
      </template>
    </PVirtualScroller>
  </ol>
</template>

<script lang="ts" setup>
  import POrderedListItem from '@/components/OrderedList/POrderedListItem.vue'
  import POrderedListNode from '@/components/OrderedList/POrderedListNode.vue'
  import PVirtualScroller from '@/components/VirtualScroller/PVirtualScroller.vue'
  import { OrderedListItem } from '@/types/orderedList'
  import { kebabCase } from '@/utilities/strings'

  const props = defineProps<{
    items: OrderedListItem[],
    itemKey?: string,
    itemEstimateHeight?: number,
    chunkSize?: number,
  }>()

  const emit = defineEmits<{
    (event: 'bottom'): void,
  }>()

  function getItemId(item: OrderedListItem, index: number): string | number {
    return props.itemKey ? kebabCase(`${item[props.itemKey]}`) : index
  }

  function getListItemSlotName(item: OrderedListItem, index: number): string {
    const base = getItemId(item, index)
    return `item-${base}`
  }

  function getListItemNodeSlotName(item: OrderedListItem, index: number): string {
    const base = getListItemSlotName(item, index)
    return `${base}__node`
  }

  function getListItemNodeContentSlotName(item: OrderedListItem, index: number): string {
    const base = getListItemSlotName(item, index)
    return `${base}__node-content`
  }

  function getListItemLeftSlotName(item: OrderedListItem, index: number): string {
    const base = getListItemSlotName(item, index)
    return `${base}__left`
  }

  function getListItemRightSlotName(item: OrderedListItem, index: number): string {
    const base = getListItemSlotName(item, index)
    return `${base}__right`
  }
</script>

<style>
.p-ordered-list { @apply
  list-none
  p-0
  m-0
}

.p-ordered-list__item { @apply
  flex
  items-start
  relative
  justify-center
  py-4
}
</style>