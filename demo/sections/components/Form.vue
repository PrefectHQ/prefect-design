<template>
  <ComponentPage title="Form" :demos="[{ title: 'Form' }]">
    <template #description>
      This is where we add a short description of <p-code>p-form</p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.

      <DemoState v-model:state="exampleState" v-model:disabled="disabled" />
    </template>

    <template #form>
      <p-form @submit="submit">
        <p-content>
          <fieldset :disabled="disabled">
            <p-label label="Name">
              <p-text-input v-model="name" :state="exampleState" />
            </p-label>

            <p-label label="Description (Optional)">
              <p-textarea v-model="description" rows="7" :state="exampleState" />
            </p-label>
          </fieldset>
        </p-content>
        <template #footer>
          <p-button type="submit" :state="exampleState" :disabled="disabled">
            Submit
          </p-button>
        </template>
      </p-form>
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

  const name = ref('')
  const description = ref('')

  function submit(): void {
    // eslint-disable-next-line
    window.alert(`name: ${name.value}, description: ${description.value}`)
    name.value = ''
    description.value = ''
  }
</script>