<template>
  <div class="p-layout-table">
    <div ref="stickyHeader" class="p-layout-table__header" :class="classes.header">
      <slot name="header">
        <div class="p-layout-table__section p-layout-table__section--start">
          <slot name="header-start" />
        </div>

        <div class="p-layout-table__section p-layout-table__section--end">
          <slot name="header-end" />

          <template v-if="slots['header-sort']">
            <div class="p-layout-table__header-sort">
              <slot name="header-sort" />
            </div>
          </template>
        </div>
      </slot>
    </div>

    <slot />

    <div class="p-layout-table__footer">
      <slot name="footer">
        <div class="p-layout-table__section p-layout-table__section--start">
          <slot name="footer-start" />
        </div>

        <div class="p-layout-table__section p-layout-table__section--end">
          <slot name="footer-end" />
        </div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { UsePositionStickyObserverOptions, usePositionStickyObserver } from '@prefecthq/vue-compositions'
  import { computed, ref, toRefs, useSlots } from 'vue'
  import { Getter } from '@/types'

  const props = defineProps<{
    sticky?: boolean,
    rootMargin?: string,
    // boundingElement will default to the body element. Provide one if you want the `stuck`
    // class to apply when the header is stuck to a different scroll container.
    boundingElement?: HTMLElement,
  }>()

  const slots = useSlots()

  const stickyHeader = ref<HTMLElement>()

  const { rootMargin, boundingElement } = toRefs(props)
  const options: Getter<UsePositionStickyObserverOptions> = () => {
    return {
      rootMargin: rootMargin?.value,
      boundingElement: boundingElement?.value,
    }
  }

  const { stuck } = usePositionStickyObserver(stickyHeader, options)

  const classes = computed(() => ({
    header: {
      'p-layout-table__header--sticky': props.sticky,
      'p-layout-table__header--stuck': props.sticky && stuck.value,
    },
  }))
</script>

<style>
.p-layout-table__header { @apply
  flex
  justify-between
  items-center
  mb-2
  p-2
  gap-2
}

.p-layout-table__header-sort { @apply
  border-l
  border-l-divider
  pl-2
}

.p-layout-table__header--sticky { @apply
  sticky
  bg-transparent
  top-0
  border-0
  rounded-b-default
  z-10
  transition-all;
  transition-property: background-color;
}

.p-layout-table__header--stuck { @apply
  bg-floating-sticky
  backdrop-blur-sm
  shadow-md
}

.p-layout-table__footer { @apply
  flex
  justify-between
  items-center
  mt-2
  py-2
  z-10
}

.p-layout-table__section { @apply
  flex
  gap-2
  items-center
  flex-wrap
}

.p-layout-table__section--start { @apply
  mr-auto
}

.p-layout-table__section--end { @apply
  ml-auto
}
</style>