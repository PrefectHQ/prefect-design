<template>
  <nav class="p-bread-crumb">
    <template v-if="icon">
      <div class="p-bread-crumbs__icon">
        <p-icon :icon="icon" />
      </div>
    </template>
    <div v-for="(crumb, index) in crumbs" :key="index">
      <div :class="separatorClass.crumb(index)">
        <component
          :is="crumb.to?'router-link' : 'span'"
          :to="crumb.to"
        >
          <span :class="linkClass.crumb(crumb)">{{ crumb.text }}</span>
        </component>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import PIcon from '@/components/Icon/PIcon.vue'
  import { Icon } from '@/types/icon'


  type Crumb = {
    text: string,
    to?: string,
  }

  const props = defineProps<{
    crumbs: Crumb[],
    icon?: Icon,
  }>()

  const separatorClass = computed(() => ({
    crumb:(index: number) => ({
      'p-bread-crumbs__crumb--separate': index < props.crumbs.length - 1,
    }),
  }))

  const linkClass = computed(() => ({
    crumb:(crumb: Crumb) => ({
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
