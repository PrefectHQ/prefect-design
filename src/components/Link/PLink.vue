<template>
  <a v-if="externalLink" :href="externalLink" target="_blank" class="p-link">
    <slot />
    <p-icon class="p-link__external-icon" icon="ExternalLinkIcon" />
  </a>

  <!-- This is necessary because the router-link component throws an unrecoverable error if no to prop is provided -->
  <a v-else-if="!to" class="p-link">
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
  import { computed } from 'vue'
  import { RouteLocationRaw } from 'vue-router'

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
}

.p-link__external-icon { @apply
  inline
  relative
  -top-2
  w-3
  h-3
}
</style>