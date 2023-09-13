<template>
  <ComponentPage title="Type Ahead" :demos="[{ title: 'Type Ahead' }]">
    <template #description>
      <DemoState v-model:state="exampleState" v-model:disabled="disabled" />
    </template>

    <template #type-ahead>
      <div class="type-ahead__demo">
        <p-type-ahead v-model="exampleTypeAhead" :options="exampleOptions" />

        <p-code inline>
          value: {{ JSON.stringify(exampleTypeAhead) }}
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

  const exampleTypeAhead = ref('')
  const exampleOptions = ['One', 'Two', 'Three']
</script>

<style>
  .type-ahead__demo {
    @apply
    h-48
    flex
    flex-col
    gap-4
  }
</style>