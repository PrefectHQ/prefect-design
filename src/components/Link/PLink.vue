<template>
  <a v-if="isExternalLink(to)" :href="to" target="_blank" class="p-link">
    <slot /><p-icon class="p-link__external-icon" icon="ExternalLinkIcon" />
  </a>

  <a v-else-if="isUndefined(to)" class="p-link">
    <slot />
  </a>

  <router-link
    v-else
    class="p-link"
    :to="to"
  >
    <slot />
  </router-link>
</template>

<script lang="ts" setup>
  import { RouteLocationRaw } from 'vue-router'

  const props = defineProps<{
    to?: RouteLocationRaw,
  }>()

  function isExternalLink(to: RouteLocationRaw | undefined): to is string {
    return typeof to === 'string' && to.startsWith('http')
  }

  function isUndefined(to: RouteLocationRaw | undefined): to is undefined {
    return typeof to === 'undefined'
  }
</script>

<style>
.p-link { @apply
  text-primary
  font-semibold
}

.p-link__external-icon { @apply
  w-3
  h-3
  align-super
  inline
}
</style>