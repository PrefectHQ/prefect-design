<template>
  <p-toggle v-model="toggleValue" class="p-theme-toggle" neutral-states>
    <template #prepend>
      <p-icon icon="SunIcon" />
    </template>

    <template #append>
      <p-icon icon="MoonIcon" />
    </template>
  </p-toggle>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useColorTheme } from '@/compositions'

  const { value: internalValue, setTheme } = useColorTheme()

  const toggleValue = computed({
    get() {
      return internalValue.value === 'dark'
    },
    set(value) {
      const theme = value ? 'dark' : 'light'
      setTheme(theme)
    },
  })
</script>
