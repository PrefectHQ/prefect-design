<template>
  <component
    :is="component"
    active-class="p-context-nav-item--active"
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
  py-2.5
  px-3
  rounded-md
  items-center
  transition
  duration-200
  ease-linear
  gap-3
  text-sm
  leading-5
  select-none
  font-medium
  hover:text-primary
  active:text-primary-600
}

.p-context-nav-item__icon { @apply
  h-6
  w-6
}

.p-context-nav-item--active { @apply
  text-prefect-400
}
</style>
