<template>
  <a v-if="externalLink" :href="externalLink" target="_blank" class="p-link">
    <slot />
    <PIcon class="p-link__external-icon" icon="ExternalLinkIcon" />
  </a>

  <!-- This is necessary because the router-link component throws an unrecoverable error if no to prop is provided -->
  <a v-else-if="!to" class="p-link">
    <slot />
  </a>

  <RouterLink
    v-else
    class="p-link"
    :to="to"
  >
    <slot />
  </RouterLink>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { RouteLocationRaw } from 'vue-router'
  import PIcon from '@/components/Icon/PIcon.vue'

  const props = defineProps<{
    to?: RouteLocationRaw,
  }>()

  const externalLink = computed<string>(() => {
    if (typeof props.to === 'string' && props.to.startsWith('http')) {
      return props.to
    }
    return ''
  })
</script>

<style>
.p-link { @apply
  text-primary
  font-semibold
  cursor-pointer
  whitespace-nowrap
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
