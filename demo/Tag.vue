<template>
  <p-tag v-for="index in 3" :key="index">
    {{ index }}
  </p-tag>

  <div>
    <p-tag v-for="index in 3" :key="index">
      {{ index }}
    </p-tag>
  </div>
</template>

<script lang="ts" setup>
  import { TagIcon } from '@heroicons/vue/solid'
  import PTag from '../src/components/Tag/PTag.vue'
</script>

