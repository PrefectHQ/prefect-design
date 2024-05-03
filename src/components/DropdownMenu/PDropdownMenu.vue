<template>
  <PDropdownMenuRoot>
    <PDropDownMenuTrigger>
      <slot name="trigger" />
    </PDropDownMenuTrigger>
    <PDropdownMenuContent>
      <slot />
    </PDropdownMenuContent>
  </PDropdownMenuRoot>
</template>


<script lang="ts" setup>
  import PDropdownMenuContent from '@/components/DropdownMenu/PDropdownMenuContent.vue'
  import PDropdownMenuRoot from '@/components/DropdownMenu/PDropdownMenuRoot.vue'
  import PDropDownMenuTrigger from '@/components/DropdownMenu/PDropdownMenuTrigger.vue'
</script>