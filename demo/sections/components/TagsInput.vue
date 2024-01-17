<template>
  <ComponentPage title="Tags Input" :demos="[{ title: 'Tags Input' }]">
    <template #description>
      <DemoState v-model:state="exampleState" v-model:disabled="disabled" />
    </template>

    <template #tags-input>
      <div class="tags-input__demo">
        <p-tags-input v-model="exampleTagsValue" empty-message="All tags" :disabled="disabled" :state="exampleState" />

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
  .tags-input__demo {
    @apply
    h-44
    flex
    flex-col
    gap-4
  }
</style>