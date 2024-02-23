<template>
  <component
    :is="component"
    exact-active-class="p-context-nav-item--active"
    class="p-context-nav-item"
    v-bind="componentProps"
  >
    <template v-if="icon">
      <PIcon :icon="icon" class="p-context-nav-item__icon" />
    </template>
    <slot>
      <span>{{ title }}</span>
    </slot>
  </component>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { RouteLocationRaw } from 'vue-router'
  import PIcon from '@/components/Icon/PIcon.vue'
  import { Icon } from '@/types/icon'

  const props = defineProps<{
    to?: string | RouteLocationRaw,
    title?: string,
    icon?: Icon,
  }>()

  const component = computed(() => {
    if (props.to) {
      return 'router-link'
    }

    return 'button'
  })

  const componentProps = computed(() => {
    if (props.to) {
      return {
        role: 'button',
        to: props.to,
      }
    }

    return {
      type: 'button',
    }
  })
</script>

<style>
.p-context-nav-item { @apply
  flex
  w-full
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
  hover:bg-selectable-hover
  active:bg-selected
  outline-none
  focus:ring-spacing-focus-ring
  focus:ring-focus-ring
  focus:ring-inset
}

.p-context-nav-item:focus:not(:focus-visible) { @apply
  ring-0
}

.p-context-nav-item__icon { @apply
  h-5
  w-5
}

.p-context-nav-item--active { @apply
  bg-selected
  hover:bg-selected
}
</style>
