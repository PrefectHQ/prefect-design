<template>
  <ol class="p-ordered-list">
    <li v-for="(item, index) in items" :key="index" class="p-ordered-list__item">
      <slot :name="getListItemSlotName(item, index)" v-bind="{ item, index }">
        <div class="p-ordered-list__left-container">
          <div class="p-ordered-list__left">
            <slot name="li-left" v-bind="{ item, index }">
              <slot :name="getListItemLeftSlotName(item, index)" />
            </slot>
          </div>
        </div>

        <div class="p-ordered-list__center-container">
          <div class="p-ordered-list__node-container">
            <slot name="li-node" v-bind="{ item, index }">
              <slot :name="getListItemNodeSlotName(item, index)" v-bind="{ item, index }">
                <div class="p-ordered-list__node">
                  <slot :name="getListItemNodeContentSlotName(item, index)" v-bind="{ item, index }">
                    <p-icon v-if="item.icon" :icon="item.icon" solid />
                  </slot>
                </div>
              </slot>
            </slot>
          </div>
        </div>


        <div class="p-ordered-list__right-container">
          <div class="p-ordered-list__right">
            <slot name="li-right" v-bind="{ item, index }">
              <slot :name="getListItemRightSlotName(item, index)" />
            </slot>
          </div>
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

.p-ordered-list__left { @apply
  text-right
}

.p-ordered-list__right { @apply
  text-left
}

.p-ordered-list__right-container { @apply
  self-center
}

.p-ordered-list__left-container { @apply
  self-center
}

.p-ordered-list__center-container,
.p-ordered-list__node-container { @apply
  self-stretch
  shrink
  grow-0
  flex
  flex-row
  items-start
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
  z-0
  ;

  content: '';
}

.p-ordered-list__node { @apply
  rounded-full
  bg-background
  text-foreground-400
  p-2
  text-center
  shadow
  z-[1]
}

.p-ordered-list__left-container,
.p-ordered-list__right-container { @apply
  flex-1
}
</style>