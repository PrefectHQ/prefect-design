<template>
  <ComponentPage title="Native Select" :demos="[{ title: 'Native Select' }]">
    <template #description>
      This is where we add a short description of <p-code>p-native-select</p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.

      <DemoState v-model:state="exampleState" v-model:disabled="disabled" />
    </template>

    <template #native-select>
      <div class="native-select__demo">
        <p-native-select v-model="exampleNativeSelect" :disabled="disabled" :options="exampleOptionsWithEmpty" :state="exampleState" />

        <p-code>value: {{ JSON.stringify(exampleNativeSelect) }}</p-code>
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

  const exampleNativeSelect = ref(null)
  const exampleOptionsWithEmpty = [
    { label: '', value: null },
    {
      label: 'One', value: 1,
    },
    {
      label: 'Two', value: 2, disabled: true,
    },
    {
      label: 'Three', value: 3,
    },
  ]
</script>

<style>
  .native-select__demo {
    @apply
    flex
    flex-col
    gap-4
  }
</style>