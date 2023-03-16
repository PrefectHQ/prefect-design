<template>
  <component :is="component" v-bind="componentProps" class="p-link" :class="classes">
    <slot />
    <template v-if="isExternal">
      <PIcon class="p-link__external-icon" icon="ExternalLinkIcon" />
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
    disabled?: boolean,
  }>()

  const isExternal = computed(() => !!props.to && isRouteExternal(props.to))
  const component = computed(() => !props.to || isExternal.value ? 'a' : 'router-link')
  const componentProps = computed(() => {
    if (!props.to) {
      return {
        disabled: props.disabled,
        target: '_blank',
      }
    }

    if (isExternal.value) {
      return {
        disabled: props.disabled,
        href: props.to,
        target: '_blank',
      }
    }

    return {
      disabled: props.disabled,
      to: props.to,
    }
  })

  const classes = computed(() => ({
    'p-link--disabled': props.disabled,
  }))
</script>

<style>
.p-link { @apply
  text-primary
  font-semibold
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

.p-link--disabled { @apply
  cursor-not-allowed
  pointer-events-none
  opacity-50
}
</style>
