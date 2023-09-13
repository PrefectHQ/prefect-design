<template>
  <ComponentPage title="Tags Area" :demos="[{ title: 'Tags Area' }]">
    <template #description>
      <DemoState v-model:state="exampleState" v-model:disabled="disabled" />
    </template>

    <template #tags-area>
      <div class="tags-area__demo">
        <p-tags-area v-model="exampleTagsValue" :disabled="disabled" :state="exampleState" />

        <p-code inline>
          value: {{ JSON.stringify(exampleTagsValue) }}
        </p-code>
      </div>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { State } from '@/types'
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import DemoState from '@/demo/components/DemoState.vue'

  const exampleState = ref<State>()
  const disabled = ref(false)

  const exampleTagsValue = ref<string[]>([])
</script>

<style>
  .tags-area__demo {
    @apply
    flex
    flex-col
    gap-4
  }
</style>