<template>
  <div class="px-4 py-8 sm:px-0">
    <span class="text-2xl">Icons</span>
    <div class="border-4 border-dashed border-gray-200 rounded-lg p-4">
      <p class="text-xl mb-1">
        Prefect Icons
      </p>
      <div class="flex flex-wrap items-start gap-2 mb-4">
        <template v-for="(icon, index) in prefectIconKeys" :key="index">
          <button type="button" :title="icon" @click="copy(icon)">
            <p-icon :icon="icon" class="w-10 h-10" />
          </button>
        </template>
      </div>
      <p class="text-xl mb-1">
        Hero Icons
      </p>
      <div class="flex flex-wrap items-start gap-2 mb-4">
        <template v-for="(icon, index) in heroIconKeys" :key="index">
          <button type="button" :title="icon" @click="copy(icon)">
            <p-icon :icon="icon" class="w-10 h-10" />
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import * as heroIcons from '@heroicons/vue/solid'
  import * as prefectIcons from '@/components/Icon/icons'

  const prefectIconKeys = Object.keys(prefectIcons)
  const heroIconKeys = Object.keys(heroIcons)

  function copy(icon: string): void {
    navigator.clipboard.writeText(`<p-icon icon="${icon}" />`)

    // eslint-disable-next-line no-alert
    alert('Copied to clipboard!')
  }
</script>