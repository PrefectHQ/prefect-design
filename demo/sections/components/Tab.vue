<template>
  <ComponentPage title="Tab" :demos="[{ title: 'Tab' }, { title: 'Tab Components' }]">
    <p-button class="mt-2" @click="changeToTab(tabs[2])">
      Switch to third tab
    </p-button>
    <template #tab>
      <PTabs v-model:selected="selectedTab" :tabs="tabs">
        <template #tab-one-heading="{ tab }">
          <p-icon icon="Prefect" class="w-4 h-4 mr-2" />
          <span>{{ tab?.label }}</span>
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

        <template #heading="{ tab }">
          {{ tab?.label }} Heading
        </template>

        <template #content="{ tab }">
          This is the content for {{ tab.label }}
        </template>
      </PTabs>
    </template>
    <template #tab-components>
      <PTabsRoot v-model:model-value="selectedTab" :default-value="tabs[0]" class="w-[400px]">
        <PTabsList>
          <PTabsTrigger v-for="tab in tabs" :key="tab" :value="tab">
            {{ tab }}
          </PTabsTrigger>
        </PTabsList>
        <PTabsContent v-for="tab in tabs" :key="tab" :value="tab">
          {{ tab }} content
        </PTabsContent>
      </PTabsRoot>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { PTabs, PTabsRoot, PTabsList, PTabsTrigger, PTabsContent } from '@/components/Tabs'

  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const tabs = ['Tab One', 'Tab Two', 'Tab Three', 'Tab Four']

  const selectedTab = ref()
  const changeToTab = (tab: string): void => {
    selectedTab.value = tab
  }
</script>
