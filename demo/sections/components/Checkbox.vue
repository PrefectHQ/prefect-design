<template>
  <ComponentPage
    title="Checkbox"
    :demos="[
      { title: 'Checkbox' },
      { title: 'Multiple', description: 'See also: p-checkbox-group' },
      { title: 'Label Slot' },
    ]"
  >
    <template #description>
      <DemoState v-model:state="exampleState" v-model:disabled="disabled" />
    </template>

    <template #checkbox>
      <div class="checkbox__demo">
        <p-checkbox v-model="simple" label="A simple checkbox" :disabled="disabled" :state="exampleState" />

        <p-code inline>
          value: {{ JSON.stringify(simple) }}
        </p-code>
      </div>
    </template>

    <template #multiple>
      <div class="checkbox__demo">
        <fieldset :disabled="disabled">
          <p-checkbox v-model="multiple" value="A" label="Checkbox item A" :disabled="disabled" :state="exampleState" />
          <p-checkbox v-model="multiple" value="B" label="Checkbox item B" :disabled="disabled" :state="exampleState" />
          <p-checkbox v-model="multiple" value="C" label="Checkbox item C" :disabled="disabled" :state="exampleState" />
        </fieldset>

        <p-code inline>
          value: {{ JSON.stringify(multiple) }}
        </p-code>
      </div>
    </template>

    <template #label-slot>
      <div class="checkbox__demo">
        <p-checkbox v-model="slot" :state="exampleState" :disabled="disabled">
          <template #label>
            Using the <span class="font-bold">label</span> slot
          </template>
        </p-checkbox>

        <p-code inline>
          value: {{ JSON.stringify(slot) }}
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

  const simple = ref(false)
  const multiple = ref([])
  const slot = ref(false)
</script>

<style>
  .checkbox__demo { @apply
    flex
    flex-col
    gap-4
  }
  </style>