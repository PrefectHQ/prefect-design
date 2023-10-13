<template>
  <component
    :is="component"
    class="p-overflow-menu-item"
    exact-active-class="p-overflow-menu-item--active"
    v-bind="componentProps"
  >
    <PIcon v-if="icon" :icon="icon" class="p-overflow-menu-item__icon" />

    <slot>
      <span>{{ label }}</span>
    </slot>

    <div v-if="$slots.after" class="p-overflow-menu-item__after">
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
.p-overflow-menu-item { @apply
  px-3
  py-2
  font-normal
  text-sm
  flex
  items-center
  w-full
  hover:bg-selectable-hover
}

.p-overflow-menu-item__icon { @apply
  w-5
  h-5
  mr-2
}

.p-overflow-menu-item__after { @apply
  ml-auto
  pl-10
}

.p-overflow-menu-item--active { @apply
  bg-selected
  hover:bg-selected
}
</style>