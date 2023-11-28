<template>
  <ComponentPage title="List Header" :demos="[{ title: 'Simple' }, { title: 'Sticky' }]">
    <template #simple>
      <PListHeader>
        <span>Things on the left, typically a count.</span>
        <template #controls>
          <PButton>Control 1</PButton>
          <PButton>Control 2</PButton>
        </template>
        <template #sort>
          <PButton>Sort</PButton>
        </template>
      </PListHeader>
    </template>

    <template #sticky>
      <div ref="stickyExampleScrollContainer" class="bg-floating rounded-md px-4 h-60 overflow-auto">
        <p-content>
          <div class="w-full h-10 bg-sentiment-neutral rounded-md" />
          <PListHeader sticky :sticky-options="options">
            <span class="text-subdued">100</span>
            <template #controls>
              <PButton>Control 1</PButton>
              <PButton>Control 2</PButton>
            </template>
            <template #sort>
              <PButton>Sort</PButton>
            </template>
          </PListHeader>

          <template v-for="index in 10" :key="index">
            <div class="w-full h-10 bg-sentiment-neutral rounded-md" />
          </template>
        </p-content>
      </div>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import PListHeader from '@/components/ListHeader/PListHeader.vue'
  import { Getter } from '@/types'
  import { UsePositionStickyObserverOptions } from '@prefecthq/vue-compositions'
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const stickyExampleScrollContainer = ref<HTMLElement>()

  const options: Getter<UsePositionStickyObserverOptions> = () => {
    return {
      boundingElement: stickyExampleScrollContainer.value,
    }
  }
</script>