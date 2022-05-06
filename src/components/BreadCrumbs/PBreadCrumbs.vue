<template>
  <nav class="p-bread-crumb">
    <template v-if="icon || slots.icon">
      <div class="p-bread-crumbs__icon">
        <slot name="icon">
          <p-icon :icon="icon" />
        </slot>
      </div>
    </template>
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
  import { computed, useSlots } from 'vue'
  import PIcon from '@/components/Icon/PIcon.vue'
  import { Icon } from '@/types/icon'

  type Crumb = {
    text: string,
    to?: string,
  }

  const props = defineProps<{
    crumbs: Crumb[],
    icon: Icon,
  }>()

  const slots = useSlots()

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
