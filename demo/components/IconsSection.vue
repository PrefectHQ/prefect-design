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
  import * as prefectIcons from '@/components/Icon/icons'
  import { showToast } from '@/plugins/Toast'
  import { HeroIcon, PrefectIcon } from '@/types'
  import * as heroIcons from '@heroicons/vue/solid'
  import Section from './Section.vue'
  import SubSection from './SubSection.vue'


  const prefectIconKeys = Object.keys(prefectIcons) as PrefectIcon[]
  const heroIconKeys = Object.keys(heroIcons) as HeroIcon[]

  async function copy(icon: string): Promise<void> {
    await navigator.clipboard.writeText(`<p-icon icon="${icon}" />`)

    showToast(`Copied "${icon}"`, 'success')
  }
</script>