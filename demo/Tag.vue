<template>
  <p-tag v-for="index in ['one', 'two', 'three']" :key="index">
    {{ index }}
  </p-tag>

  <div>
    <p-tag v-for="index in ['one', 'two', 'three']" :key="index">
      <template #icon>
        <TagIcon />
      </template>
      {{ index }}
    </p-tag>
  </div>

  <div>
    <p-tag v-for="state in states" :key="state" :color="state">
      <template #icon>
        <TagIcon />
      </template>
      {{ state }}
    </p-tag>
  </div>

  <div>
    <p-tag v-for="state in states" :key="state" :color="state" flat>
      <template #icon>
        <TagIcon />
      </template>
      {{ state }}
    </p-tag>
  </div>
</template>

<script lang="ts" setup>
  import { TagIcon } from '@heroicons/vue/solid'
  import PTag from '../src/components/Tag/PTag.vue'
  const states = ['Completed', 'Cancelled', 'Failed', 'Pending', 'Running', 'Scheduled']
</script>

