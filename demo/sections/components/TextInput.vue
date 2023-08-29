<template>
  <ComponentPage title="Text Input" :demos="[{ title: 'Text Input' }]">
    <template #description>
      <DemoState v-model:state="exampleState" v-model:disabled="disabled" />
    </template>

    <template #text-input>
      <p-text-input id="plain-text" v-model="exampleText" :disabled="disabled" :state="exampleState" />
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

  const exampleText = ref('')
</script>