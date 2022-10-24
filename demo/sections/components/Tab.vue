<template>
  <ComponentPage title="Tab" :demos="[{ title: 'Tab' }]">
    <template #description>
      This is where we add a short description of <p-code>p-tab</p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <template #tab>
      <p-tabs v-model:selected="selectedTab" :tabs="tabs">
        <template #tab-one-heading="{ tab }">
          <p-icon icon="Prefect" class="w-4 h-4 mr-2" />
          <span>{{ tab }}</span>
        </template>

        <template #tab-one>
          <div>
            Content One
          </div>
        </template>

        <template #tab-two>
          <div>
            Content Two
          </div>
        </template>

        <template #tab-three>
          <div>
            Content Three
          </div>
        </template>
      </p-tabs>

      <p-button size="sm" class="mt-2" @click="changeToTab(tabs[2])">
        Switch to third tab
      </p-button>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { PTabs } from '@/components/Tabs'
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const tabs = ['Tab One', 'Tab Two', 'Tab Three']

  const selectedTab = ref()
  const changeToTab = (tab: string): void => {
    selectedTab.value = tab
  }
</script>
