<template>
  <component :is="component" />
</template>


<script lang="ts" setup>
  import * as heroIcons from '@heroicons/vue/solid'
  import { computed } from 'vue'
  import * as prefectIcons from './icons'
  import { Icon, PrefectIcon } from '@/types/icon'

  const props = defineProps<{
    icon: Icon,
  }>()

  const component = computed(() => {
    if (isPrefectIcon(props.icon)) {
      // eslint-disable-next-line import/namespace
      return prefectIcons[props.icon]
    }

    // eslint-disable-next-line import/namespace
    return heroIcons[props.icon]
  })

  function isPrefectIcon(value: Icon): value is PrefectIcon {
    const icons = Object.keys(prefectIcons)

    return icons.includes(value)
  }
</script>