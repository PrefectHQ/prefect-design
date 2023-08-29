<template>
  <p-virtual-scroller :items="shownItems" class="p-list-truncate">
    <template #default="{ item, index }">
      <slot v-bind="{ item, index, shown, showMore, showLess, canShowMore, canShowLess }" />
    </template>

    <template #bottom>
      <slot name="bottom" v-bind="{ shown, showMore, showLess, canShowMore, canShowLess }">
        <template v-if="canShowMore">
          <p-button class="p-list-truncate__button" @click="showMore">
            {{ buttonLabel ?? 'Show more' }}
          </p-button>
        </template>
      </slot>
    </template>
  </p-virtual-scroller>
</template>

<script lang="ts" setup generic="T extends Record<string, any>">
  import { computed, ref } from 'vue'

  const props = defineProps<{
    items: T[],
    shown?: number,
    increment?: number,
    decrement?: number,
    buttonLabel?: string,
  }>()

  const DEFAULT_INCREMENT = 5

  const shown = ref(props.shown ?? DEFAULT_INCREMENT)

  const canShowMore = computed(() => props.items.length > shown.value)
  const canShowLess = computed(() => shown.value > DEFAULT_INCREMENT)

  const shownItems = computed(() => props.items.slice(0, shown.value))

  const showMore = (): void => {
    shown.value += props.increment ?? DEFAULT_INCREMENT
  }

  const showLess = (): void => {
    if (props.decrement) {
      shown.value -= props.decrement
      return
    }
    shown.value = DEFAULT_INCREMENT
  }
</script>

<style>
.p-list-truncate__button { @apply
  mt-2
  w-full
}
</style>