<template>
  <div>
    <p-toggle v-model="toggleOne">
      <template #append>
        <span class="text-sm font-medium text-gray-900">{{ toggleOne }}</span>
      </template>
    </p-toggle>
  </div>
  <div class="py-2">
    <p-toggle v-model="toggleTwo" disabled>
      <template #append>
        <span class="text-sm font-medium text-gray-900">disabled</span>
      </template>
    </p-toggle>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import PToggle from '@/components/Toggle/PToggle.vue'

  const toggleOne = ref(false)
  const toggleTwo = ref(false)
</script>

