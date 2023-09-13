<template>
  <nav class="p-bread-crumbs">
    <template v-for="(crumb, index) in crumbs" :key="index">
      <div class="p-bread-crumbs__crumb">
        <component
          :is="crumb.to ? 'router-link' : 'span'"
          :class="classes.link(crumb)"
          :to="crumb.to"
        >
          {{ crumb.text }}
        </component>
      </div>
    </template>
  </nav>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import type { Crumb, BreadCrumbs } from '@/types'

  defineProps<{
    crumbs: BreadCrumbs,
  }>()

  const classes = computed(() => ({
    link: (crumb: Crumb) => ({
      'p-bread-crumb__crumb--link': !!crumb.to,
    }),
  }))
</script>

<style>
.p-bread-crumbs { @apply
  flex
  flex-wrap
  font-bold
  text-xl
}

.p-bread-crumbs__crumb { @apply
  overflow-hidden
  break-words;
}

.p-bread-crumbs__crumb:not(:first-child) { @apply
  before:content-['\00a0\/\00a0']
  before:text-subdued
  before:font-normal
}

.p-bread-crumb__crumb--link { @apply
  text-link
  cursor-pointer
  hover:underline
}
</style>
