<template>
  <ol class="p-ordered-list">
    <li v-for="(item, index) in items" :key="index" class="p-ordered-list__item">
      <slot :name="getListItemSlotName(item, index)" v-bind="{ item, index }">
        <div class="p-ordered-list__left-container">
          <slot name="left" v-bind="{ item, index }">
            <div class="p-ordered-list__left">
              <slot :name="getListItemLeftSlotName(item, index)" v-bind="{ item, index }" />
            </div>
          </slot>
        </div>

        <div class="p-ordered-list__center-container">
          <div class="p-ordered-list__node-container">
            <slot name="node" v-bind="{ item, index }">
              <slot :name="getListItemNodeSlotName(item, index)" v-bind="{ item, index }">
                <div class="p-ordered-list__node">
                  <slot :name="getListItemNodeContentSlotName(item, index)" v-bind="{ item, index }">
                    <slot name="node-content" v-bind="{ item, index }">
                      <p-icon v-if="item.icon" :icon="item.icon" solid />
                    </slot>
                  </slot>
                </div>
              </slot>
            </slot>
          </div>
        </div>


        <div class="p-ordered-list__right-container">
          <slot name="right" v-bind="{ item, index }">
            <div class="p-ordered-list__right">
              <slot :name="getListItemRightSlotName(item, index)" v-bind="{ item, index }" />
            </div>
          </slot>
        </div>
      </slot>
    </li>
  </ol>
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
    return props.itemIdKey ? kebabCase(`${item[props.itemIdKey]}`) : index
  }

  function getListItemSlotName(item: OrderedListItem, index: number): string {
    const base = getItemSlotKey(item, index)
    return props.itemIdKey ? `item-${base}` : `item-${base}`
  }

  function getListItemNodeSlotName(item: OrderedListItem, index: number): string {
    const base = getListItemSlotName(item, index)
    return props.itemIdKey ? `${base}__node` : `${base}__node`
  }

  function getListItemNodeContentSlotName(item: OrderedListItem, index: number): string {
    const base = getListItemSlotName(item, index)
    return props.itemIdKey ? `${base}__node-content` : `${base}__node-content`
  }

  function getListItemLeftSlotName(item: OrderedListItem, index: number): string {
    const base = getListItemSlotName(item, index)
    return props.itemIdKey ? `${base}__left` : `${base}__left`
  }

  function getListItemRightSlotName(item: OrderedListItem, index: number): string {
    const base = getListItemSlotName(item, index)
    return props.itemIdKey ? `${base}__right` : `${base}__right`
  }
</script>

<style scoped>
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
  box-content
}

.p-ordered-list__right-container,
.p-ordered-list__left-container { @apply
  self-center
  flex-1
}

.p-ordered-list__left-container { @apply
  text-right
}

.p-ordered-list__right-container { @apply
  text-left
}


.p-ordered-list__center-container,
.p-ordered-list__node-container { @apply
  self-stretch
  shrink
  grow-0
  flex
  flex-row
  items-center
  justify-center
  mx-4
}

.p-ordered-list__node-container { @apply
  pt-1
  min-w-[2.5rem]
  z-[1]
}

.p-ordered-list__center-container::before { @apply
  absolute
  top-0
  left-1/2
  bottom-0
  w-px
  h-full
  -translate-x-1/2
  bg-foreground-200
  dark:bg-foreground-300
  z-0
  ;

  content: '';
}

.p-ordered-list__node { @apply
  rounded-full
  bg-background
  border
  dark:border-foreground-100
  text-foreground-400
  p-2
  text-center
  shadow
  z-[1]
}
</style>