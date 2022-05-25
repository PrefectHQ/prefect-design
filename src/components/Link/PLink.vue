<template>
  <a v-if="externalLink" :href="externalLink" target="_blank" class="p-link link1">
    <slot /><p-icon class="p-link__external-icon" icon="ExternalLinkIcon" />
  </a>

  <!-- This is necessary because the router-link component throws an unrecoverable error if no to prop is provided -->
  <a v-else-if="!to" class="p-link link2">
    <slot />
  </a>

  <router-link
    v-else
    class="p-link link3"
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

  const externalLink  = computed<string>(() => {
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
}

.p-link__external-icon { @apply
  w-3
  h-3
  align-super
  inline
}
</style>