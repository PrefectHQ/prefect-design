<template>
  <PCode class="p-code-highlight">
    <slot />
  </PCode>
</template>

<script lang="ts">
  export default {
    name: 'PCodeHighlight',
    expose: [],
    components: { PCode },
  }
</script>

<script lang="ts" setup>
  import PCode from '@/components/Code/PCode.vue'


</script>

<style>
.p-code-highlight { @apply
  bg-fuchsia-600
}
</style>