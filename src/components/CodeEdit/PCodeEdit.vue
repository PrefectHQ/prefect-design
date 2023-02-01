<template>
  <div class="p-code-edit">
    This is where i'd put the code edit component... if i had one!
  </div>
</template>

<script lang="ts">
  export default {
    name: 'PCodeEdit',
    expose: [],
    components: { PCodeHighlight },
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { PCodeHighlight } from '@/components/CodeHighlight'
</script>

<style>
.p-code-edit { @apply
  inline-flex
  bg-background-500
  rounded-md
}
</style>