<template>
  <ComponentPage title="Number Input" :demos="[{ title: 'Number Input' }]">
    <template #description>
      This is where we add a short description of <p-code inline>
        p-number-input
      </p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.

      <DemoState v-model:state="exampleState" v-model:disabled="disabled" />
    </template>

    <template #number-input>
      <p-number-input v-model="exampleNumber" :disabled="disabled" :min="0" :max="20" :state="exampleState" />
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

  const exampleNumber = ref(null)
</script>