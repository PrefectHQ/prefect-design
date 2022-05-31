<template>
  <component :is="component" class="p-icon" />
</template>


<script lang="ts" setup>
  import * as outlinedHeroIcons from '@heroicons/vue/outline'
  import * as solidHeroIcons from '@heroicons/vue/solid'
  import { computed } from 'vue'
  import * as prefectIcons from './icons'
  import { Icon, PrefectIcon } from '@/types/icon'

  const props = defineProps<{
    icon: Icon,
    solid?: boolean,
  }>()

  const component = computed(() => {
    if (isPrefectIcon(props.icon)) {
      // eslint-disable-next-line import/namespace
      return prefectIcons[props.icon]
    }

    if (props.solid) {
      // eslint-disable-next-line import/namespace
      return solidHeroIcons[props.icon]
    }

    // eslint-disable-next-line import/namespace
    return outlinedHeroIcons[props.icon]
  })

  function isPrefectIcon(value: Icon): value is PrefectIcon {
    const icons = Object.keys(prefectIcons)

    return icons.includes(value)
  }
</script>

<style>
.p-icon { @apply
  w-5
  h-5
}
</style>