<template>
  <ComponentPage
    title="Label"
    :demos="[
      { title: 'Label Behavior', description: 'Using `for` and `id` attrs' },
      { title: 'Label Slot', description: 'Using `id` slot scope' },
    ]"
  >
    <template #description>
      <DemoState v-model:state="exampleState" v-model:disabled="disabled" />
    </template>

    <template #label-behavior>
      <p-label label="Label text" for="plain-text" :state="exampleState" message="Some label message">
        <p-text-input id="plain-text" v-model="exampleText" :disabled="disabled" :append="exampleText" :state="exampleState" />
      </p-label>
    </template>

    <template #label-slot>
      <p-label label="Label text" :state="exampleState">
        <template #default="{ id }">
          <p-text-input :id="id" v-model="exampleText" :disabled="disabled" :append="exampleText" :state="exampleState" />
        </template>
      </p-label>
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