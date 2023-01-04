<template>
  <p-toggle v-model="toggleValue" class="p-theme-toggle">
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
    set(value: boolean) {
      const theme = value ? 'dark' : 'light'
      setTheme(theme)
    },
  })
</script>

<style>
.p-theme-toggle .p-toggle__control.p-toggle__control--checked { @apply
    bg-sky-900
    border-sky-900
  }

.p-theme-toggle .p-toggle__control:not(.p-toggle__control--checked) { @apply
    bg-sky-500
    border-sky-500
  }
</style>