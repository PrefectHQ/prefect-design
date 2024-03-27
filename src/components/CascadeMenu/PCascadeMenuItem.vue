<template>
  <POverflowMenuItem class="p-cascade-menu-item">
    {{ data.label }}
  </POverflowMenuItem>
</template>

<script lang="ts" setup>
  import { CascadeData } from '@/utilities'
  import { POverflowMenuItem } from '@/components'

  defineProps<{
    data: CascadeData,
  }>()
</script>