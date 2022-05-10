<template>
  <Section heading="Icons">
    <SubSection heading="Prefect Icons">
      <div class="flex flex-wrap items-start gap-2 mb-4">
        <template v-for="(icon, index) in prefectIconKeys" :key="index">
          <button type="button" :title="icon" @click="copy(icon)">
            <p-icon :icon="icon" class="w-10 h-10" />
          </button>
        </template>
      </div>
    </SubSection>
    <SubSection heading="Hero Icons">
      <div class="flex flex-wrap items-start gap-2 mb-4">
        <template v-for="(icon, index) in heroIconKeys" :key="index">
          <button type="button" :title="icon" @click="copy(icon)">
            <p-icon :icon="icon" class="w-10 h-10" />
          </button>
        </template>
      </div>
    </SubSection>
  </Section>
</template>

<script lang="ts" setup>
  import * as heroIcons from '@heroicons/vue/solid'
  import Section from '../components/Section.vue'
  import SubSection from '../components/SubSection.vue'
  import * as prefectIcons from '@/components/Icon/icons'

  import { showToast } from '@/plugins/Toast'

  const prefectIconKeys = Object.keys(prefectIcons)
  const heroIconKeys = Object.keys(heroIcons)

  async function copy(icon: string): Promise<void> {
    await navigator.clipboard.writeText(`<p-icon icon="${icon}" />`)

    // eslint-disable-next-line no-alert
    showToast(`Copied ${icon} to clipboard!`, 'success', undefined, 3000)
  }
</script>