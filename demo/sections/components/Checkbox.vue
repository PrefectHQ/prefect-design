<template>
  <ComponentPage
    title="Checkbox"
    :demos="[
      { title: 'Checkbox' },
      { title: 'Multiple', description: 'For multiple checkboxes, the v-model value can be an array to be shared across all checkboxes. See also: p-checkbox-group' },
      { title: 'Indeterminate', description: 'A checkbox can either be on or off, but there is a third, visual-only state called indeterminate. This is used to indicate that a checkbox is in a mixed state, for example, when a parent checkbox is checked, but not all of its children are - e.g. a `Select All` checkbox.' },
      { title: 'Label Slot', description: 'In addition to the label prop, there is a slot available for label content.' },
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

    <template #indeterminate>
      <ul>
        <li>
          <p-checkbox v-model="indeterminateParent" :indeterminate="indeterminate.length && indeterminate.length < indeterminateOptions.length" label="Tall Things" :disabled="disabled" :state="exampleState" />

          <ul class="ml-6">
            <li v-for="option in indeterminateOptions" :key="option">
              <p-checkbox v-model="indeterminate" :value="option" :label="option" :disabled="disabled" :state="exampleState" />
            </li>
          </ul>
        </li>
      </ul>
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
  import { computed, ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import DemoState from '@/demo/components/DemoState.vue'

  const exampleState = ref<State>()
  const disabled = ref(false)

  const simple = ref(false)

  const multiple = ref([])

  const indeterminateOptions = ['Buildings', 'Giants', 'Two sandwiches']
  const indeterminate = ref<string[]>([])
  /** Checking the parent should either select or deselect all children and its visual state reflects its children's aggregate state.
   *
   * If all children are checked, the parent should be checked.
   * If all children are unchecked, the parent should be unchecked.
   * If some children are checked, the parent should be indeterminate.
   */
  const indeterminateParent = computed({
    get: () => indeterminate.value.length > 0,
    set: (value: boolean) => {
      if (value) {
        indeterminate.value = indeterminateOptions
      } else {
        indeterminate.value = []
      }
    },
  })

  const slot = ref(false)
</script>

<style>
  .checkbox__demo { @apply
    flex
    flex-col
    gap-4
  }
  </style>