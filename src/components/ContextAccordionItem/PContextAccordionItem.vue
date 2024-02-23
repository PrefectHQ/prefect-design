<template>
  <div class="p-context-accordion-item">
    <button type="button" class="p-context-accordion-item__header" :class="classes.header" @click="toggle">
      <template v-if="icon">
        <PIcon :icon="icon" class="p-context-accordion-item__icon" />
      </template>
      <div class="p-context-accordion-item__title">
        {{ title }}
      </div>
      <template v-if="hasChildren">
        <PIcon
          icon="ChevronRightIcon"
          class="p-context-accordion-item__indicator"
          :class="classes.indicator"
        />
      </template>
    </button>
    <PAutoHeightTransition>
      <div v-if="open" class="p-context-accordion-item__contents">
        <slot />
        <template v-for="(item, index) in children" :key="index">
          <router-link
            :to="item.to"
            class="p-context-accordion-item__content-child"
            active-class="p-context-accordion-item__content-child--active"
          >
            {{ item.title }}
          </router-link>
        </template>
      </div>
    </PAutoHeightTransition>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, useSlots, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import PAutoHeightTransition from '@/components/AutoHeightTransition/PAutoHeightTransition.vue'
  import PIcon from '@/components/Icon/PIcon.vue'
  import { ContextAccordionChildItem } from '@/types/contextAccordionChildItem'
  import { Icon } from '@/types/icon'
  import { getRouteName } from '@/utilities/router'

  const props = defineProps<{
    title?: string,
    icon?: Icon,
    children?: ContextAccordionChildItem[],
  }>()

  const route = useRoute()
  const slots = useSlots()
  const open = ref(false)

  const hasChildren = computed(() => !!slots.default || props.children?.length)

  const childrenContainRoute = computed(() => {
    if (!props.children) {
      return false
    }

    const matchedPaths = route.matched.map(({ name }) => name)
    const childPaths = props.children.map(({ to }) => getRouteName(to))

    return childPaths.some(path => path && matchedPaths.includes(path))
  })

  const classes = computed(() => ({
    header: {
      'p-context-accordion-item__header--highlighted': !open.value && childrenContainRoute.value,
    },
    indicator: {
      'p-context-accordion-item__indicator--open': open.value,
    },
  }))

  function toggle(): void {
    open.value = !open.value
  }

  watch(childrenContainRoute, value => {
    if (value) {
      open.value = true
    }
  })
</script>

<style>
.p-context-accordion-item__header { @apply
  flex
  px-2
  py-1.5
  rounded-default
  items-center
  transition
  duration-200
  ease-linear
  gap-2
  text-sm
  leading-5
  select-none
  w-full
  text-left
  hover:bg-selectable-hover
  active:bg-selected
  outline-none
  focus:ring-spacing-focus-ring
  focus:ring-focus-ring
  focus:ring-inset
}

.p-context-accordion-item__header:focus:not(:focus-visible) { @apply
  ring-0
}

.p-context-accordion-item__header--highlighted { @apply
  hover:bg-selectable-hover
  bg-selected
}

.p-context-accordion-item__icon { @apply
  h-6
  w-6
  flex-shrink-0
}

.p-context-accordion-item__title { @apply
  w-full
}

.p-context-accordion-item__contents { @apply
  flex
  flex-col
  rounded-default
  pl-4
  gap-0.5
  mt-0.5
}

.p-context-accordion-item__content-child { @apply
  px-2
  py-1.5
  rounded-default
  items-center
  text-sm
  leading-5
  select-none
  font-medium
  cursor-pointer
  hover:bg-selectable-hover
  active:bg-selected
  outline-none
  focus:ring-spacing-focus-ring
  focus:ring-focus-ring
  focus:ring-inset
}

.p-context-accordion-item__content-child:focus:not(:focus-visible) { @apply
  ring-0
}

.p-context-accordion-item__content-child--active { @apply
  bg-selected
  hover:bg-selected
}

.p-context-accordion-item__indicator { @apply
  transition-transform
}

.p-context-accordion-item__indicator--open { @apply
  rotate-90
}
</style>