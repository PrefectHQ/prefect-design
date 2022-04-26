<template>
  <component :is="heroIcons[icon]" />
</template>


<script lang="ts" setup>
  import * as heroIcons from '@heroicons/vue/solid'
  import { Icon } from '@/types/icon'

  defineProps<{ icon: Icon }>()
</script>