<template>
  <component :is="component" v-bind="componentProps" class="p-link">
    <slot />
    <template v-if="isExternal">
      <PIcon class="p-link__external-icon" icon="ArrowTopRightOnSquareIcon" />
    </template>
  </component>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { RouteLocationRaw } from 'vue-router'
  import PIcon from '@/components/Icon/PIcon.vue'
  import { isRouteExternal, isRouteAbsolute } from '@/utilities/router'

  const props = defineProps<{
    to?: RouteLocationRaw,
  }>()

  const isExternal = computed(() => !!props.to && isRouteExternal(props.to))
  const isAbsolute = computed(() => !!props.to && isRouteAbsolute(props.to))
  const component = computed(() => !props.to || isExternal.value || isAbsolute.value ? 'a' : 'router-link')
  const componentProps = computed(() => {
    if (!props.to) {
      return {
        target: '_blank',
      }
    }

    if (isExternal.value || isAbsolute.value) {
      return {
        href: props.to,
        target: isExternal.value ? '_blank' : undefined,
      }
    }

    return {
      to: props.to,
    }
  })
</script>

<style>
.p-link { @apply
  text-link
  cursor-pointer
  hover:underline
}

.p-link__external-icon { @apply
  inline
  relative
  -top-[0.4em]
  w-3
  h-3
}
</style>
