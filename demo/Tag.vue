<template>
  <p-tag icon="TagIcon">
    testing
  </p-tag>

  <p-tag v-for="index in ['one', 'two', 'three']" :key="index">
    {{ index }}
  </p-tag>

  <div>
    <p-tag v-for="index in ['one', 'two', 'three']" :key="index" icon="TagIcon">
      {{ index }}
    </p-tag>
  </div>

  <div>
    <p-tag v-for="state in states" :key="state" :color="state" icon="TagIcon">
      {{ state }}
    </p-tag>
  </div>

  <div>
    <p-tag v-for="state in states" :key="state" :color="state" flat icon="TagIcon">
      {{ state }}
    </p-tag>
  </div>
</template>

<script lang="ts" setup>
  import PTag from '../src/components/Tag/PTag.vue'
  const states = ['completed', 'cancelled', 'failed', 'pending', 'running', 'scheduled']
</script>

