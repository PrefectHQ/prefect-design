<template>
  <div class="p-ordered-list">
    <ol class="p-ordered-list__ol">
      <li v-for="(item, index) in items" :key="index" class="p-ordered-list__item">
        <slot :name="getListItemSlotName(item, index)" v-bind="{ item, index }">
          <div class="p-ordered-list__left-container">
            <div class="p-ordered-list__left">
              <slot name="li-left" v-bind="{ item, index }">
                <slot :name="getListItemLeftSlotName(item, index)" />
              </slot>
            </div>
          </div>

          <div class="p-ordered-list__node-container">
            <slot name="li-node" v-bind="{ item, index }">
              <slot :name="getListItemNodeSlotName(item, index)" v-bind="{ item, index }">
                <div class="p-ordered-list__node">
                  <slot :name="getListItemNodeContentSlotName(item, index)" v-bind="{ item, index }">
                    <p-icon v-if="item.icon" :icon="item.icon" />
                  </slot>
                </div>
              </slot>
            </slot>
          </div>

          <div class="p-ordered-list__right">
            <slot name="li-right" v-bind="{ item, index }">
              <slot :name="getListItemRightSlotName(item, index)" v-bind="{ item, index }" />
            </slot>
          </div>
        </slot>
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'POrderedList',
    expose: [],
  }
</script>

<script lang="ts" setup>
  import { OrderedListItem } from '@/types/orderedList'
  import { kebabCase } from '@/utilities/strings'

  const props = defineProps<{
    items: OrderedListItem[],
    itemIdKey?: string,
  }>()

  function getItemSlotKey(item: OrderedListItem, index: number): string | number {
    return props.itemIdKey ? kebabCase(item[props.itemIdKey]) : index
  }

  function getListItemSlotName(item: OrderedListItem, index: number): string {
    const base = getItemSlotKey(item, index)
    return props.itemIdKey ? `li-${base}` : `li-${base}`
  }

  function getListItemNodeSlotName(item: OrderedListItem, index: number): string {
    const base = getListItemSlotName(item, index)
    return props.itemIdKey ? `${base}-node` : `${base}-node`
  }

  function getListItemNodeContentSlotName(item: OrderedListItem, index: number): string {
    const base = getListItemSlotName(item, index)
    return props.itemIdKey ? `${base}-node-content` : `${base}-node-content`
  }

  function getListItemLeftSlotName(item: OrderedListItem, index: number): string {
    const base = getListItemSlotName(item, index)
    return props.itemIdKey ? `${base}-left` : `${base}-left`
  }

  function getListItemRightSlotName(item: OrderedListItem, index: number): string {
    const base = getListItemSlotName(item, index)
    return props.itemIdKey ? `${base}-right` : `${base}-right`
  }
</script>

<style scoped>
.p-ordered-list { @apply
  p-6
}

.p-ordered-list__ol { @apply
  list-none
  p-0
  m-0
}

.p-ordered-list__item { @apply
  flex
  items-center
  mb-8
  relative
}

.p-ordered-list__left { @apply
  flex-shrink-0
}

.p-ordered-list__node-container { @apply
  flex-shrink-0
}

.p-ordered-list__node { @apply
  rounded-full
  bg-primary
  text-white
  p-2
  mx-4
  text-center
}

.p-ordered-list__right { @apply
  flex-1
}

.p-ordered-list { @apply
  p-6
}
</style>