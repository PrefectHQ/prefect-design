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
  import { isRouteExternal } from '@/utilities/router'

  const props = defineProps<{
    to?: RouteLocationRaw,
  }>()

  const isExternal = computed(() => !!props.to && isRouteExternal(props.to))
  const component = computed(() => !props.to || isExternal.value ? 'a' : 'router-link')
  const componentProps = computed(() => {
    if (!props.to) {
      return {
        target: '_blank',
      }
    }

    if (isExternal.value) {
      return {
        href: props.to,
        target: '_blank',
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
