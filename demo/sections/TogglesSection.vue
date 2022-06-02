<template>
  <Section heading="Toggles">
    <p-toggle v-model="toggleOne">
      <template #append>
        <span class="text-sm font-medium text-gray-900">{{ toggleOne }}</span>
      </template>
    </p-toggle>

    <p-toggle v-model="toggleTwo" class="py-2" disabled>
      <template #append>
        <span class="text-sm font-medium text-gray-900">disabled</span>
      </template>
    </p-toggle>

    <p-toggle v-model="toggleThree" loading class="py-2">
      <template #append>
        <span class="text-sm font-medium text-gray-900">Loading</span>
      </template>
    </p-toggle>

    <p-toggle v-model="toggleFour" :loading="toggleFourLoading" class="py-2">
      <template #append>
        <span class="text-sm font-medium text-gray-900">Async state</span>
      </template>
    </p-toggle>
  </Section>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import Section from '../components/Section.vue'
  import PToggle from '@/components/Toggle/PToggle.vue'

  const toggleOne = ref(false)
  const toggleTwo = ref(false)
  const toggleThree = ref(false)

  const toggleFourApiValue = ref(false)
  const toggleFourLoading = ref(false)

  const toggleFour = computed({
    get() {
      return toggleFourApiValue.value
    },
    set(val: boolean) {
      toggleFourLoading.value = true

      setTimeout(() => {
        toggleFourApiValue.value = val
        toggleFourLoading.value = false
      }, 2000)
    },
  })
</script>

