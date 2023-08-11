<template>
  <ComponentPage title="Toggle" :demos="[{ title: 'Default Toggle' }, { title: 'Neutral states' }]">
    <template #description>
      Used for both displaying and providing controls for a boolean value.

      <DemoState v-model:state="exampleState" v-model:disabled="disabled" />
    </template>

    <template #default-toggle>
      <p-toggle v-model="exampleBoolean" :disabled="disabled" :state="exampleState" />
    </template>

    <template #neutral-states>
      <p-toggle
        v-model="exampleSecondBoolean"
        :disabled="disabled"
        :state="exampleState"
        prepend="Left"
        append="Right"
        neutral-states
      />
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

  const exampleBoolean = ref<boolean | null>(null)
  const exampleSecondBoolean = ref(false)
</script>