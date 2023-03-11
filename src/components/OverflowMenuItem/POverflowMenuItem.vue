<template>
  <component
    :is="component"
    class="p-menu-item"
    v-bind="componentProps"
  >
    <PIcon v-if="icon" :icon="icon" class="p-menu-item__icon" />

    <slot>
      <span>{{ label }}</span>
    </slot>

    <div class="p-menu-item__after">
      <slot name="after" />
    </div>
  </component>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { RouteLocationRaw } from 'vue-router'
  import PIcon from '@/components/Icon/PIcon.vue'
  import { Icon } from '@/types/icon'
  import { isRouteExternal } from '@/utilities/router'

  const props = defineProps<{
    label?: string,
    icon?: Icon,
    to?: RouteLocationRaw,
  }>()

  const component = computed(() => {
    if (props.to) {
      return isRouteExternal(props.to) ? 'a' : 'router-link'
    }

    return 'button'
  })

  const componentProps = computed(() => {
    if (component.value === 'a') {
      return {
        role: 'button',
        href: props.to,
      }
    }

    if (component.value === 'button') {
      return {
        type: 'button',
      }
    }

    return {
      role: 'button',
      to: props.to,
    }
  })
</script>

<style>
.p-menu-item { @apply
  p-3
  font-normal
  text-foreground
  text-sm
  flex
  items-center
  w-full
  hover:bg-background-500
  dark:hover:bg-background-600
}

.p-menu-item__icon { @apply
  w-5
  h-5
  mr-2
}

.p-menu-item__after { @apply
  ml-auto
  pl-10
}
</style>