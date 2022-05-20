<template>
  <nav class="p-bread-crumb">
    <div v-for="(crumb, index) in crumbs" :key="index">
      <div :class="classes.separator(index)">
        <component
          :is="crumb.to ? 'router-link' : 'span'"
          :to="crumb.to"
        >
          <span :class="classes.link(crumb)">{{ crumb.text }}</span>
        </component>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import type { Crumb, BreadCrumbs } from '@/types'

  const props = defineProps<{
    crumbs: BreadCrumbs,
  }>()

  const classes = computed(() => ({
    separator:(index: number) => ({
      'p-bread-crumbs__crumb--separate': index < props.crumbs.length - 1,
    }),
    link:(crumb: Crumb) => ({
      'p-bread-crumb__crumb--link': !!crumb.to,
    }),
  }))
</script>

<style>
.p-bread-crumb {
  @apply
  flex
  flex-wrap
  font-bold
  text-xl
  text-slate-700
}

.p-bread-crumbs__icon {
  @apply
  h-6
  w-6
  mr-2
}

.p-bread-crumb__crumb--link {
  @apply
  text-prefect-500
  cursor-pointer
  hover:underline
  active:text-prefect-700
}

.p-bread-crumbs__crumb--separate {
  @apply
  after:content-['\00a0\/\00a0']
  after:text-slate-400
  after:font-normal
}
</style>
